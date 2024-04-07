document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    
    chrome.scripting.executeScript({
      target: {tabId: activeTab.id},
      function: addCSPHeader
    }).then(() => {
      chrome.scripting.executeScript({
        target: {tabId: activeTab.id},
        function: extractPrivacyPolicy
      }).then(function(results) {
        var privacyPolicy = results[0].result;
        console.log(privacyPolicy);  // Log the privacy policy text to the console
        document.getElementById('result').textContent = 'Report Generated';

        // Send extracted privacy policy text and URL to your server
        sendDataToServer(privacyPolicy, activeTab.url);

      }).catch(function(error) {
        console.error('Error executing script:', error);
      });
    }).catch(function(error) {
      console.error('Error adding CSP header:', error);
    });
  });
});

function addCSPHeader() {
  var meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = 'default-src *';
  document.head.appendChild(meta);
}

function extractPrivacyPolicy() {
  var privacyPolicyLinks = document.querySelectorAll(`a[href*="privacy"], a[href*="privacypolicy"], a[href*="privacy-policy"], a[href*="privacy_policy"], a[href*="privacy%20policy"], a[href*="privacy policy"], a[href*="brands-privacy"], a[href*="https://www.dotdashmeredith.com/brands-privacy"]`);

  if (privacyPolicyLinks.length > 0) {
    var privacyPolicyText = '';

    // Helper function to fetch and extract text content from a URL
    async function fetchAndExtractText(url) {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    }

    // Fetch and extract text content from each privacy policy URL
    const fetchPromises = Array.from(privacyPolicyLinks).map(link => fetchAndExtractText(link.href));

    return Promise.all(fetchPromises).then(textContents => {
      privacyPolicyText = textContents.join('\n\n');  // Join text contents with double new lines
      console.log('Privacy policy text:', privacyPolicyText);  // Tester console log statement
      return privacyPolicyText.trim();
    }).catch(error => {
      console.error('Error fetching privacy policy:', error);
      return Promise.reject('Error fetching privacy policy');
    });

  } else {
    console.error('Privacy policy links not found');
    return Promise.reject('Privacy policy links not found');
  }
}

// Function to send data to the server
function sendDataToServer(pp, url) {
  var data = {
    pp: pp, // privacy policy text
    url: url // URL of the current tab
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
