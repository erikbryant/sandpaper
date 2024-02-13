chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  let elements;

  // Remove WSJ cloudfront-hosted ads
  elements = document.getElementsByTagName("a");
  for (let i = 0; i < elements.length; i++) {
    let attr = elements[i].getAttribute("href");
    if (attr !== null && attr.includes('.cloudfront.net')) {
      let parent = elements[i].parentElement.parentElement.parentElement;
      console.log('Removing cloudfront-hosted ad');
      parent.remove();
    }
  }

  // Remove WSJ tiktok videos
  elements = document.getElementsByTagName("div");
  for (let i = 0; i < elements.length; i++) {
    let attr = elements[i].getAttribute("data-inset_type");
    if (attr === "tiktok") {
      console.log('Removing TikTok video');
      elements[i].remove();
    }
  }

  // Remove WSJ nav bar
  elements = document.getElementsByTagName("nav");
  for (let i = 0; i < elements.length; i++) {
    let attr = elements[i].getAttribute("aria-label");
    if (attr === "Primary") {
      console.log('Removing nav bar');
      elements[i].remove();
      elements[i].remove(); // I don't know it only works if we do this twice
    }
  }

  // Remove WSJ home page ads and opinions
  elements = document.getElementsByTagName("div");
  for (let i = 0; i < elements.length; i++) {
    let attr = elements[i].getAttribute("class");
    if (attr !== null && attr.startsWith('WSJTheme--padding-bottom')) {
      console.log('Removing top ad')
      elements[i].remove();
    }
    if (attr !== null && attr.startsWith('WSJTheme--adWrapper')) {
      console.log('Removing ad wrapper');
      elements[i].remove();
    }
  }

  // Remove embedded videos
  elements = document.getElementsByTagName("div");
  for (let i = 0; i < elements.length; i++) {
    let attr = elements[i].getAttribute("data-type");
    if (attr === "video") {
      console.log('Removing embedded video');
      elements[i].remove();
    }
  }

});
