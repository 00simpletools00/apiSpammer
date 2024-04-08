const { ipcRenderer } = require('electron');

const browseButton = document.getElementById('file-browse-button');
const filePathInput = document.getElementById('file-path-text');

const connectButton = document.getElementById('connect-button');
const connectionString = document.getElementById('connection-string-text');

const DBDropDown = document.getElementById('DB-drop-down');
const dbMenu = document.getElementById('DB-menu');

browseButton.addEventListener('click', () => {
  ipcRenderer.send('open-file-dialog');
});

ipcRenderer.on('file-selected', (event, filePath) => {
  filePathInput.value = filePath;
});

connectButton.addEventListener('click', () => {
  ipcRenderer.send('connect-to-DB', connectionString.value);
});


ipcRenderer.on('dbList-retrived', (event, dbLists) => {
  dbMenu.innerHTML = '';
  dbLists.forEach(dbName => {
    const menuItem = document.createElement('a');
    menuItem.classList.add('dropdown-item');
    menuItem.href = '#';
    menuItem.textContent = dbName;
    dbMenu.appendChild(menuItem);
  });
});
