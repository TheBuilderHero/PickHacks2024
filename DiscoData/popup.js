document.getElementById('extractButton').addEventListener('click', function() {
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
  var privacyPolicyElements = document.querySelectorAll('a[href*="privacy"], a[href*="privacypolicy"], a[href*="privacy-policy"], a[href*="privacy_policy"], a[href*="privacy%20policy"], p');

  var privacyPolicyText = '';
  
  privacyPolicyElements.forEach(function(element) {
    var textContent = element.textContent.toLowerCase();
    
    if (textContent.includes("privacy policy") || textContent.includes("privacy_policy")) {
      privacyPolicyText += element.textContent + '\n';
    }
  });

  return Promise.resolve({result: privacyPolicyText.trim()});
}
