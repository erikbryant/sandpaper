// Filter offensive headlines. Mostly applies to the home page.

(() => {
    if (!location.hostname.includes("wsj.com")) return;

    const FILTER_KEYWORDS = [
        "after an ice raid",
        "sexual-assault",
        "struck and killed by plane",
        "Massachusetts Man in a Hoodie",
        "Extorted by Sexual Partner",
        "Murder of Wife and Son",
        "Dead Bodies",
        "Therapists to Blame",
        "Hate Crime",
        "School Shoot",
        "Sexual Assault",
        "Sexual Violence",
        "The Idaho Murders",
        "Helicopter parents",
        "Wine That Pairs",
        "Domestic Abuse",
        "Sex Abuse",
        "Teen Marriage",
        "Shadow of My Own Thinness",
        "Murder Trial",
        "Luigi Mangione",
        "Hayden Panettiere",
        "L3Harris Ousts CEO",
        "Misbehaving CEOs",
        "Epstein",
        "Rape Allegations",
        "Fort Hood Shooter",
        "Firing Squad",
    ];

// Match full words only using regex word boundaries
    function getMatchedKeywords(text) {
        const lower = text.toLowerCase();

        return FILTER_KEYWORDS.filter(word => {
            const regex = new RegExp(`\\b${word}\\b`, "i");
            return regex.test(lower);
        });
    }

    function findContainer(element) {
        return (
            element.closest("article") ||
            element.closest('[class*="card"]') ||
            element.closest('[class*="story"]') ||
            element.closest("li") ||
            element.parentElement
        );
    }

    function removeHeadline(container) {
        if (!container) return;
        console.log("removeHeadline: ", container);
        container.remove()
    }

    function filterArticles() {
        const candidates = document.querySelectorAll("h1, h2, h3, p");

        candidates.forEach(el => {
            const text = el.innerText || "";
            if (text.length < 25) return;

            const matches = getMatchedKeywords(text);

            if (matches.length > 0) {
                const container = el.parentElement;
                console.log("filterArticles: ", matches)
                removeHeadline(container);
            }
        });
    }

    // Initial run
    filterArticles();

    // Observe dynamic content changes (WSJ loads content lazily)
    const observer = new MutationObserver(filterArticles);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();