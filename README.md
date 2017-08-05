# functor-iterable

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

`functor-iterable` exports a class that builds iterables that provide map method.

## Install

``` bash
$ npm install functor-iterable --save
```

## Usage
``` JavaScript
const FunctorIterable = require('functor-iterable')

const iterable = new FunctorIterable([4, 2, 7, 8]) // (4 2 7 8)
    .map(e => 3 * e) // (12 6 21 24)
    .map(e => e / 2) // (6 3 10.5 12)



// converting to array:
[...iterable] // [6, 3, 10.5, 12]

// traversing values:
for (const val of iterable) {
    // ...
}

// creating an iterator that traverses the values
let iterator = iterable[Symbol.iterator]()
iterator.next() // {value: 6, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // {value: 10.5, done: false}
iterator.next() // {value: 12, done: false}
iterator.next() // {value: undefined, done: true}

// Infinite iterable
const naturals = {
    [Symbol.iterator]: function* () {
        let i = 1
        while(true) { yield i++ }
    }
} // (1 2 3 4...)

const collatzTransform = e => e % 2 === 1 ? 3 * e + 1 : e / 2

new FunctorIterable(naturals) // (1  2  3  4  5...)
    .map(collatzTransform) // (4  1 10  2 16...)
    .map(collatzTransform) // (2  4  5  1  8...)
    .map(collatzTransform) // (1  2 16  4  4...)
    .map(collatzTransform) // (4  1  8  2  2...)
    .map(collatzTransform) // (2  4  4  1  1...)
```

## Support
- Node.js >=6
- ES2015 transpilers

## License
MIT

  [1]: https://travis-ci.org/xgbuils/functor-iterable.svg?branch=master
  [2]: https://travis-ci.org/xgbuils/functor-iterable
  [3]: https://badge.fury.io/js/functor-iterable.svg
  [4]: https://badge.fury.io/js/functor-iterable
  [5]: https://coveralls.io/repos/github/xgbuils/functor-iterable/badge.svg?branch=master
  [6]: https://coveralls.io/github/xgbuils/functor-iterable?branch=master
  [7]: https://david-dm.org/xgbuils/functor-iterable.svg
  [8]: https://david-dm.org/xgbuils/functor-iterable
  