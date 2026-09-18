(() => {
    if (!location.hostname.includes("xhamsterlive.com")) return;

    const FILTER_KEYWORDS = [
        '[class="stripchat-light-theme"]',
    ];

    function filter() {
        filterSections(FILTER_KEYWORDS);
    }

    // Initial run
    filter();

    // Observe dynamic content changes in case the site loads content lazily
    const observer = new MutationObserver(filter);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();