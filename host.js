"use strict"

;((root) => {
  let realTime = 0
  let oldRealTime = 0
  const targetFramerate = 1/60 * 1000

  const filterTime = (time) => {
    realTime += time
    if (realTime - oldRealTime < targetFramerate)
    {
      return false
    }
    HOST.frameTime = realTime - oldRealTime
    oldRealTime = realTime
    return true
  }

  const init = () => {
    console.log("HOST.init")
  }

  const frame = (timestep) => {
    if (!HOST.filterTime(timestep))
    {
      return
    }
    // update game
    // render scene
  }

  const shutdown = () => {
    console.log("HOST.shutdown")
  }

  root.HOST = {
    frameTime: 0,
    filterTime,
    init,
    frame,
    shutdown,
  }
})(window)
