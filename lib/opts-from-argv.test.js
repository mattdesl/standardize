const { test } = require('ava')
const isPlainObject = require('is-plain-object')
const hasProperties = require('has-properties')
const objKeyCount = require('obj-key-count')

const subject = require('./opts-from-argv')

test('exports a function', t => {
  t.is(typeof subject, 'function')
})

test('of arity one', t => {
  t.is(subject.length, 1)
})

test('returns an object', t => {
  t.true(isPlainObject(subject({})))
})

test('returned object’s property count', t => {
  t.true(objKeyCount(subject({}), 3))
})

test('returned object’s property names', t => {
  const expectedProps = [
    'verbose',
    'snazzy',
    'shareableConfig'
  ]
  t.true(hasProperties(subject({}), expectedProps))
})

test('`shareableConfig` prop is provided `shareable-config` prop', t => {
  const shareableConfig = Symbol('shareable-config')
  t.is(
    subject({'shareable-config': shareableConfig}).shareableConfig,
    shareableConfig
  )
})

test('`verbose` prop is opposite of provided `silent` prop', t => {
  t.is(subject({silent: false}).verbose, true)
  t.is(subject({silent: undefined}).verbose, true)
  t.is(subject({silent: null}).verbose, true)
  t.is(subject({silent: ''}).verbose, true)
  t.is(subject({silent: 0}).verbose, true)

  t.is(subject({silent: true}).verbose, false)
  t.is(subject({silent: 1}).verbose, false)
  t.is(subject({silent: 'foo'}).verbose, false)
})

test('`snazzy` prop is provided `snazzy` prop', t => {
  const snazzy = Symbol('snazzy')
  t.is(
    subject({snazzy}).snazzy,
    snazzy
  )
})
