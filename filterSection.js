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

    function filter() {
        filterSections(FILTER_KEYWORDS);
    }

    // Initial run
    filter();

    // Observe dynamic content changes (WSJ loads content lazily)
    const observer = new MutationObserver(filter);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();