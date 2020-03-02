// https://codewithstyle.info/advanced-functional-programming-typescript-monads-generators/
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

// function * ones () {
//   yield 1
//   yield * ones()
// }

function * nat () {
  yield 1
  yield * add(ones())(nat())
}

function * fib () {
  yield 0
  yield 1
  yield * add(fib())(tail(fib()))
}

console.log(
  [...init(500)(nat())],
  // [...init(10)(fib())],
)
