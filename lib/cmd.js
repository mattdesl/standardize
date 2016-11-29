#!/usr/bin/env node

const cli = require('./cli')
const color = require('term-color')
const argv = require('../lib/argv')

const onErr = function (err) {
  if (err) {
    console.error(`${color.red('ERROR:')} ${err.message}`)
  }
}

const result = cli(argv)
  .catch(onErr)

module.exports = result // for testing
