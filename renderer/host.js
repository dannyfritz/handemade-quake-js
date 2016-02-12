"use strict"

const electron = require("electron")
const ipcRenderer = electron.ipcRenderer
const draw = require("./draw")
const context = draw.context
const framebuffer = context.createImageData(640, 480)

// let realTime = 0
// let oldRealTime = 0
// let frameTime = 0
// const targetFramerate = 1/60 * 1000
//
// const filterTime = (time) =>
// {
//   realTime += time
//   if (realTime - oldRealTime < targetFramerate)
//   {
//     return false
//   }
//   frameTime = realTime - oldRealTime
//   oldRealTime = realTime
//   return true
// }

const init = () =>
{
  console.log("HOST.init")
}

const frame = (timestep) =>
{
  // if (!filterTime(timestep))
  // {
  //   return
  // }
  // update game
  // render scene
  const data = framebuffer.data
  for (let i = 0; i < data.length; i = i + 4)
  {
    data[i + 0] = Math.random() * 0xFF
    data[i + 1] = Math.random() * 0xFF
    data[i + 2] = Math.random() * 0xFF
    data[i + 3] = 0xFF
  }
  context.putImageData(framebuffer, 0, 0)
}

const shutdown = () =>
{
  console.log("HOST.shutdown")
  ipcRenderer.send("quit")
}

module.exports = {
  // frameTime,
  // filterTime,
  init,
  frame,
  shutdown,
}
