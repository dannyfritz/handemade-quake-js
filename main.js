"use strict"

HOST.init()

let oldTime = SYS.initFloatTime()

const main = () => {
  requestAnimationFrame(main)
  const newTime = SYS.floatTime()
  HOST.frame(newTime - oldTime)
  oldTime = newTime
}

main()
