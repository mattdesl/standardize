const optsFromArgv = require('./opts-from-argv')
const lib = require('.')
const { pipe } = require('ramda')

const cli = pipe(optsFromArgv, lib)

module.exports = cli
