// S.I, S.K, S.ap
const I = x => x
const K = x => y => x
const S = f => g => x => f(x)(g(x))

const A = f => x => f(x) // Apply
const T = x => f => f(x) // Thrush
const B = x => f => g => f(g(x)) // Compose

// :: g -> x -> x
const tap = S(K)

const uncurry =
  fn =>
    ar =>
      ar.reduce((f, x) => f(x), fn) // A!

const curryN =
  n =>
    fn =>
      (n === 0) ? fn()
        : /* otherwise */ x => curryN(n - 1)(fn.bind(null, x))

const curry =
  fn => curryN(fn.length)(fn)

const trampoline =
  fn =>
    (...args) => {
      let res = null
      for (
        res = fn(...args);
        typeof res === 'function';
        res = res()
      );
      return res
    }

const thunk = K

const Counter = function * (start = 0, end = Number.MAX_SAFE_INTEGER) {
  for (
    let i = start;
    i < end;
    ++i
  ) yield i
  return null
}

const isNil = x => x == null

// Array.prototype.chain = // eslint-disable-line
//   function (fn) {
//     return this.reduce(
//       (acc, x) => acc.concat(fn(x)),
//       [],
//     )
//   }
const chain =
  fn =>
    ar =>
      ar.reduce(
        (acc, x) => acc.concat(fn(x)),
        [],
      )

// :: Number -> (Unit -> a) -> [a]
const repeat =
  n =>
    f =>
      [...(function * () {
        while (n--) { yield f() }
      })()]

// :: (a -> String) -> (a -> b) -> a -> b
const memoize =
  (key = x => x) =>
    f => {
      const table = {}
      return (...args) => {
        const k = key(...args)
        if (table[k] === undefined) {
          table[k] = f(...args)
        }
        return table[k]
      }
    }

const apply = f => ar => f(...ar)

module.exports = {
  I,
  K,
  S,
  A,
  T,
  B,
  tap,
  curry,
  uncurry,
  chain,
  trampoline,
  thunk,
  Counter,
  isNil,
  repeat,
  memoize,
  apply,
}
