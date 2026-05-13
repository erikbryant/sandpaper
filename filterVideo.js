(() => {
    if (!location.hostname.includes("wsj.com")) return;

    // ================================
    // 1. BLOCK AUTOPLAY AT THE SOURCE
    // ================================
    const originalPlay = HTMLMediaElement.prototype.play;

    HTMLMediaElement.prototype.play = function () {
        // Only target WSJ video players
        const isWSJVideo = this.closest && this.closest(".video-player");

        if (isWSJVideo) {
            // Block autoplay / scripted playback
            return Promise.resolve();
        }

        return originalPlay.apply(this, arguments);
    };

    // ================================
    // 2. STOP ANY CURRENTLY PLAYING VIDEOS
    // ================================
    function stopVideo(video) {
        if (!(video instanceof HTMLVideoElement)) return;

        try {
            video.autoplay = false;
            video.removeAttribute("autoplay");

            video.pause();
            video.currentTime = 0;
        } catch (e) {
            // ignore errors
        }
    }

    function scanVideos() {
        document.querySelectorAll("video").forEach(stopVideo);
    }

    // Initial run
    scanVideos();

    // Observe dynamic content changes (WSJ loads content lazily)
    const observer = new MutationObserver(scanVideos);

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();