"use strict"

const electron = require("electron")
const fs = require("fs")
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

const readFile = (filename, encoding) =>
  fs.readFileSync(filename, encoding)

const readPalette = (filename) =>
{
  const paletteData = readFile(filename)
  const palette = {}
  palette.data = paletteData.toJSON().data
  return palette
}

const readLmp = (filename) =>
{
  const lmpData = readFile(filename)
  const lmp = {}
  lmp.width = lmpData.readUInt16LE(0)
  lmp.height = lmpData.readUInt16LE(4)
  lmp.data = lmpData.slice(8).toJSON().data
  return lmp
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
  ipcMain.on("file:read:lmp", (event, arg) => event.returnValue = readLmp(arg))
  ipcMain.on("file:read:palette", (event, arg) => event.returnValue = readPalette(arg))
})

module.exports = app
