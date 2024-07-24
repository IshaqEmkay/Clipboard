document.addEventListener('copy', function(e) {
    const copiedText = document.getSelection().toString();
    console.log('Copied text:', copiedText);
    chrome.runtime.sendMessage({text: copiedText});
  });
  
document.addEventListener('cut', function(e) {
    const cutText = document.getSelection().toString();
    console.log('Cut text:', cutText);
    chrome.runtime.sendMessage({text: cutText});
  });
  