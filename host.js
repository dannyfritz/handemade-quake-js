"use strict"

;((root) => {
  const init = () => {}

  const frame = (timestep) => {
    console.log(timestep)
  }

  const shutdown = () => {}

  root.HOST = {
    init,
    frame,
    shutdown
  }
})(window)
