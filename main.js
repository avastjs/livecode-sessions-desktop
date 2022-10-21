// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, BrowserView } = require('electron')
const path = require('path')

const UI_URL = "https://live.vastjs.io/sessions.html"

let mainWindow;

async function executeApp(win, params) {
  const drawView = new BrowserView()
  mainWindow.addBrowserView(drawView)
  drawView.setBounds({ x: 0, y: 25, width: 624, height: 375 })
  drawView.setAutoResize({ width: true, height: true, vertical: true, horizontal: true })

  const audioView = new BrowserView()
  mainWindow.addBrowserView(audioView)
  audioView.setBounds({ x: 624, y: 25, width: 400, height: 375 })
  audioView.setAutoResize({ width: true, height: true, vertical: true, horizontal: true })

  const codeView = new BrowserView()
  mainWindow.addBrowserView(codeView)
  codeView.setBounds({ x: 0, y: 400, width: 1024, height: 400 })
  codeView.setAutoResize({ width: true, height: true, vertical: true })

  audioView.webContents.loadURL(params.audio_chat)
  drawView.webContents.loadURL(params.live_draw_url)
  codeView.webContents.loadURL(params.live_url)
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // mainWindow.webContents.openDevTools();
  ipcMain.on('execute-app', (_event, params) => {
    executeApp(mainWindow, params)
  })

  mainWindow.loadURL(UI_URL)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
