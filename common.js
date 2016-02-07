const com_argv = process.argv
const com_argc = process.argv.length

const CheckParm = (parm) => com_argv.indexOf(parm)

module.exports = {
  CheckParm
}
