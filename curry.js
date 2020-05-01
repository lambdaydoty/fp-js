/* eslint func-call-spacing: ["error", "always"] */
const I = x => x
const K = x => y => x
const S = f => g => x => f (x) (g (x))
const A = f => x => f (x) // apply
const T = x => f => f (x) // thrush
const B = f => g => x => f (g (x)) // compose
const Y = f => (g => g (g)) (g => f (x => g (g) (x))) // applicative Y combinator

const tap = S (K) // :: g -> a -> a

const uncurry =
  fn =>
    (...args) =>
      args.reduce (
        (f, x) => f (x),
        fn,
      )

const curryN =
  n =>
    fn =>
      (n === 0)
        ? fn ()
        : x => curryN (n - 1) (fn.bind (null, x))

const curry =
  fn =>
    curryN (fn.length) (fn)

const apply =
  f =>
    ar =>
      f (...ar)

const trampoline =
  fn =>
    (...args) => {
      let res = null
      for (
        res = fn (...args);
        typeof res === 'function';
        res = res () /* ! */
      );
      return res
    }

const Counter =
  function * (
    start = 0,
    end = Number.MAX_SAFE_INTEGER
  ) {
    for (
      let i = start;
      i < end;
      ++i
    ) yield i
    return null
  }

const isNil =
  x =>
    x == null

const chain =
  fn =>
    ar =>
      ar.reduce (
        (acc, x) => acc.concat (fn (x)),
        [],
      )

// :: Number -> (Unit -> a) -> [a]
const repeat =
  n =>
    f =>
      [
        ...(function * () {
          while (n--) { yield f () }
        }) (),
      ]

// :: (a -> String) -> (a -> b) -> a -> b
const memoize =
  (key = x => x) =>
    f => {
      const table = {}
      return (...args) => {
        const k = key (...args)
        if (table[k] === undefined) {
          table[k] = f (...args)
        }
        return table[k]
      }
    }

module.exports = {
  I,
  K,
  // S,
  A,
  T,
  B,
  Y,
  tap,
  tee: tap,
  curry,
  uncurry,
  chain,
  trampoline,
  thunk: K,
  Counter,
  isNil,
  repeat,
  memoize,
  apply,
}