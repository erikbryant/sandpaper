// Disable autoplay for videos

(() => {
    "use strict";

    if (window.__reutersAutoplayBlockerInstalled) return;
    window.__reutersAutoplayBlockerInstalled = true;

    const selector = ".jwplayer";

    function stopAutoplay(player) {
        if (!player.matches(selector)) return;

        // Ask JW Player to pause using its own API when available.
        const id = player.id;
        if (id && typeof window.jwplayer === "function") {
            try {
                const jw = window.jwplayer(id);
                if (jw && typeof jw.pause === "function") {
                    jw.pause();
                }
            } catch (_) {
                // Player may not be initialized yet.
            }
        }

        // Fallback: pause any HTML5 video inside the player.
        player.querySelectorAll("video").forEach(video => {
            video.autoplay = false;
            video.removeAttribute("autoplay");
            video.pause();
        });
    }

    function inspectPlayer(player) {
        if (player.classList.contains("jw-state-playing")) {
            stopAutoplay(player);
        }
    }

    function scan(root = document) {
        if (root.matches?.(selector)) inspectPlayer(root);
        root.querySelectorAll?.(selector).forEach(inspectPlayer);
    }

    // Catch players already present.
    scan();

    // Catch players that Reuters inserts or changes to playing state.
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === "attributes") {
                inspectPlayer(mutation.target);
            } else {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) scan(node);
                }
            }
        }
    });

    observer.observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class"]
    });
})();
