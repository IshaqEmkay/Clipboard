chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "saveToClipboard",
      title: "Save to Clipboard",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveToClipboard" && info.selectionText) {
      saveToClipboard(info.selectionText);
    }
  });
  
  function saveToClipboard(text) {
    chrome.storage.sync.get(['clipboardItems'], function(result) {
      const items = result.clipboardItems || [];
      items.push(text);
      chrome.storage.sync.set({ clipboardItems: items }, function() {
        console.log('Clipboard items updated:', items);
      });
    });
  }
  