var install = require('install-if-needed')
var path = require('path')
var fs = require('fs')
var readJson = require('read-json')

module.exports = standardize

function standardize (opt, cb) {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }

  var file = opt.package
  if (!file) {
    var cwd = opt.cwd || process.cwd()
    file = path.resolve(cwd, 'package.json')
  }
  standardizePackage(file, opt, cb)
}

function standardizePackage (file, opt, cb) {
  opt = opt || {}

  var tool = opt.snazzy ? 'snazzy' : 'standard'
  readJson(file, function (err, data) {
    if (err) return cb(err)
    rewritePackage(data, file, function (err) {
      if (err) return cb(err)
      install({
        devDependencies: [ tool ],
        package: data,
        stdio: 'inherit',
        save: true
      }, cb)
    })
  })

  function rewritePackage (data, file, cb) {
    var changed = transform(data)
    if (changed) {
      var json = JSON.stringify(data, undefined, 2)
      fs.writeFile(file, json, cb)
    } else {
      // don't touch the file if no change is needed
      process.nextTick(cb)
    }
  }

  function transform (pkg) {
    var oldTest = pkg.scripts && pkg.scripts.test

    if (!pkg.scripts) {
      pkg.scripts = {
        test: tool
      }
    } else if (pkg.scripts.test) {
      // handle default npm init
      if (pkg.scripts.test === 'echo "Error: no test specified" && exit 1') {
        pkg.scripts.test = tool
      } else if (/^(node|tape)/.test(pkg.scripts.test)) {
        pkg.scripts.test = tool + ' && ' + pkg.scripts.test
      }
    } else {
      pkg.scripts.test = tool
    }
    return oldTest !== pkg.scripts.test
  }
}
