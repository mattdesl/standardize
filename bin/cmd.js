#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var chalk = require('chalk')

require('../')(argv, function (err) {
  if (err) {
    console.error(chalk.red('ERROR:'), err.message)
  } else {
    var tool = argv.snazzy ? 'snazzy' : 'standard'
    console.log(chalk.green('Added ' +
      chalk.bold(tool) +
      ' to your package.json'))
  }
})
