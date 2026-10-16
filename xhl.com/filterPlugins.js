// Remove all iFrames with title="Plugin panel.*"

(() => {
    function filter() {
        const allIframes = document.getElementsByTagName('IFRAME');
        const matchedIframes = Array.from(allIframes).filter(iframe => iframe.title.startsWith('Plugin panel'));
        matchedIframes.forEach(iframe => {
            console.log("filter: ", iframe);
            removeContainer(iframe);
        });
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