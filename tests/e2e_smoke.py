import os
from pathlib import Path

from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("BASE_URL", "http://localhost:3101")
ARTIFACTS = Path(__file__).parent / "artifacts"
ARTIFACTS.mkdir(exist_ok=True)

PAGES = {
    "/": (
        "Survive Verity in Area 51 Weapons, Map & Gamepass Guide",
        "Survive Verity in Area 51 Guide: Weapons, Map, Coins & Gamepasses",
        True,
    ),
    "/guides/": (
        "Survive Verity in Area 51 Guides: Start Here",
        "Survive Verity in Area 51 Guides",
        True,
    ),
    "/methodology/": (
        "How We Verify Survive Verity in Area 51 Guides",
        "How We Verify This Guide",
        True,
    ),
    "/beginner-guide/": (
        "Survive Verity in Area 51 Beginner Guide: First Run",
        "Survive Verity in Area 51 Beginner Guide",
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
        "Survive Verity in Area 51 Codes: 0 Verified Codes",
        "Survive Verity in Area 51 Codes",
        True,
    ),
    "/weapons/": (
        "Free Weapons in Survive Verity in Area 51: Prices & Damage Feel",
        "Free Weapons in Survive Verity in Area 51",
        True,
    ),
    "/coins-rebirth/": (
        "Survive Verity in Area 51 Coins: Two Timed Run Observations",
        "How Fast Can You Earn Coins?",
        False,
    ),
    "/map/": (
        "Survive Verity in Area 51 Map Lite: 5 Key Locations",
        "Survive Verity in Area 51 Map Lite",
        False,
    ),
}

REVIEW_PAGES = {
    "/": "home",
    "/guides/": "guides",
    "/methodology/": "methodology",
    "/beginner-guide/": "beginner-guide",
    "/codes/": "codes",
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
        accessible_h1 = headings.first.get_attribute("aria-label") or headings.first.inner_text().strip()
        assert accessible_h1 == expected_h1, (path, accessible_h1)
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
    assert page.get_by_text("Start here in three steps").is_visible()
    assert page.get_by_role("heading", name="Latest verified", exact=True).is_visible()
    navigate(page, "/codes/")
    assert page.get_by_role("heading", name="Verified code tracker", exact=True).is_visible()
    assert page.get_by_role("heading", name="Frequently asked questions", exact=True).is_visible()
    structured_data = "".join(page.locator('script[type="application/ld+json"]').all_text_contents())
    assert '"@type":"FAQPage"' in structured_data
    for forbidden_code in ("MOCHIVERITY", "AREA51BACKROOMS", "FALSITYEVENT", "SURVIVOR500"):
        assert forbidden_code not in page.locator("body").inner_text()
    for review_path, review_name in REVIEW_PAGES.items():
        navigate(page, review_path)
        page.screenshot(path=str(ARTIFACTS / f"{review_name}-desktop.png"), full_page=True)

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    mobile.set_default_navigation_timeout(90_000)
    navigate(mobile, "/")
    assert mobile.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
    mobile.get_by_role("button", name="Open navigation").click()
    mobile_nav = mobile.get_by_role("navigation", name="Mobile navigation")
    assert mobile_nav.is_visible()
    mobile_nav.get_by_role("link", name="Guides", exact=True).click()
    mobile.wait_for_url("**/guides/", wait_until="commit", timeout=30_000)
    mobile.locator("h1").wait_for(state="visible", timeout=30_000)
    assert mobile.locator("h1").inner_text().strip() == "Survive Verity in Area 51 Guides"
    for review_path, review_name in REVIEW_PAGES.items():
        navigate(mobile, review_path)
        assert mobile.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
        mobile.screenshot(path=str(ARTIFACTS / f"{review_name}-mobile.png"), full_page=True)
    navigate(mobile, "/codes/")
    assert not mobile.locator("#verified-code-tracker table").is_visible()
    assert mobile.get_by_role("status", name="No verified codes to list").is_visible()

    sitemap = page.request.get(f"{BASE_URL}/sitemap.xml")
    assert sitemap.status == 200
    sitemap_text = sitemap.text()
    for path in ("/guides/", "/beginner-guide/", "/weapons/", "/gamepasses/", "/updates/", "/codes/", "/methodology/"):
        assert path in sitemap_text
    for path in ("/coins-rebirth/", "/map/"):
        assert path not in sitemap_text

    robots = page.request.get(f"{BASE_URL}/robots.txt")
    assert robots.status == 200 and "Sitemap:" in robots.text()
    assert not console_errors, console_errors

    mobile.close()
    browser.close()

print(f"Validated {len(PAGES)} pages, mobile navigation, metadata, sitemap, robots, overflow, and console output.")
