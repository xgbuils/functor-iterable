const arrayOf = require('immutable-array.of')
const push = require('immutable-array.push')
const reduce = require('immutable-array.reduce')

function FunctorIterable (iterable) {
    this.iterable = iterable
    this.fs = arrayOf([])
}

function map (f) {
    const obj = Object.create(this.constructor.prototype)
    obj.fs = push(f, this.fs)
    obj.iterable = this.iterable
    return obj
}

const apply = (a, f) => f(a)

Object.defineProperties(FunctorIterable.prototype, {
    map: {
        value: map
    },
    [Symbol.iterator]: {
        * value () {
            const fs = this.fs
            const iterable = this.iterable
            for (const val of iterable) {
                yield reduce(apply, val, fs)
            }
        }
    }
})

module.exports = FunctorIterable
