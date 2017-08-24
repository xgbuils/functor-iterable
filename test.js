const test = require('tape')
const tapSpec = require('tap-spec')

const FunctorIterable = require('./')

const array = Object.freeze([1, 2, 3, 4, 5])
const string = 'abcd'
const set = new Set(string)
const double = e => e + e
const half = e => e / 2

test('constructor', function (t) {
    t.test('empty array', function (st) {
        const iterable = new FunctorIterable([])
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty array', function (st) {
        const iterable = new FunctorIterable(array)
        st.deepEqual([...iterable], array,
            'must return an iterable with the same values')
        st.end()
    })

    t.test('empty string', function (st) {
        const iterable = new FunctorIterable('')
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty typed array', function (st) {
        const iterable = new FunctorIterable(new Int8Array(array))
        st.deepEqual([...iterable], array,
            'must return an iterable with the same values')
        st.end()
    })

    t.test('empty set', function (st) {
        const iterable = new FunctorIterable(new Set())
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty set', function (st) {
        const iterable = new FunctorIterable(new Set(array))
        st.deepEqual([...iterable], array,
            'must return an iterable with the same values')
        st.end()
    })
    t.end()
})

test('map', function (t) {
    t.test('empty array', function (st) {
        const iterable = new FunctorIterable([]).map(double)
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty string', function (st) {
        const iterable = new FunctorIterable(set).map(double)
        const expected = [...string].map(double)
        st.deepEqual([...iterable], expected,
            'must return a new iterable with transformed values')
        st.end()
    })
    t.test('chaining', function (st) {
        const iterable = new FunctorIterable(array)
            .map(double)
            .map(half)
        st.deepEqual([...iterable], array,
            'must be possible chain map method')
        st.end()
    })

    t.test('chaining composition rule', function (st) {
        const first = new FunctorIterable(array)
            .map(double)
            .map(double)
        const second = new FunctorIterable(array)
            .map(e => double(double(e)))
        st.deepEqual([...first], [...second],
            'composition rule for map must work')
        st.end()
    })

    t.test('using intermediate iterables', function (st) {
        const intermediate = new FunctorIterable(array)
            .map(double)
        const first = intermediate.map(double)
        const second = intermediate.map(half)
        const firstExpected = array.map(double).map(double)
        const secondExpected = array.map(double).map(half)
        st.deepEqual([...first], firstExpected,
            'first result must be correct')
        st.deepEqual([...second], secondExpected,
            'second result must be correct')
        st.end()
    })
    t.end()
})

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout)
