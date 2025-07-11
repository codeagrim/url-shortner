chrome.contextMenus.create({
  id: 'shorten-url',
  title: 'Shorten Current URL',
  contexts: ['page'],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'shorten-url') {
    chrome.runtime.sendMessage({
      action: 'shortenUrl',
      url: tab.url,
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'shortenUrl') {
    fetch('http://localhost:3001/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl: request.url }),
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.shortUrl) {
          navigator.clipboard.writeText(data.shortUrl);
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'URL Shortened',
            message: `Short URL copied: ${data.shortUrl}`,
          });
        } else {
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Error',
            message: data.message || 'Failed to shorten URL',
          });
        }
      })
      .catch(() => {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon.png',
          title: 'Error',
          message: 'Server error',
        });
      });
  }
});