// Basic HTML escaping
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function removeSection(container) {
    if (!container) return;
    container.remove()
}

function filterSections(keywords) {
    keywords.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            // replaceWithPlaceholder(el, sel);
            removeSection(el);
        });
    });
}
