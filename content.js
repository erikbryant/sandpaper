chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch(location.host) {
    case 'www.wsj.com':
      wsj();
      break;
    case 'www.nytimes.com':
      nyTimes();
      break;
    default:
      console.log('No sandpaper handler for:', location.host)
  }
});

// Remove an attribute (or its parent) from the document
function remove(elementType, attrName, attrValue, parents, note ) {
  const elements = document.getElementsByTagName(elementType);
  for (let i = 0; i < elements.length; i++) {
    let attr = elements[i].getAttribute(attrName);
    if (attr !== null && attr.startsWith(attrValue)) {
      // Walk up through the parents
      let outer = elements[i];
      for (let p = 0; p < parents; p++) {
        outer = outer.parentElement
      }
      console.log(note);
      outer.remove();
    }
  }
}

// New York Times site smoothing
function nyTimes() {
  // Remove nav bar
  remove('div', 'data-testid', 'masthead-nested-nav', 0, 'Removing nav bar');

  // Remove slideshow animations
  remove('div', 'class', 'slideshow-animate', 0, 'Removing slideshow');

  // Remove auto-play videos
  remove('section', 'aria-label', 'Gallery', 0, 'Removing video');
}

// Wall Street Journal site smoothing
function wsj() {
  // Remove cloudfront-hosted ads
  remove('a', 'href', '.cloudfront.net', 0, 'Removing cloudfront-hosted ad');

  // Remove tiktok videos
  remove('div', 'data-inset_type', 'tiktok', 0, 'Removing TikTok video');

  // Remove nav bar
  remove('nav', 'aria-label', 'Primary', 0, 'Removing nav bar');
  remove('nav', 'aria-label', 'Primary', 0, 'Removing nav bar');  // I don't know why we need to do this twice

  // Remove home page ads and opinions
  remove('div', 'class', 'WSJTheme--padding-bottom', 0, 'Removing top ad');
  remove('div', 'class', 'WSJTheme--adWrapper', 0, 'Removing ad wrapper');

  // Remove embedded videos
  remove('div', 'data-type', 'video', 0, 'Removing embedded video');
}
