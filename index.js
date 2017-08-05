const isTypedArray = require('is-typed-array')

function arrayReduce (f, acc, arr) {
    const length = arr.length
    for (let i = 0; i < length; ++i) {
        acc = f(acc, arr[i])
    }
    return acc
}

const apply = (a, f) => f(a)

function descriptorsFactory (iterable, fs) {
    return {
        iterable: {
            value: iterable
        },
        fs: {
            value: fs
        }
    }
}

class FunctorIterable {
    constructor (iterable) {
        Object.defineProperties(this,
            descriptorsFactory(iterable, []))
    }

    map (fn) {
        return Object.create(FunctorIterable.prototype,
            descriptorsFactory(this.iterable, this.fs.concat([fn])))
    }

    * [Symbol.iterator] () {
        const iterable = this.iterable
        const isOptimizable = Array.isArray(iterable)
            || typeof iterable === 'string'
            || isTypedArray(iterable)
        if (isOptimizable) {
            const length = iterable.length
            for (let i = 0; i < length; ++i) {
                yield arrayReduce(apply, iterable[i], this.fs)
            }
        } else {
            for (const val of iterable) {
                yield arrayReduce(apply, val, this.fs)
            }
        }
    }
}

module.exports = FunctorIterable
