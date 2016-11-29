const { test } = require('ava')
const mock = require('mock-require')
const decache = require('decache')
const isPromise = require('is-promise')
const { spy } = require('simple-spy')
const color = require('term-color')
const shabang = require('sha-bang/dist')
const readFileRelativeSync = require('read-file-relative').readSync

const cliPath = './cli'

const cliStubReturn = Promise.resolve(Symbol('cliStubReturn'))
const cliStub = (argv) => cliStubReturn
const cliSpy = spy(cliStub)
mock(cliPath, cliSpy)

const argvStub = Symbol('argvStub')
mock('./argv', argvStub)

const subjectPath = './cmd'
const getSubject = () => require(subjectPath)

test.beforeEach(() => {
  decache(subjectPath)
  cliSpy.reset()
})

test('starts with a node shebang', t => {
  const file = readFileRelativeSync(subjectPath + '.js')
  t.true(file.startsWith(shabang('node')))
})

test('exports a promise', t => {
  t.true(isPromise(getSubject()))
})

test('calls `cli` once', t => {
  getSubject()
  t.is(cliSpy.args.length, 1)
})

test('calls `cli` with a single argument', t => {
  getSubject()
  t.is(cliSpy.args[0].length, 1)
})

test('single arg in `cli` call is what `argv` exports', t => {
  getSubject()
  t.is(cliSpy.args[0][0], argvStub)
})

test('promise value is `cli`’s promise value', t => {
  return Promise.all([getSubject(), cliStubReturn])
    .then(([subjectVal, cliStubReturnVal]) => {
      t.is(subjectVal, cliStubReturnVal)
    })
})

test('`console.error`s caught error', t => {
  t.plan(1)

  const errorMsg = 'FOO'
  const cliErrorStub = () => new Promise(() => {
    throw new Error(errorMsg)
  })
  mock.stop(cliPath)
  mock(cliPath, cliErrorStub)

  const consoleError = console.error
  const consoleErrorSpy = spy(() => {})
  console.error = consoleErrorSpy

  const expected = `${color.red('ERROR:')} ${errorMsg}`

  return getSubject()
    .then(() => {
      console.error = consoleError
      t.deepEqual(consoleErrorSpy.args, [[expected]])
    })
})
