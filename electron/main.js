// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const darwinTemplate = require('./darwin')

const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const DEVELOPMENT = process.env.NODE_ENV === 'development'
console.log(`Run App as env: ${process.env.NODE_ENV}`)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 580,
    height: 800,
    frame: false,
    show: false,
  })

  const menu = Menu.buildFromTemplate(darwinTemplate())
  Menu.setApplicationMenu(menu)

  // and load the index.html of the app.
  mainWindow.loadFile(resolve('/index.html'))
  // mainWindow.loadURL('http://ollejah.ru:3000/')
  // mainWindow.loadURL(`file://${__dirname}/electron/index.html`)

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  // Open the DevTools.
  // DEVELOPMENT && mainWindow.webContents.openDevTools()
  // Launch fullscreen with DevTools open, usage: npm run debug
  // or if debug
  if (DEVELOPMENT) {
    mainWindow.webContents.openDevTools()
    mainWindow.maximize()
    // require('devtron').install()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.