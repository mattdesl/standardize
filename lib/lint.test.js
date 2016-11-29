const { test } = require('ava')
const isPromise = require('is-promise')
const mock = require('mock-require')
const { spy } = require('simple-spy')
const { isEqual } = require('lodash') // because https://github.com/avajs/ava/issues/1121
const directInstanceOf = require('direct-instance-of')

const eslintStub = Symbol('eslintStub')
mock('eslint', eslintStub)

const lintFilesStubCbArg = Symbol('lintFilesStubCbArg')
const lintFilesStub = (files, opts, cb) => cb(null, lintFilesStubCbArg)
const StandardEngineLinterCtorSpy = spy(() => {})
const StandardEngineLinterStub = function (...args) {
  StandardEngineLinterCtorSpy(...args)
}
StandardEngineLinterStub.prototype.lintFiles = spy(lintFilesStub)
mock('standard-engine', { linter: StandardEngineLinterStub })

test.beforeEach(() => {
  StandardEngineLinterCtorSpy.reset()
  StandardEngineLinterStub.prototype.lintFiles.reset()
})

const subject = require('./lint')

test('is a function', t => {
  t.is(typeof subject, 'function')
})

test('of arity 1', t => {
  t.is(subject.length, 1)
})

test('returns a promise', t => {
  t.true(isPromise(subject()))
})

test('returned promise resolves to Standard Engine’s `.lintFiles` second callback arg', t => {
  return subject()
    .then(result => {
      t.is(result, lintFilesStubCbArg)
    })
})

test('Standard Engine Linter calls args deep equality', t => {
  t.plan(1)
  const shareableConfig = Symbol('shareableConfig')
  return subject(shareableConfig)
    .then(() => {
      const actual = StandardEngineLinterCtorSpy.args
      const expected = [[
        {
          eslint: eslintStub,
          eslintConfig: {
            extends: shareableConfig
          }
        }
      ]]

      t.true(isEqual(actual, expected))
    })
})

test('`lintFiles` method is bound', t => {
  const StandardEngineLinterStub = function () {}
  StandardEngineLinterStub.prototype.lintFiles = function (files, opts, cb) {
    t.true(directInstanceOf(this, StandardEngineLinterStub))
    cb()
  }
  mock('standard-engine', { linter: StandardEngineLinterStub })
  const subject = mock.reRequire('./lint')
  return subject()
})
