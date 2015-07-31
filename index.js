var install = require('install-if-needed')
var path = require('path')
var fs = require('fs')
var readJson = require('read-json')
var check = '\u2714'

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
  var verbose = opt.verbose
  if (verbose) {
    console.error(check, 'updating', file)
  }
  
  var tool = opt.snazzy ? 'snazzy' : 'standard'
  readJson(file, function (err, data) {
    if (err) return cb(new Error('could not read JSON at ' + file))
    rewritePackage(data, file, function (err) {
      if (err) return cb(new Error('could not write package at ' + file))
      console.error(check, 'installing', tool)
      install({
        devDependencies: [ tool ],
        package: data,
        stdio: 'inherit',
        save: true
      }, function (err) {
        if (err) return cb(new Error('error installing ' + tool))
        cb(null)
      })
    })
  })

  function rewritePackage (data, file, cb) {
    // only write to file if we changed data
    var changed = transform(data)
    if (changed) {
      var json = JSON.stringify(data, undefined, 2) + '\n'
      fs.writeFile(file, json, cb)
    } else {
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
    var changed = oldTest !== pkg.scripts.test
    if (verbose && changed) {
      console.error(check, 'updating script:', JSON.stringify(pkg.scripts.test))
    }
    return changed
  }
}
