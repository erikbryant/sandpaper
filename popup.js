document.addEventListener('DOMContentLoaded', function() {
    const applyFilterButton = document.getElementById('applyFilterButton');

    applyFilterButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'applyFilter', keyword: 'foo' });
        });
    });
});
