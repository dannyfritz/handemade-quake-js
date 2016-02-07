"use strict"

const electron = require("electron")
const ipcRenderer = electron.ipcRenderer

//////////////////////////
// COM
//////////////////////////
const queryPerformanceCounter = () => performance.now()
const ms2s = (ms) => ms / 1000

const COM = {
  queryPerformanceCounter,
  ms2s
}

//////////////////////////
// SYS
//////////////////////////
const initFloatTime = () => {
  SYS.timeStart = COM.queryPerformanceCounter()
}
const floatTime = () => {
  const timeNow = COM.queryPerformanceCounter()
  const interval = timeNow - SYS.timeStart
  SYS.timeStart = timeNow
  const timeDelta = COM.ms2s(interval)
  SYS.timePassed += timeDelta
  return SYS.timePassed
}

const SYS = {
  timePassed: 0,
  timeStart: 0,
  initFloatTime,
  floatTime
}

//////////////////////////
// Main
//////////////////////////
SYS.initFloatTime()

const main = () => {
  requestAnimationFrame(main)
  const newTime = SYS.floatTime()
  console.log(newTime)
  //update()
  //render()
}

main()
