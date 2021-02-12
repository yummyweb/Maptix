import { app, BrowserWindow, globalShortcut, ipcMain, Tray } from 'electron'
import path from 'path'
import getWindowPosition from "./utils/getWindowPosition.js"
import open from 'open'
import username from 'username'

const assetsDir = path.join(__dirname, 'assets')

import electronReload from 'electron-reload'

electronReload(__dirname)

let tray = undefined
let window = undefined

// Don't show the app in the dock
app.dock.hide()

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
      nodeIntegration: true
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
    showWindow()
  }
}

const showWindow = () => {
  const position = getWindowPosition(window, tray)
  window.setPosition(position.x, position.y, false)
  window.show()
  window.focus()
}

ipcMain.handle('send-app-name', (event, args) => {
  console.log("hey")
  console.log(args)
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    if (process.platform === "darwin") {
      open("/Applications/" + args.appName + ".app")
    }
    else if (process.platform === "win32") {
      open('C:\\Users\\' + username.sync() + '\\Application')
    }
  })
})