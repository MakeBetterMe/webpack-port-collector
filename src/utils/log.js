const chalk = require('chalk')

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500');
const info = chalk.bold.greenBright;
const alert = chalk.white.bold.bgBlueBright;

module.exports = {
  error: function (msg) {
    console.log(error(`❎ [WebpackPortCollector] ${msg}`))
  },
  warning: function (msg) {
    console.log(warning(`⚠️ [WebpackPortCollector] ${msg}`))
  },
  info: function (msg) {
    console.log(info(`💬 [WebpackPortCollector] ${msg}`))
  },
  alert: function (msg) {
    console.log(alert(`💬 [WebpackPortCollector] ${msg}`))
  },
}
