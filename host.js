"use strict"

;((root) => {
  let realTime = 0
  let oldRealTime = 0
  let targetFramerate = 1/72

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

  const init = () => {}

  const frame = (timestep) => {
    console.log(timestep)
    if (!HOST.filterTime(timestep))
    {
      return
    }
    // update game
    // render scene
  }

  const shutdown = () => {}

  root.HOST = {
    frameTime: 0,
    filterTime,
    init,
    frame,
    shutdown
  }
})(window)
