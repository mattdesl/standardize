#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {
  default: { 'verbose': true },
  boolean: [ 'verbose', 'snazzy' ]
})
var color = require('term-color')

require('../')(argv, function (err) {
  if (err) {
    console.error(color.red('ERROR:'), err.message)
  }
})
