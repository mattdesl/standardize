#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {
  boolean: [ 'silent', 'snazzy', 'semi' ]
})
var color = require('term-color')

require('../')({
  verbose: !argv.silent,
  snazzy: argv.snazzy
}, function (err) {
  if (err) {
    console.error(color.red('ERROR:'), err.message)
  }
})
