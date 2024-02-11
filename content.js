chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'applyFilter') {
    const divs = document.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++) {
      let attr = divs[i].getAttribute("data-inset_type");
      if (attr === "tiktok") {
        console.log('Removing TikTok video')
        divs[i].remove();
      }
    }
  }
});
