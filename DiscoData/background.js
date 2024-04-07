// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'sendPrivacyPolicy') {
    var pp = message.data.privacyPolicy;
    var user = message.data.userEmail;
    var url = message.data.privacyPolicyUrl;

    // Send "pp" data to your server
    sendDataToServer(pp);

    // Return true to indicate that sendResponse will be called asynchronously
    return true;
  }
});

function sendDataToServer(pp) {
  var data = {
    pp: pp
  };

  fetch('http://localhost:5001/ce', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data sent to server:', data);
  })
  .catch(error => {
    console.error('Error sending data to server:', error);
  });
}
