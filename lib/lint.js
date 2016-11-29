const Linter = require('standard-engine').linter
const eslint = require('eslint')
const { clone } = require('ramda')
const pify = require('pify')

const defaultLinterOpts = {
  eslint,
  eslintConfig: {}
}

const lint = (shareableConfig) => {
  const linterOpts = clone(defaultLinterOpts)
  linterOpts.eslintConfig.extends = shareableConfig
  const linter = new Linter(linterOpts)
  const lintFiles = pify(linter.lintFiles.bind(linter))
  const result = lintFiles([], {})
  return result
}

module.exports = lint
