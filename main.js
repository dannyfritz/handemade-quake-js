"use strict";
const COM = require("./common")

const test = COM.CheckParm("-test")
console.log(test)
console.log(parseInt(process.argv[test+1]))

require("./electronquake")
