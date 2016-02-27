"use strict"

const electron = require("electron")
const ipcRenderer = electron.ipcRenderer
const draw = require("./draw")
const context = draw.context
const framebuffer = context.createImageData(640, 480)

const PIXEL_SIZE = 4

const init = () =>
{
  console.log("HOST.init")
}

const drawRect = (x, y, width, height, red, green, blue, data) =>
{
  if (x < 0)
  {
    x = 0
  }
  if (y < 0)
  {
    y = 0
  }
  if ((x + width) > framebuffer.width)
  {
    width = framebuffer.width - x
  }
  if ((y + height) > framebuffer.height)
  {
    height = framebuffer.height - y
  }
  let pixel = (y * framebuffer.width * PIXEL_SIZE) + (x * PIXEL_SIZE)
  for (let heightWalker = 0; heightWalker < height; heightWalker++)
  {
    for (let widthWalker = 0; widthWalker < width; widthWalker++)
    {
      data[pixel + 0] = red
      data[pixel + 1] = green
      data[pixel + 2] = blue
      data[pixel + 3] = 0xFF
      pixel = pixel + PIXEL_SIZE
    }
    pixel = pixel + (framebuffer.width * PIXEL_SIZE) - (width * PIXEL_SIZE)
  }
}

const frame = (timestep) =>
{
  // if (!filterTime(timestep))
  // {
  //   return
  // }
  // update game
  // render scene
  const data = framebuffer.data
  for (let i = 0; i < data.length; i = i + 4)
  {
    data[i + 0] = Math.random() * 0xFF
    data[i + 1] = Math.random() * 0xFF
    data[i + 2] = Math.random() * 0xFF
    data[i + 3] = 0xFF
  }

  drawRect(10, 10, 800, 200, 0xFF, 0x00, 0xFF, data)

  context.putImageData(framebuffer, 0, 0)
}

const shutdown = () =>
{
  console.log("HOST.shutdown")
  ipcRenderer.send("quit")
}

module.exports = {
  // frameTime,
  // filterTime,
  init,
  frame,
  shutdown,
}
