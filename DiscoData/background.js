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

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'sendPrivacyPolicy') {
    var pp = message.data.privacyPolicy;
    var user = message.data.userEmail;
    var url = message.data.privacyPolicyUrl;

    // Send data to your server
    sendDataToServer(user, pp, url, function(response) {
      sendResponse(response);
    });

    // Return true to indicate that sendResponse will be called asynchronously
    return true;
  }
});

function sendDataToServer(user, pp, url, callback) {
  var data = {
    user: user,
    pp: pp,
    url: url
  };

  fetch('http://localhost:5001/pp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data sent to server:', data);
    callback({ data: data });
  })
  .catch(error => {
    console.error('Error sending data to server:', error);
    callback({ error: 'Error sending data to server' });
  });
}
