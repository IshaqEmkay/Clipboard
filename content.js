document.addEventListener('copy', function(e) {
    const copiedText = document.getSelection().toString();
    chrome.runtime.sendMessage({text: copiedText});
  });
  
  document.addEventListener('cut', function(e) {
    const cutText = document.getSelection().toString();
    chrome.runtime.sendMessage({text: cutText});
  });
  