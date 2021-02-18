import Electron, { app, BrowserWindow, globalShortcut, ipcMain, Tray } from 'electron'
import path from 'path'
import showWindow from './utils/showWindow'
import open from 'open'
import username from 'username'
import Store from 'electron-store'

const assetsDir = path.join(__dirname, 'assets')

// For hot reload on the userland
import electronReload from 'electron-reload'
electronReload(__dirname)

let tray = undefined
let window = undefined

// Don't show the app in the dock
// if (process.platform === "darwin") {
//   app.dock.hide()
// }

// Creating new electron-store instance
const store = new Store();

app.on('ready', () => {
  createTray()
  createWindow() 
})

// Quit the app when the window is closed
app.on('window-all-closed', () => {
  app.quit()
})

const createTray = () => {
  tray = new Tray(path.join(assetsDir, 'logo_small.png'))
  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', function (event) {
    toggleWindow()
  })
}

const createWindow = () => {
  window = new BrowserWindow({
    width: 300,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false,
      nodeIntegration: true,
      //devTools: false
      // contextIsolation: true,
      // preload: path.join(app.getAppPath(), './preload.js')
    }
  })
  window.loadURL(`file://${path.join(__dirname, 'build/index.html')}`)

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow(window, tray)
  }
}

ipcMain.handle('add-shortcut', (_event, args) => {
  store.set(args.appName, args.shortcut) 

  Object.keys(store.store).map(function(key, index) {
    globalShortcut.register(store.store[key], () => {
      if (process.platform === "darwin") {
        open("/Applications/" + key + ".app")
      }
      else if (process.platform === "win32") {
        open('C:\\Users\\' + username.sync() + '\\Application')
      }
    })
  })
})

ipcMain.handle('close-app', (_event, _args) => {
  app.exit()
})