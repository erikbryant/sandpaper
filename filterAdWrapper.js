(() => {
    if (!location.hostname.includes("wsj.com")) return;

    const FILTER_KEYWORDS = [
        'prediction-market',
        '[id="cx-membership-tile"]',
        '[class="adWrapper "]',
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