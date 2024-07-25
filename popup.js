document.addEventListener('DOMContentLoaded', () => {
  loadClipboardItems();

  document.getElementById('clearClipboard').addEventListener('click', () => {
    chrome.storage.sync.set({ clipboardItems: [] }, () => {
      loadClipboardItems();
    });
  });
});

function loadClipboardItems() {
  chrome.storage.sync.get(['clipboardItems'], (result) => {
    const items = result.clipboardItems || [];
    const clipboardList = document.getElementById('clipboardList');
    clipboardList.innerHTML = '';

    items.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

      const textSpan = document.createElement('span');
      textSpan.textContent = item;

      const buttonGroup = document.createElement('div');

      const copyButton = document.createElement('button');
      copyButton.className = 'btn btn-primary btn-sm mr-1';
      copyButton.textContent = 'Copy';
      copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(item).then(() => {
          showAlert('Copied');
        });
      });

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger btn-sm';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        items.splice(index, 1);
        chrome.storage.sync.set({ clipboardItems: items }, () => {
          loadClipboardItems();
        });
      });

      const pinButton = document.createElement('button');
      pinButton.className = 'btn btn-success btn-sm';
      pinButton.textContent = 'Pin';
      pinButton.addEventListener('click', () => {
        items.splice(index, 1);
        items.unshift(item);
        chrome.storage.sync.set({ clipboardItems: items }, () => {
          loadClipboardItems();
        });
      });

      buttonGroup.appendChild(copyButton);
      buttonGroup.appendChild(deleteButton);
      buttonGroup.appendChild(pinButton);

      listItem.appendChild(textSpan);
      listItem.appendChild(buttonGroup);

      clipboardList.appendChild(listItem);
    });
  });
}

function showAlert(message) {
  const alertBox = document.getElementById('alertBox');
  alertBox.textContent = message;
  alertBox.style.display = 'block';

  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 2000);
}
