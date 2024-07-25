chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");

  // Create context menu item
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

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveToClipboard" && request.text) {
    saveToClipboard(request.text);
    sendResponse({ status: "success" });
  } else {
    sendResponse({ status: "failure" });
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
