# linkstash
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Save [`hal-json`]() `_link` properties and retrieve the latest link in a set.
E.g. after multiple calls for new data in a set you keep pointers to the
oldest and newest data in your set.

## Installation
```bash
npm install linkstash
```

## Usage
```js
var linkstash = require('linkstash');

var links = linkstash(function(val) {
  return parseInt(val.split('=')[1]);
});

links.set({
  _previous: 'foo.com?until=10',
  _next: 'foo.com?from=100'
});

links.get();
// => {
//  previous: 'foo.com?until=10',
//  next: 'foo.com?from=100'
// }

links.set({
  _previous: 'foo.com?until=100',
  _next: 'foo.com?from=val=190'
});

links.get()
// => {
//  previous: 'foo.com?until=10',
//  next: 'foo.com?from=190'
// }
```

## API
#### var links = linkstash()
Create a new `linkstash` instance. Takes `normalize` function which normalizes
strings to be compared. The function
```js
var linkstash = require('linkstash');

var links = linkstash(function(val) {
  return parseInt(val.splice(10));
});
```

#### links.set()
Pass in a new object with a `previous` and `next` property (either can have an
optional `_` prepended). When setting the values will be parsed through the
earlier set `normalize` function and compared. For `previous` values, the lowest
value remains. For `next` values, the highest value remains.
```js
links({
  previous: 'mysite.com/?until=1234567',
  next: 'mysite.com/?from=7654321'
})

links({
  _previous: 'mysite.com/?until=1234568',
  _next: 'mysite.com/?from=8654321'
})
```

#### links.get()
Get the stored links. Values are returned __without__ prepending `_`.
```js
links.get();
// => {
//   previous: 'mysite.com/?until=1234567',
//   next: 'mysite.com/?from=7654321'
// }
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/linkstash.svg?style=flat-square
[npm-url]: https://npmjs.org/package/linkstash
[travis-image]: https://img.shields.io/travis/yoshuawuyts/linkstash.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/linkstash
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/linkstash.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/linkstash?branch=master
[downloads-image]: http://img.shields.io/npm/dm/linkstash.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/linkstash
