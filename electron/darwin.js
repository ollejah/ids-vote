const electron = require('electron')
const path = require('path')

let aboutWindow = null

module.exports = function() {
  return [
    {
      label: 'Поддержать МШД!',
      submenu: [
        {
          label: 'About IDS',
          click: () => {
            if (aboutWindow) {
              return
            }

            aboutWindow = new electron.BrowserWindow({
              width: 320,
              height: 320,
              resizable: false,
              fullscreen: false,
              minimizable: false,
              maximizable: false,
            })

            aboutWindow.loadURL(
              path.join('file://', __dirname, '../electron/about.html')
            )

            aboutWindow.on('closed', function() {
              aboutWindow = null
            })
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Hide IDS',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        {
          label: 'Show All',
          selector: 'unhideAllApplications:',
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => electron.app.quit(),
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Repository',
          click: () =>
            electron.shell.openExternal(
              'https://designschool.ru'
            ),
        },
      ],
    },
  ]
}