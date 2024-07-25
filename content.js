document.addEventListener('copy', (event) => {
  const copiedText = document.getSelection().toString();
  console.log('Copied text:', copiedText);

  chrome.runtime.sendMessage({ action: "saveToClipboard", text: copiedText }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('Error sending message:', chrome.runtime.lastError);
    } else if (response.status === "success") {
      console.log('Text successfully saved to clipboard');
    } else {
      console.error('Failed to save text to clipboard');
    }
  });
});
