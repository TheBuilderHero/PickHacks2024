// contentScript.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'extractPrivacyPolicy') {
    var privacyPolicy = findPrivacyPolicy();
    if (privacyPolicy) {
      chrome.runtime.sendMessage({ action: 'privacyPolicyExtracted', privacyPolicy: privacyPolicy });
    } else {
      chrome.runtime.sendMessage({ action: 'privacyPolicyNotFound' });
    }
  }
});

function findPrivacyPolicy() {
  var privacyPolicy = '';
  
  // Search for text containing "privacy policy" or similar phrases
  var elements = document.querySelectorAll('p, div, span, a');
  elements.forEach(function(element) {
    var text = element.innerText.trim();
    if (text.toLowerCase().includes('privacy policy') || 
        text.toLowerCase().includes('data protection') ||
        text.toLowerCase().includes('data privacy')) {
      privacyPolicy = text;
    }
  });
  
  return privacyPolicy;
}

