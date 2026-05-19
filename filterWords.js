(() => {
    if (!location.hostname.includes("wsj.com")) return;

    function filterSections() {
        // Remove dynamic stock tickers
        document.querySelectorAll('a[data-type="company"]').forEach(firstAnchor => {
            const container = firstAnchor.parentElement;

            if (!container) return;

            const anchors = container.querySelectorAll('a');

            if (anchors.length >= 2) {
                anchors[1].remove();
            }
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