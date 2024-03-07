chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Host: ' + location.host);
  switch (location.host) {
    case 'www.wsj.com':
      wsj();
      break;
    case 'www.nytimes.com':
      nyTimes();
      break;
    case 'www.iflscience.com':
      iflscience();
      break;
    default:
      console.log('No sandpaper handler for:', location.host)
  }
});

// Remove an attribute (or its parent) from the document
function remove(elementType, attrName, attrValue, parents, note) {
  const elements = document.getElementsByTagName(elementType);

  for (let i = 0; i < elements.length; i++) {
    let attr = elements[i].getAttribute(attrName);
    if (attr === null || !attr.includes(attrValue)) {
      continue
    }
    // Walk up through the parents
    let outer = elements[i];
    for (let p = 0; p < parents; p++) {
      outer = outer.parentElement
    }
    console.log('Remove: ' + note);
    outer.remove();
  }
}

// Remove content about a given topic
function elide(elementType, topic, parents) {
  const note = 'Elide: \'' + topic + '\'';
  const elements = document.getElementsByTagName(elementType);

  for (let i = 0; i < elements.length; i++) {
    let text = elements[i].innerText;
    if (text === undefined || text === null) {
      continue
    }
    text = text.toLowerCase();
    if (!text.includes(topic.toLowerCase())) {
      continue
    }
    // Walk up through the parents
    let outer = elements[i];
    for (let p = 0; p < parents; p++) {
      outer = outer.parentElement
    }
    console.log(note);
    outer.remove();
  }
}

// Find an element/attr and log it to the console
function print(elementType, attrName, attrValue) {
  const elements = document.getElementsByTagName(elementType);

  for (let i = 0; i < elements.length; i++) {
    let attr = elements[i].getAttribute(attrName);
    if (attr !== null && attr.includes(attrValue)) {
      console.log(elements[i].innerText);
    }
  }
}

// New York Times site smoothing
function nyTimes() {
  // Remove nav bar
  remove('div', 'data-testid', 'masthead-nested-nav', 0, 'nav bar');

  // Remove sponsor wrapper
  remove('div', 'id', 'sponsor-wrapper', 0, 'sponsor wrapper');

  // Remove slideshow animations
  remove('div', 'class', 'slideshow-animate', 2, 'slideshow');

  // Remove auto-play videos
  remove('section', 'aria-label', 'Gallery', 0, 'video');
  remove('div', 'class', 'react-vhs-container', 4, 'autoplay video');
  remove('video', 'data-play', 'true', 0, 'video element');
  remove('figure', 'data-testid', 'VideoBlock', 0, 'video block');
  remove('blockquote', 'class', 'tiktok-embed', 1, 'tiktok video');

  // Remove opinion sections
  remove('a', 'href', '/opinion/', 3, 'opinions');
  remove('a', 'href', '/opinion/columnist', 3, 'opinion section');
  elide('h2', 'opinion', 0);

  // Remove articles about gruesome topics
  elide('p', ' grisly ', 2);
  elide('p', ' racism ', 2);
  elide('p', ' rape ', 2);
  elide('p', ' killing ', 2);
  elide('p', ' killed ', 2);
  elide('p', 'stalked by men', 3);
  // ...Highlight articles
  elide('p', 'suspect in the killing', 7);
  // ...More News
  elide('p', 'child abuse', 1);
  elide('p', 'traumatize', 1);
  elide('p', 'homicide', 1);
  elide('p', 'sexual assault', 2);
  elide('p', 'anti-trans policies', 2);
  elide('p', 'murder suspect', 2);
  elide('p', 'death toll', 2);
  elide('p', 'shot dead', 2);
  elide('p', 'children die', 2);
  elide('p', 'body found', 2);
  elide('p', 'kills dozens', 2);
  elide('p', 'teens are shot', 2);
  elide('p', 'life in nazi camps', 2);
  // ...News snippets
  elide('p', 'deaths of gazans', 2);
  elide('p', 'scare us again', 2);
  elide('p', 'covid deaths in nursing homes', 2);
  elide('p', 'sex assaults and other crimes', 2);
}

// Wall Street Journal site smoothing
function wsj() {
  // Remove cloudfront-hosted ads
  remove('a', 'href', '.cloudfront.net', 0, 'cloudfront-hosted ad');

  // Remove tiktok videos
  remove('div', 'data-inset_type', 'tiktok', 0, 'TikTok video');

  // Remove nav bar
  remove('nav', 'aria-label', 'Primary', 0, 'nav bar');
  remove('nav', 'aria-label', 'Primary', 0, 'nav bar');  // I don't know why we need to do this twice

  // Remove home page ads and opinions
  remove('div', 'class', 'WSJTheme--padding-bottom', 0, 'top ad');
  remove('div', 'class', 'WSJTheme--adWrapper', 0, 'ad wrapper');

  // Remove most popular opinion
  remove('aside', 'id', 'most-popular-opinion-articles', 1, 'most popular opinion');
  remove('div', 'aria-label', 'Most Popular Opinion', 0, 'most popular opinion');

  // Remove most popular videos that are opinions
  remove('a', 'href', '/wsj-opinion', 1, 'most popular video opinion');

  // Remove embedded videos
  remove('div', 'data-type', 'video', 0, 'embedded video');

  // Remove pop-up page header/menu
  remove('header', 'class', 'MainHeader-CollapsedHeader', 0, 'pop-up header');

  // Remove live market data tags
  remove('a', 'class', 'ChicletStyle', 0, 'market data tag');

  // Remove newsletter inset
  elide('p', 'newsletter sign-up', 4);

  // Remove sidebar ads
  remove('div', 'class', 'sponsor-title', 2, 'sidebar ads');

  // Remove slideshows
  remove('img', 'srcset', 'http', 0, 'slideshow image');

  // Remove popups
  elide('a', 'subscriber benefits', 0);
  elide('a', 'the journal podcast', 0);
  elide('a', 'my market watchlist', 0);
  elide('a', 'subscriber updates', 0);
  elide('a', 'wsj newsletters', 0);
  elide('a', 'play wsj puzzles', 0);
  elide('a', 'be ready for tax time', 0);
  remove('img', 'alt', 'Explore the App', 0, 'explore app popup');

  // Remove articles about gruesome topics
  elide('a', 'shooting horror', 5);
  elide('a', 'homicide', 5);
  elide('a', 'killing amish children', 3);
  elide('a', 'grief, murder and extortion', 3);
  elide('a', 'murder, sexual violence', 1);
  elide('a', 'hostages hamas', 1);
  elide('span', 'violent crime is rising', 2);
  // What to read next
  elide('p', 'child exploitation', 5);
  elide('p', 'sex-abuse', 5);
}

function iflscience() {
  // Remove pop-up title bar
  remove('div', 'class', 'header-primary', 0, 'pop-up header: primary');
  remove('div', 'class', 'header-secondary', 0, 'pop-up header: secondary');
  remove('aside', 'class', 'sidebar', 0, 'sidebar');
  remove('div', 'id', 'taboola', 0, 'trailing ads');
  remove('div', 'id', 'spotim-specific', 0, 'community, comments');
}