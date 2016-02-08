"use strict"

;((root) => {
  let timePassed = 0

  const ms2s = (ms) => ms / 1000

  const queryPerformanceCounter = () => performance.now()

  const initFloatTime = () => {
    SYS.timeStart = COM.queryPerformanceCounter()
    return 0
  }

  const floatTime = () => {
    const timeNow = COM.queryPerformanceCounter()
    timePassed = timeNow - SYS.timeStart
    return timePassed
  }

  root.SYS = {
    timeStart: 0,
    initFloatTime,
    floatTime,
  }

  root.COM = {
    queryPerformanceCounter,
    ms2s,
  }
})(window)
