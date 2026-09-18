(() => {
    if (!location.hostname.includes("wsj.com")) return;

    const FILTER_KEYWORDS = [
        "#opinion-module",
        '[class="fader"]',
        '[aria-label="WSJ Opinion | Free Expression"]',
        '[data-skip-label="WSJ Opinion | Free Expression"]',
        '[data-testid="podcasts-container"]',
        '[data-layout-type="buyside-right-rail"]',
        '[data-layout-type="most-popular-opinion"]',
        '[aria-label="Most Popular Opinion"]',
        '[aria-label="Recommended Videos"]',
        '[data-layout-type="buyside-main"]',
        '[data-layout-type="realtor"]',
    ];

    // Initial run
    filterSections(FILTER_KEYWORDS);

    // Observe dynamic content changes (WSJ loads content lazily)
    const observer = new MutationObserver(filterSections);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();