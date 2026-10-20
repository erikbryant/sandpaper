// Basic HTML escaping
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function removeContainer(container) {
    if (!container) return;
    console.log("removeContainer: ", container);
    container.remove()
}

function filterSections(keywords) {
    keywords.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            console.log("filterSections: ", sel);
            removeContainer(el);
        });
    });
}
