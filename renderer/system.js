"use strict"
const COM = require("./common")

let timePassed = 0
let timeStart = 0

const initFloatTime = () =>
{
  timeStart = COM.queryPerformanceCounter()
  return 0
}

const floatTime = () =>
{
  const timeNow = COM.queryPerformanceCounter()
  timePassed = timeNow - timeStart
  return timePassed
}

module.exports = {
  timeStart,
  initFloatTime,
  floatTime,
}
