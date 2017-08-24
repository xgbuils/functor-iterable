const InmutableArray = require('array-inmutable')

function FunctorIterable (iterable) {
    this.iterable = iterable
    this.fs = InmutableArray([])
}

function map (f) {
    const obj = Object.create(this.constructor.prototype)
    obj.fs = this.fs.push(f)
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
                yield fs.reduce(apply, val)
            }
        }
    }
})

module.exports = FunctorIterable
