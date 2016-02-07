"use strict"
const electron = require("electron")
const BrowserWindow = electron.BrowserWindow

const app = electron.app
let mainWindow = null

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    title: "Module 2.1",
    resizable: false,
  })
  mainWindow.setMenu(null)
  mainWindow.setContentSize(800, 600)
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.webContents.openDevTools({detach: true})
  mainWindow.on("closed", () => {
    mainWindow = null
    app.quit()
  })
})
