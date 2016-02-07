"use strict"

const ipcRenderer = require('electron').ipcRenderer

document.addEventListener('keydown', () => {
  ipcRenderer.send('quit')
})

let tick = performance.now()

const main = (tock) => {
  requestAnimationFrame(main)
  const secondsGoneBy = (tock - tick) / 1000
  console.log(secondsGoneBy)
  //update()
  //render()
  tick = performance.now()
}

main()
