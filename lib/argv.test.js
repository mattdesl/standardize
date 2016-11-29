const { test } = require('ava')
const mock = require('mock-require')
const { spy } = require('simple-spy')
const decache = require('decache')
const { isEqual } = require('lodash')

const minimistReturn = Symbol('minimistReturn')
const minimistStub = () => minimistReturn
const minimistSpy = spy(minimistStub)
mock('minimist', minimistSpy)

test.beforeEach(() => {
  decache(subjectPath)
  minimistSpy.reset()
})

const subjectPath = './argv'
const getSubject = () => require(subjectPath)

test('exports what `minimist` returns', t => {
  const subject = getSubject()
  t.is(subject, minimistReturn)
})

test('`minimist` called once with two args', t => {
  getSubject()
  t.is(minimistSpy.args.length, 1, 'one call')
  t.is(minimistSpy.args[0].length, 2, 'two args')
})

test('`minimist` first call arg is `process.argv.slice(2)`', t => {
  const origArgv = process.argv
  process.argv = [undefined, undefined, Symbol()]
  getSubject()
  t.true(isEqual(minimistSpy.args[0][0], process.argv.slice(2)))
  process.argv = origArgv
})

test('`minimist` second call arg deep equality assertion', t => {
  const expectedSecondArg = {
    boolean: [
      'silent',
      'snazzy'
    ],
    string: [
      'shareableConfig'
    ]
  }

  getSubject()
  t.true(isEqual(minimistSpy.args[0][1], expectedSecondArg))
})
