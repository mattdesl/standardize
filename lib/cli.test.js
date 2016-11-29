const { test } = require('ava')
const { spy } = require('simple-spy')
const mock = require('mock-require')
const { isEqual } = require('lodash')

const libStubReturn = Symbol('libStubReturn')
const libStub = (opts) => libStubReturn
const libSpy = spy(libStub)
mock('.', libSpy)

const optsFromArgvStubReturn = Symbol('optsFromArgvStubReturn')
const optsFromArgvStub = (argv) => optsFromArgvStubReturn
const optsFromArgvSpy = spy(optsFromArgvStub)
mock('./opts-from-argv', optsFromArgvSpy)

test.beforeEach(() => {
  libSpy.reset()
  optsFromArgvSpy.reset()
})

const subject = require('./cli')

test('exports a function', t => {
  t.is(typeof subject, 'function')
})

test('of arity one', t => {
  t.is(subject.length, 1)
})

test('returns what `lib` returns', t => {
  t.is(subject({}), libStubReturn)
})

test('calls `lib` once passing what `optsFromArgv` returns', t => {
  subject({})
  t.true(isEqual(
    libSpy.args,
    [[optsFromArgvStubReturn]]
  ))
})
