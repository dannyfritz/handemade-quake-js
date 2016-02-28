"use strict"
const canvas = document.createElement("canvas")
canvas.width = 320
canvas.height = 240
document.body.appendChild(canvas)

const context = canvas.getContext("2d")

module.exports = {
  canvas,
  context,
}
