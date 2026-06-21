(() => {
    if (!location.hostname.includes("wsj.com")) return;

    function applyBackground() {
        document.body.style.backgroundColor = "#d0d0d0";
    }

    applyBackground();

    new MutationObserver(applyBackground).observe(document.body, {
        childList: true,
        subtree: true
    });
})();
