"use strict"

const electron = require("electron")
const ipcRenderer = electron.ipcRenderer
const draw = require("./draw")
const context = draw.context
const framebuffer = context.createImageData(640, 480)

const PIXEL_SIZE = 4
const PALETTE_SIZE = 3
const palette = ipcRenderer.sendSync("file:read:palette", "./assets/palette.lmp")
const finale = ipcRenderer.sendSync("file:read:lmp", "./assets/finale.lmp")
const pause = ipcRenderer.sendSync("file:read:lmp", "./assets/pause.lmp")

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

const drawPic = (x, y, width, height, lump, dest) =>
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
  let location = (y * framebuffer.width * PIXEL_SIZE) + (x * PIXEL_SIZE)
  let pixel = 0
  for (let heightWalker = 0; heightWalker < height; heightWalker++)
  {
    for (let widthWalker = 0; widthWalker < width; widthWalker++)
    {
      const index = lump.data[pixel]
      const red = palette.data[index * PALETTE_SIZE]
      const green = palette.data[index * PALETTE_SIZE + 1]
      const blue = palette.data[index * PALETTE_SIZE + 2]
      const alpha = 0xFF
      dest[location + 0] = red
      dest[location + 1] = green
      dest[location + 2] = blue
      dest[location + 3] = alpha
      pixel = pixel + 1
      location = location + PIXEL_SIZE
    }
    location = location + (framebuffer.width * PIXEL_SIZE) - (width * PIXEL_SIZE)
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

  //drawRect(10, 10, 800, 200, 0xFF, 0x00, 0xFF, data)
  drawPic(10, 10, finale.width, finale.height, finale, data)
  drawPic(10, 100, pause.width, pause.height, pause, data)

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
