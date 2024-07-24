document.addEventListener('DOMContentLoaded', function() {
    const clipboardList = document.getElementById('clipboardList');
  
    // Load clipboard items from storage
    chrome.storage.sync.get(['clipboardItems'], function(result) {
      const items = result.clipboardItems || [];
      items.forEach(item => {
        addClipboardItem(item);
      });
    });
  
    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.text) {
        chrome.storage.sync.get(['clipboardItems'], function(result) {
          const items = result.clipboardItems || [];
          items.push(request.text);
          chrome.storage.sync.set({clipboardItems: items}, function() {
            addClipboardItem(request.text);
          });
        });
      }
    });
  
    // Function to add a clipboard item to the list
    function addClipboardItem(item) {
      const li = document.createElement('li');
      li.textContent = item;
  
      const pinButton = document.createElement('button');
      pinButton.textContent = 'Pin';
      pinButton.addEventListener('click', function() {
        // Handle pinning item (move to top)
        chrome.storage.sync.get(['clipboardItems'], function(result) {
          const items = result.clipboardItems || [];
          const index = items.indexOf(item);
          if (index > -1) {
            items.splice(index, 1);
            items.unshift(item);
            chrome.storage.sync.set({clipboardItems: items}, function() {
              clipboardList.removeChild(li);
              addClipboardItem(item);
            });
          }
        });
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        // Handle deleting item
        chrome.storage.sync.get(['clipboardItems'], function(result) {
          const items = result.clipboardItems || [];
          const index = items.indexOf(item);
          if (index > -1) {
            items.splice(index, 1);
            chrome.storage.sync.set({clipboardItems: items}, function() {
              clipboardList.removeChild(li);
            });
          }
        });
      });
  
      const copyButton = document.createElement('button');
      copyButton.textContent = 'Copy';
      copyButton.addEventListener('click', function() {
        // Handle copying item to clipboard
        navigator.clipboard.writeText(item).then(() => {
          console.log('Text copied to clipboard');
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });
      });
  
      li.appendChild(pinButton);
      li.appendChild(deleteButton);
      li.appendChild(copyButton);
      clipboardList.appendChild(li);
    }
  });
  