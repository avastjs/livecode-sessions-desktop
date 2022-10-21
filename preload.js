// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
})

ipcRenderer.on("fromMain", (event, data) => {
  console.log('send to fe')
});

contextBridge.exposeInMainWorld('electronAPI', {
    executeApp: (params) => ipcRenderer.send('execute-app', params)
})
