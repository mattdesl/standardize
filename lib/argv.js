const minimist = require('minimist')

const opts = {
  boolean: [
    'silent',
    'snazzy'
  ],
  string: [
    'shareableConfig'
  ]
}

var argv = minimist(process.argv.slice(2), opts)

module.exports = argv
