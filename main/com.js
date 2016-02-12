"use strict"

const com_argv = process.argv

const CheckParm = (parm) => com_argv.indexOf(parm)

module.exports = {
  CheckParm,
}
