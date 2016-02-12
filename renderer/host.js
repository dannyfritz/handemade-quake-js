"use strict"

let realTime = 0
let oldRealTime = 0
let frameTime = 0
const targetFramerate = 1/60 * 1000

const filterTime = (time) =>
{
  realTime += time
  if (realTime - oldRealTime < targetFramerate)
  {
    return false
  }
  frameTime = realTime - oldRealTime
  oldRealTime = realTime
  return true
}

const init = () =>
{
  console.log("HOST.init")
}

const frame = (timestep) =>
{
  if (!filterTime(timestep))
  {
    return
  }
  // update game
  // render scene
}

const shutdown = () =>
{
  console.log("HOST.shutdown")
}

module.exports = {
  frameTime,
  filterTime,
  init,
  frame,
  shutdown,
}
