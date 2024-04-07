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
        document.getElementById('result').textContent = privacyPolicy || 'Privacy policy not found';

        // Send extracted privacy policy text, user's email, and privacy policy URL to background.js
        chrome.runtime.sendMessage({ 
          action: 'sendPrivacyPolicy',
          data: {
            privacyPolicy: privacyPolicy,
            privacyPolicyUrl: activeTab.url
          }
        }, function(response) {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError.message);
          } else if (response && response.data) {
            console.log('Data sent to backend:', response.data);
          } else if (response && response.error) {
            console.error('Error sending data to backend:', response.error);
          } else {
            console.warn('Unexpected response:', response);
          }
        });

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
      
      // Generate TXT and return the download link
      function generateTXT(text) {
        return new Promise((resolve, reject) => {
          // Create a new Blob object
          const blob = new Blob([text], { type: 'text/plain' });
          
          // Generate a unique URL for the Blob object
          const url = URL.createObjectURL(blob);
          
          // Create a new anchor element
          const a = document.createElement('a');
          
          // Set the href and download attributes to the Blob URL
          a.href = url;
          a.download = 'privacy_policy.txt';
          
          // Append the anchor element to the body and click it to trigger the download
          document.body.appendChild(a);
          a.click();
          
          // Remove the anchor element from the body
          document.body.removeChild(a);
          
          resolve({ result: url });
        });
      }

      // Call generateTXT function
      return generateTXT(privacyPolicyText.trim());
    }).catch(error => {
      console.error('Error fetching privacy policy:', error);
      return Promise.reject('Error fetching privacy policy');
    });

  } else {
    console.error('Privacy policy links not found');
    return Promise.reject('Privacy policy links not found');
  }
}



