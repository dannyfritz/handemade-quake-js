"use strict"
const electron = require("electron")
const config = require('./package.json')
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow


const app = electron.app
let mainWindow = null

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    title: `Module ${config.version}`,
    resizable: false,
  })
  mainWindow.setMenu(null)
  mainWindow.setContentSize(800, 600)
  mainWindow.loadURL("file://" + __dirname + "/index.html")
  mainWindow.webContents.openDevTools({detach: true})
  mainWindow.on("closed", () => {
    mainWindow = null
    app.quit()
  })
  ipcMain.on("quit", (event, arg) => {
    mainWindow = null
    app.quit()
  })
})

module.exports = app
