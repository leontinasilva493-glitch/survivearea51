from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:3100"
ARTIFACT_DIR = Path(r"C:\Users\胡天天\.codex\visualizations\2026\07\31\019fb940-c108-7072-ad6e-178d872ee1ab\field-guides-mvp")

ROUTES = {
    "weapons": {"indexed": True, "iframe": True},
    "map": {"indexed": False, "iframe": True},
    "coins-rebirth": {"indexed": False, "iframe": False},
    "codes": {"indexed": True, "iframe": False},
}


def assert_route(page, route: str, indexed: bool, iframe: bool, viewport: str) -> None:
    response = page.goto(f"{BASE_URL}/{route}/", wait_until="networkidle")
    assert response is not None and response.status == 200, f"{route} returned {response.status if response else 'no response'}"
    assert page.locator("h1").is_visible(), f"{route} has no visible h1"

    overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
    assert overflow <= 1, f"{route} overflows the {viewport} viewport by {overflow}px"

    robots = page.locator('meta[name="robots"]')
    robots_content = robots.get_attribute("content") if robots.count() else ""
    if indexed:
        assert "noindex" not in robots_content.lower(), f"{route} unexpectedly noindexed"
    else:
        assert "noindex" in robots_content.lower(), f"{route} is missing noindex"

    if iframe:
        assert page.locator('iframe[src*="youtube-nocookie.com"]').count() == 1, f"{route} is missing the gameplay embed"

    page.screenshot(path=ARTIFACT_DIR / f"{route}-{viewport}.png", full_page=True)


ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.route("**/youtube-nocookie.com/**", lambda route: route.abort())
    for route, contract in ROUTES.items():
        assert_route(page, route, **contract, viewport="desktop")

    page.set_viewport_size({"width": 390, "height": 844})
    for route, contract in ROUTES.items():
        assert_route(page, route, **contract, viewport="mobile")

    browser.close()

print(f"Visual checks passed; screenshots: {ARTIFACT_DIR}")
