"use strict"

const ipcRenderer = require('electron').ipcRenderer

document.addEventListener('keydown', () => {
  ipcRenderer.send('quit')
})
