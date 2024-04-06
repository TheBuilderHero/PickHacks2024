// background.js
function addCSPHeader() {
  var meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = 'default-src *';
  document.head.appendChild(meta);
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: addCSPHeader
  });
});