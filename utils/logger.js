/* logger foos */
const chalk = require("chalk");

function info(...text) {
  console.log(chalk.blue(...text));
}

function warn(...text) {
  console.log(chalk.yellow(...text));
}

function error(...text) {
  console.log(chalk.red(...text));
}

function gray(...text) {
  console.log(chalk.gray(...text));
}

module.exports = {
  info,
  warn,
  error,
  gray
}
