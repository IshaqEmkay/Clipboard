document.addEventListener('DOMContentLoaded', function() {
    const newItemInput = document.getElementById('newItem');
    const addItemButton = document.getElementById('addItem');
    const clipboardList = document.getElementById('clipboardList');
  
    // Load clipboard items from storage
    chrome.storage.sync.get(['clipboardItems'], function(result) {
      const items = result.clipboardItems || [];
      items.forEach(item => {
        addClipboardItem(item);
      });
    });
  
    // Add new item to the clipboard
    addItemButton.addEventListener('click', function() {
      const newItem = newItemInput.value.trim();
      if (newItem) {
        chrome.storage.sync.get(['clipboardItems'], function(result) {
          const items = result.clipboardItems || [];
          items.push(newItem);
          chrome.storage.sync.set({clipboardItems: items}, function() {
            addClipboardItem(newItem);
            newItemInput.value = '';
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
  
      li.appendChild(pinButton);
      li.appendChild(deleteButton);
      clipboardList.appendChild(li);
    }
  });
  