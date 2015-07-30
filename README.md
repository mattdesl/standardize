# standardize

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Scaffolds [standard](https://github.com/feross/standard) style for a new module. 

- runs `npm install --save-dev standard`
- adds `standard` to your `"scripts"` test

PRs/suggestions welcome.

## Install

```sh
npm install standardize -g
```

## Example

Just run `standardize` on your module directory

```sh
standardize
```

It will add a new script field that looks like:

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

You can specify `standard --snazzy` if you would rather install and use [snazzy](http://npmjs.com/package/snazzy) in your module, for pretty-printing errors.

## Usage

[![NPM](https://nodei.co/npm/standardize.png)](https://www.npmjs.com/package/standardize)

```sh
Usage:
  standardize [opts]
  
Options:
  --snazzy    use a pretty-printer for standard
```

## License

MIT, see [LICENSE.md](http://github.com/Jam3/standardize/blob/master/LICENSE.md) for details.
