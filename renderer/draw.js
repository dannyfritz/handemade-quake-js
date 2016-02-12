"use strict"
const config = require("../config.json")

const canvas = document.createElement("canvas")
canvas.height = config.resolution.height
canvas.width = config.resolution.width
document.body.appendChild(canvas)

const context = canvas.getContext("2d")

module.exports = {
  canvas,
  context,
}
