var test = require('tape')
var path = require('path')
var proxyquire = require('proxyquire')
var assign = require('object-assign')

var fsStub = {
}

var standardize = proxyquire('../', {
  fs: fsStub
})

test('applies standard to existing test', run('tape-test.json', 'standard && tape test.js'))
test('applies standard to existing test', run('node-test.json', 'standard && node test.js'))
test('applies standard style to a module', run('no-test.json', 'standard'))
test('applies standard style to a module', run('empty-scripts.json', 'standard'))
test('applies standard style to a module', run('default-test.json', 'standard'))
test('applies standard style to a module', run('default-test.json', 'snazzy', { snazzy: true }))

function run (file, expectedScript, opt) {
  return function (t) {
    file = path.resolve(__dirname, file)
    t.plan(1)
    fsStub.writeFile = function (file, data, cb) {
      t.equal(JSON.parse(data).scripts.test, expectedScript)
      process.nextTick(cb)
    }
    standardize(assign({
      package: file
    }, opt), function (err) {
      if (err) t.fail(err)
    })
  }
}
