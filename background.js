chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "saveToClipboard",
      title: "Save to Clipboard",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveToClipboard" && info.selectionText) {
      console.log('Context menu clicked:', info.selectionText);
      saveToClipboard(info.selectionText);
    }
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.text) {
      console.log('Message received:', request.text);
      saveToClipboard(request.text);
    }
  });
  -
  function saveToClipboard(text) {
    chrome.storage.sync.get(['clipboardItems'], function(result) {
      const items = result.clipboardItems || [];
      items.push(text);
      console.log('Saving to clipboard:', items);
      chrome.storage.sync.set({clipboardItems: items});
    });
  }
  