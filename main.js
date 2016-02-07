"use strict"

const electron = require("electron")
const ipcRenderer = electron.ipcRenderer

HOST.init()

let oldTime = SYS.initFloatTime()
const targetTime = 1/60
let timeAccumulated = 0

const main = () =>
{
  requestAnimationFrame(main)
  const newTime = SYS.floatTime()
  timeAccumulated += newTime - oldTime
  oldTime = newTime
  if (timeAccumulated > targetTime)
  {
    HOST.frame(targetTime)
    timeAccumulated -= targetTime
  }
}

main()
