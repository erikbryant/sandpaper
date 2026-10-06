// Removes the ad blocker detector warning.

(() => {
    if (!location.hostname.includes("wsj.com")) return;

    function filterAdBlockerDetector() {
        "use strict";

        const detector = document.getElementById("comtech-notification");
        if (!detector) return;

        console.log("filterAdBlockerDetector: ", detector);
        detector.remove();
    }

    // Initial run
    filterAdBlockerDetector();

    // Observe dynamic content changes (WSJ loads content lazily)
    const observer = new MutationObserver(filterAdBlockerDetector);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();