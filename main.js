"use strict";
const electron = require("electron");

const argv = process.argv
const argc = process.argv.length

const COM_CheckParm = (parm) => argv.indexOf(parm)

const test = COM_CheckParm("-test")
console.log(test)
console.log(parseInt(argv[test+1]))

const app = electron.app;
app.quit();
