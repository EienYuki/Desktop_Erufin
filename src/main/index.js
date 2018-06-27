import { shell, app, BrowserWindow, Menu, MenuItem } from 'electron'

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


var fs = require('fs-extra')
var storage = require('electron-json-storage')
function get_directory_list(dir){
    return new Promise(function(resolve, reject){
        var files = fs.readdirSync(dir)
        var directory_list = []
        files.forEach(function(file) {
            if(fs.statSync(dir + '/' + file).isDirectory()){
                directory_list.push(file)
            }
        })
        resolve(directory_list)
    })
}
function read_json_file(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, "utf8",  (err, data)  => {
            if (err) throw reject(err)
            resolve(JSON.parse(data))
        })
    })
}
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
        maximizable: false,
        resizable: false,
        webPreferences:{
            webSecurity:false
        }
    })
    app.my_run_config = {}

    window_kyara.menu = new Menu()
    window_kyara.webContents.on('context-menu', (e, params) =>{
        window_kyara.menu.popup(window_kyara, params.x, params.y)
    })

    // 目錄存在？
    var userData_path = app.getPath('userData')
    if(!fs.existsSync(userData_path)){
        fs.mkdir(userData_path)
    }

    // resources存在？
    userData_path = userData_path + '/resources'
    if(!fs.existsSync(userData_path)){
        shell.openItem(app.getPath('userData'))
    }else{
        var d_list, k_data = [], r_data = null
        var p_list = []
        var resources_path = app.getPath('userData') + '/resources'
        get_directory_list(resources_path).then((data) => {
            d_list = data
            if(fs.existsSync(userData_path + '/run.json')){
                p_list.push(read_json_file(resources_path + '/run.json').then((json) =>{
                    r_data = json
                    return true
                }))
            }
            
            for(var r of data){
                p_list.push(read_json_file(resources_path + '/' + r + '/config.json').then((json) =>{
                    k_data.push({
                        kyara: json.id,
                        data: json
                    })
                    return true
                }))
            }
            Promise.all(p_list).then(data => {
                app.my_config = {
                    kyara: k_data,
                    run_data: r_data
                }
                window_kyara.loadURL(window_kyara_URL)
            })
        })
    }

    window_kyara.on('closed', () => {
        window_kyara = null
    })
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
