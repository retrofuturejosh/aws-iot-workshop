const chalk = require('chalk');

function logGreenDim(string) {
  console.log(chalk.green.dim(string));
}

function logGreen(string) {
  console.log(chalk.green(string));
}

function logRed(string) {
  console.log(chalk.red(string));
}

function logRedDim(string) {
  console.log(chalk.red.dim(string));
}

module.exports = {
  logGreenDim,
  logRed,
  logGreen,
  logRedDim
};
