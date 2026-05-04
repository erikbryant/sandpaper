(() => {
    if (!location.hostname.includes("wsj.com")) return;

    const TARGET_SELECTORS = [
        "#opinion-module",
        '[aria-label="WSJ Opinion | Free Expression"]',
        '[data-skip-label="WSJ Opinion | Free Expression"]',
        '[data-testid="podcasts-container"]',
        '[data-layout-type="buyside-right-rail"]',
        '[aria-label="Most Popular Opinion"]',
        '[data-layout-type="buyside-main"]',
        '[data-layout-type="realtor"]',
        '[id="wtrn-block-7"]', // MarketWatch
        '[title="‘Michael’ Fans Absolutely Don’t Care About the Film’s Bad Reviews"]'
    ];

    function removeSection(el, label = "section") {
        if (!el || el.dataset.removed) return;

        const original = el.innerHTML;

        el.dataset.removed = "true";

        el.innerHTML = `
            <div class="wsj-section-removed wsj-filter-card">
                <button class="wsj-section-restore">🙂 Show Section</button>
            </div>
        `;

        el.querySelector(".wsj-section-restore")
            .addEventListener("click", () => {
                el.innerHTML = original;
                el.dataset.removed = "restored";
            });
    }

    function run() {
        // 1. direct selectors (most reliable)
        TARGET_SELECTORS.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                removeSection(el, sel);
            });
        });

        // // 2. fallback safety: catch re-rendered copies
        // document.querySelectorAll("section, div").forEach(el => {
        //     if (el.dataset.removed) return;
        //
        //     const label = el.getAttribute("aria-label") || "";
        //     const skip = el.getAttribute("data-skip-label") || "";
        //
        //     if (
        //         label.includes("Free Expression") ||
        //         skip.includes("Free Expression")
        //     ) {
        //         removeSection(el, "Free Expression");
        //     }
        // });
    }

    run();

    const observer = new MutationObserver(run);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();