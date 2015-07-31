var test = require('tape')
var path = require('path')
var proxyquire = require('proxyquire')
var assign = require('object-assign')
var fs = require('fs')
var defaultJson = require('./some-module/default.json')
var expectedJson = require('./some-module/expected.json')
var readJson = require('read-json')

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

test('should apply to module not in cwd', function (t) {
  t.plan(1)

  fsStub.writeFile = fs.writeFile.bind(fs)
  var pkgJson = path.resolve(__dirname, 'some-module', 'package.json')
  // reset json to default
  fs.writeFile(pkgJson, JSON.stringify(defaultJson), function (err) {
    if (err) t.fail(err)
    // run installation etc
    standardize({
      cwd: path.resolve(__dirname, 'some-module')
    }, function (err) {
      if (err) return t.fail(err)
      readJson(pkgJson, function (err, data) {
        if (err) return t.fail(err)
        t.deepEqual(data, expectedJson, 'matches result')
      })
    })
  })

})

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
