from pathlib import Path

from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright


BASE_URL = "http://localhost:3101"
ARTIFACTS = Path(__file__).parent / "artifacts"
ARTIFACTS.mkdir(exist_ok=True)

PAGES = {
    "/": (
        "Survive Verity in Area 51 Weapons, Map & Gamepass Guide",
        "Survive Verity in Area 51 Guide: Weapons, Map, Coins & Gamepasses",
        True,
    ),
    "/gamepasses/": (
        "Survive Verity in Area 51 Gamepasses: Prices & Worth It?",
        "Survive Verity in Area 51 Gamepass Guide",
        True,
    ),
    "/updates/": (
        "Survive Verity in Area 51 Updates: Cruelty, Falsity & Patch Tracker",
        "Survive Verity in Area 51 Update Tracker",
        True,
    ),
    "/codes/": (
        "Survive Verity in Area 51 Codes: Active Codes & Current Status",
        "Are There Any Survive Verity in Area 51 Codes?",
        True,
    ),
    "/weapons/": (
        "Best Weapons in Survive Verity in Area 51: Stats & Locations",
        "Survive Verity in Area 51 Weapons Guide",
        False,
    ),
    "/coins-rebirth/": (
        "How to Get Coins Fast in Survive Verity in Area 51",
        "Survive Verity in Area 51 Coins & Rebirth Guide",
        False,
    ),
    "/map/": (
        "Survive Verity in Area 51 Map: Spawns, Items & Safe Routes",
        "Survive Verity in Area 51 Map and Location Guide",
        False,
    ),
}


def navigate(page, path):
    response = page.goto(f"{BASE_URL}{path}", wait_until="commit")
    page.locator("h1").wait_for(state="visible", timeout=30_000)
    try:
        page.wait_for_load_state("networkidle", timeout=5_000)
    except PlaywrightTimeoutError:
        # Next 13 App Router can keep a React streaming connection open even for
        # statically generated pages. A visible H1 plus the stability window below
        # is the relevant readiness signal for these interaction assertions.
        page.wait_for_timeout(750)
    return response


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, args=["--no-proxy-server"])
    page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
    page.set_default_navigation_timeout(90_000)
    console_errors = []
    page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)

    for path, (expected_title, expected_h1, indexable) in PAGES.items():
        response = navigate(page, path)
        assert response is not None and response.status == 200, (path, response.status if response else None)
        assert page.title() == expected_title, (path, page.title())
        headings = page.locator("h1")
        assert headings.count() == 1, (path, headings.count())
        assert headings.first.inner_text().strip() == expected_h1, (path, headings.first.inner_text())
        robots = page.locator('meta[name="robots"]').get_attribute("content") or ""
        if indexable:
            assert "noindex" not in robots.lower(), (path, robots)
        else:
            assert "noindex" in robots.lower(), (path, robots)
        overflow = page.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
        assert overflow, f"Desktop horizontal overflow on {path}"

    navigate(page, "/")
    assert page.locator('a[href^="/gamepasses"]').count() >= 2
    assert page.get_by_text("Official numbers, clearly labeled.").is_visible()
    assert page.get_by_text("Fan-made. Evidence-limited. Never official.").is_visible()
    page.screenshot(path=str(ARTIFACTS / "home-desktop.png"), full_page=True)

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    mobile.set_default_navigation_timeout(90_000)
    navigate(mobile, "/")
    assert mobile.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
    mobile.get_by_role("button", name="Open navigation").click()
    mobile_nav = mobile.get_by_role("navigation", name="Mobile navigation")
    assert mobile_nav.is_visible()
    mobile_nav.get_by_role("link", name="Gamepasses", exact=True).click()
    mobile.wait_for_url("**/gamepasses", wait_until="commit", timeout=30_000)
    assert mobile.locator("h1").inner_text().strip() == "Survive Verity in Area 51 Gamepass Guide"
    assert mobile.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
    mobile.screenshot(path=str(ARTIFACTS / "gamepasses-mobile.png"), full_page=True)

    sitemap = page.request.get(f"{BASE_URL}/sitemap.xml")
    assert sitemap.status == 200
    sitemap_text = sitemap.text()
    for path in ("/gamepasses/", "/updates/", "/codes/"):
        assert path in sitemap_text
    for path in ("/weapons/", "/coins-rebirth/", "/map/"):
        assert path not in sitemap_text

    robots = page.request.get(f"{BASE_URL}/robots.txt")
    assert robots.status == 200 and "Sitemap:" in robots.text()
    assert not console_errors, console_errors

    mobile.close()
    browser.close()

print(f"Validated {len(PAGES)} pages, mobile navigation, metadata, sitemap, robots, overflow, and console output.")
