// Removes selected "Other Buckets" sections from the Wall Street Journal
// homepage. The script identifies buckets by their stable `data-testid`
// attributes rather than by generated CSS class names.

(() => {
    if (!location.hostname.includes("wsj.com")) return;

    function filterGrid() {
        "use strict";

        const hiddenBuckets = new Set([
            "bucket-label-marketwatch",
            "bucket-label-barron’s",   // Note: typographic apostrophe (U+2019)
            "bucket-label-investor’s-business-daily",   // Note: typographic apostrophe (U+2019)
            "bucket-label-mansion-global",
        ]);

        const otherBuckets = document.getElementById("other-buckets");
        if (!otherBuckets) {
            return;
        }

        const grid = otherBuckets.firstElementChild;
        if (!grid) {
            return;
        }

        for (const bucket of grid.children) {
            const label = bucket.querySelector('[data-testid^="bucket-label-"]');
            if (!label) {
                continue;
            }

            if (hiddenBuckets.has(label.dataset.testid)) {
                bucket.remove();
            }
        }
    }

    // Initial run
    filterGrid();

    // Observe dynamic content changes (WSJ loads content lazily)
    const observer = new MutationObserver(filterGrid);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();