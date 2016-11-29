# standardize

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Sets up [standard](https://github.com/feross/standard) style.

## Usage

```console
$ npm -g install standardize
$ cd non/standard/project
$ standardize
```

In `package.json`, the following is prepended to the `test` npm script: `npm run lint &&`.

Then, the project is linted with Standard, and:

### If passed:

- installs and saved as dev-dependency: `standard`
- in `package.json`:
  - adds an npm script: `"lint": "standard"`
  - prepends to `test` npm script: `npm run lint`
- undoes what it did when Standard did not pass (below)

### If did not pass:

- installs and saves as a dev-dependency:
  - `eslint`
  - `eslint-config-standard` and its peer-dependencies
- sets up an `.eslintrc.json` that:
  - extends `eslint-config-standard`
  - excludes all of the rules that didn’t pass
- in `package.json` adds an npm script `"lint": "eslint **/*.js"`

### Suggested workflow after that

1. Remove a single rule exclusion from `.eslintrc.json`.
1. Run `npm run lint`.
1. Fix the errors.
1. Repeat.
1. When all of the exclusions are removed and fixed run `standardize` again.

## For pretty output

You can specify `standardize --snazzy` if you would rather install and use [snazzy](http://npmjs.com/package/snazzy) in your module, for better error reporting.

## semistandard

You can use `standardize --semi` to install `semistandard` instead of `standard`.

## Usage stats

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
