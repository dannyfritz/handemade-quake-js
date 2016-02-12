"use strict"

const electron = require("electron")
const pkg = require("../package.json")
const config = require("../config.json")
const ipcMain = electron.ipcMain
const BrowserWindow = electron.BrowserWindow
const nativeImage = electron.nativeImage

const appIcon = nativeImage.createFromPath("./icon.png")
const app = electron.app
let mainWindow = null

const shutdown = () =>
{
  mainWindow = null
  app.quit()
}

app.on("ready", () =>
{
  mainWindow = new BrowserWindow({
    title: `Handmade Quake - Module ${pkg.module}`,
    icon: appIcon,
    resizable: false,
    fullscreen: config.fullscreen,
    fullscreenable: false,
    maximizable: false,
  })
  mainWindow.setMenu(null)
  mainWindow.setContentSize(config.resolution.width, config.resolution.height)
  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)
  if (config.dev)
  {
    mainWindow.webContents.openDevTools({detach: true})
  }
  mainWindow.on("closed", shutdown)
  ipcMain.on("quit", shutdown)
})

module.exports = app
