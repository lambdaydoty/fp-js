// https://codewithstyle.info/advanced-functional-programming-typescript-monads-generators/
// https://exploringjs.com/es6/ch_generators.html

const co = require('co')

// TODO: stack limit

const tail =
  function * (xs) {
    xs.next()
    while (true) {
      yield xs.next().value
    }
  }

const combinator =
  op =>
    xs =>
      function * (ys) {
        while (true) {
          yield op(
            xs.next().value,
            ys.next().value,
          )
        }
      }

const add = combinator((x, y) => x + y)

const init =
  n =>
    function * (g) {
      while (n-- > 0) {
        yield g.next().value
      }
    }

const repeat =
  x =>
    function * _loop () {
      yield x
      yield * _loop()
    }

const ones = repeat(1)

function * nat () {
  yield 1
  yield * add(ones())(nat())
}

function * fib () {
  yield 0
  yield 1
  yield * add(fib())(tail(fib()))
}

function * observer () {
  const person = {
    name: yield,
    email: yield,
    phone: yield,
  }
  return person
}

console.log(
  [...init(10)(nat())],
  [...init(10)(fib())],
  (() => {
    const o = observer()
    o.next()
    o.next('Alice')
    o.next('alice@earth')
    return o.next('1231234567').value
  })(),
)

co(function * () {
  /* Yieldable:
   *   promises
   *   array (parallel)
   *   object (parallel)
   *   generators (delegation)
   *   generator functions (delegation)
   */
  const a = yield Promise.resolve('Hello')
  const b = yield Promise.resolve(a + ' world')
  const c = yield Promise.resolve(b + '!')
  const parallel = yield [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ]
  return ({ c, parallel })
})
  .then(console.log)
  .catch(console.error)
