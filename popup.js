document.addEventListener('DOMContentLoaded', function() {
    // const sandpaperButton = document.getElementById('sandpaperButton');

    // sandpaperButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'sandpaper', keyword: 'smoothIt' });
        });
    // });
});
