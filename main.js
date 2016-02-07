"use strict";
const electron = require("electron");

const argv = process.argv
const argc = process.argv.length

const COM_CheckParm = (parm) => argv.indexOf(parm)

console.log(COM_CheckParm("-test"))

const app = electron.app;
app.quit();
