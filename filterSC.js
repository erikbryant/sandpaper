(() => {
    if (!location.hostname.includes("xhamsterlive.com")) return;

    const FILTER_KEYWORDS = [
        '[class="stripchat-light-theme"]',
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