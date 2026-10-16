// Remove the paywall

(() => {
    const FILTER_KEYWORDS = [
        '[class="fc-ab-root"]',
    ];

    function filter() {
        if (window.paywall &&
            typeof window.paywall.hide === "function") {
            window.paywall.hide();
        }
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