"use strict"

const HOST = require("./host")
const SYS = require("./system")

HOST.init()

let oldTime = SYS.initFloatTime()

const main = () =>
{
  requestAnimationFrame(main)
  const newTime = SYS.floatTime()
  HOST.frame(newTime - oldTime)
  oldTime = newTime
}

document.addEventListener("keyup", HOST.shutdown)

main()
