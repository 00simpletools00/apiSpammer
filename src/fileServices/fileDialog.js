const { dialog } = require('electron');

exports.showOpenFileDialog = async () => {
  try {
    const result = await dialog.showOpenDialog({
        filters: [
            { name: 'txt Files', extensions: ['txt'] }
        ], 
        properties: ['openFile']
    });
    return result.filePaths[0];
  } catch (error) {
    console.error('Error opening file dialog:', error);
    throw error;
  }
};
