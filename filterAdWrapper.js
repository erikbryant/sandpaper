(() => {
    if (!location.hostname.includes("wsj.com")) return;

    const FILTER_KEYWORDS = [
        'prediction-market',
        '[id="cx-membership-tile"]',
        '[class="adWrapper "]',
    ];

    function removeSection(container) {
        if (!container) return;
        container.remove()
    }

    function filterSections() {
        FILTER_KEYWORDS.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                removeSection(el.parentElement);
            });
        });
    }

    // Initial run
    filterSections();

    // Observe dynamic content changes (WSJ loads content lazily)
    const observer = new MutationObserver(filterSections);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();