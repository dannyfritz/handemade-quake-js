"use strict"

const ms2s = (ms) => ms / 1000

const queryPerformanceCounter = () => performance.now()

module.exports = {
  queryPerformanceCounter,
  ms2s,
}
