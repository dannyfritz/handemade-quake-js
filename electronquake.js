"use strict"
const electron = require("electron")
const config = require("./package.json")
const ipcMain = electron.ipcMain
const BrowserWindow = electron.BrowserWindow

const app = electron.app
let mainWindow = null

const shutdown = () => {
  mainWindow = null
  app.quit()
}

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    title: `Handmade Quake - Module ${config.module}`,
    resizable: false,
  })
  mainWindow.setMenu(null)
  mainWindow.setContentSize(800, 600)
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools({detach: true})
  mainWindow.on("closed", shutdown)
  ipcMain.on("quit", shutdown)
})

module.exports = app
