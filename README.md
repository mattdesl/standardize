# standardize

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Scaffolds [standard](https://github.com/feross/standard) style for a new module. 

- runs `npm install --save-dev standard`
- adds `standard` to your `"scripts"` test

PRs/suggestions welcome.

<img src="http://i.imgur.com/sdfTwLC.png" width="80%" />

## Install

```sh
npm install standardize -g
```

## Example

Just run `standardize` on your module directory

```sh
standardize
```

It will auto-install `standard` (if it isn't already installed), then add a new script field that looks like:

```js
  "scripts": {
    "test": "standard"
  }
```

If the existing script starts with `node` or `tape`, then `standard` will be prefixed like so:

```js
  "scripts": {
    "test": "standard && node test.js"
  }
```

You can specify `standard --snazzy` if you would rather install and use [snazzy](http://npmjs.com/package/snazzy) in your module, for better error reporting.

## Usage

[![NPM](https://nodei.co/npm/standardize.png)](https://www.npmjs.com/package/standardize)

### CLI

```sh
Usage:
  standardize [opts]
  
Options:
  --snazzy    use a pretty-printer for standard
  --silent    does not log anything to terminal
  
Example:
  standardize --snazzy --silent
```

### API

#### `standardize([opt], cb)`

Standardizes the module at `process.cwd()` and calls `cb(err)` when finished. Options:

- `cwd` the base directory to install from
- `package` the `package.json` path, defaults to `path.join(cwd, 'package.json')`
- `verbose` whether to print install and update information to `stderr` (default false)

Example:

```js
var standardize = require('standardize')
var path = require('path')

standardize({
  cwd: process.cwd(),
  package: path.join(process.cwd(), 'package.json')
}, function (err) {
  if (err) throw err
  console.log("updated!")
})
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/standardize/blob/master/LICENSE.md) for details.
