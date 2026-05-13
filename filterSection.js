(() => {
    if (!location.hostname.includes("wsj.com")) return;

    const TARGET_SELECTORS = [
        "#opinion-module",
        '[class="fader"]',
        '[aria-label="WSJ Opinion | Free Expression"]',
        '[data-skip-label="WSJ Opinion | Free Expression"]',
        '[data-testid="podcasts-container"]',
        '[data-layout-type="buyside-right-rail"]',
        // '[data-layout-type="most-popular-opinion"]',
        '[aria-label="Most Popular Opinion"]',
        '[aria-label="Recommended Videos"]',
        '[data-layout-type="buyside-main"]',
        '[data-layout-type="realtor"]',
        '[title="‘Michael’ Fans Absolutely Don’t Care About the Film’s Bad Reviews"]',
    ];

    function replaceWithPlaceholder(container, matchedWords) {
        if (!container || container.dataset.filtered) return;

        const original = container.innerHTML;

        container.dataset.filtered = "true";

        container.innerHTML = `
            <div class="wsj-filter-card" title="${escapeHtml(matchedWords)}">
                <button class="wsj-section-restore">🙂 Show Section</button>
            </div>
        `;

        container.querySelector(".wsj-section-restore")
            .addEventListener("click", () => {
                container.innerHTML = original;
                container.dataset.filtered = "revealed";
            });
    }

    function run() {
        // 1. direct selectors (most reliable)
        TARGET_SELECTORS.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                replaceWithPlaceholder(el, sel);
            });
        });
    }

    run();

    const observer = new MutationObserver(run);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();