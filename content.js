document.addEventListener('copy', (event) => {
    const copiedText = document.getSelection().toString();
    console.log('Copied text:', copiedText);
  
    chrome.runtime.sendMessage({ text: copiedText }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
      } else {
        console.log('Message sent:', response);
      }
    });
  });
  