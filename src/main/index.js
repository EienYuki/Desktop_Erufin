import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let window_kyara

const window_kyara_URL = process.env.NODE_ENV === 'development'
? `http://localhost:9080`
: `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  window_kyara = new BrowserWindow({
    title: '',
    titleBarStyle: 'customButtonsOnHover',
    alwaysOnTop: false,
    transparent: true,
    frame: false,
    hasShadow: false,
    resizable: false,
    webPreferences:{
        webSecurity:false
    }
  })

  window_kyara.loadURL(window_kyara_URL)

  window_kyara.on('closed', () => {
    window_kyara = null
  })
}

var userData_path = app.getPath('userData')
var fs = require('fs-extra');
if(!fs.existsSync(userData_path)){
    fs.mkdir(userData_path)
}
userData_path = userData_path + '/resources'
if(!fs.existsSync(userData_path)){
    
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (window_kyara === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
