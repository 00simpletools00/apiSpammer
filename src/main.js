const { app, BrowserWindow, ipcMain } = require('electron')
const { showOpenFileDialog } = require('./fileServices/fileDialog');
const mongodbHandler = require('./dataBase/mongodbHandler');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1920 ,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  mainWindow.loadFile('./pages/dataSource.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


ipcMain.on('open-file-dialog', async (event) => {
  try {
    const filePath = await showOpenFileDialog();
    if (filePath > '') event.sender.send('file-selected', filePath);
  } catch (error) {
    console.error('Error handling open file dialog:', error);
  }
});

ipcMain.on('connect-to-DB', async (event, connectionString) => {
  if (!connectionString) {
    event.sender.send('bad-connection-string', 'Connection string is required');
    return; 
  }
  
  try {
    await mongodbHandler.connectToMongoDBServer(connectionString);
    event.sender.send('connection-succeed');
    const dbLists = await mongodbHandler.getDBList();
    event.sender.send('dbList-retrived', dbLists);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    event.sender.send('connection-failed', 'Failed to connect to MongoDB');
  }
});
