/* eslint func-call-spacing: ["error", "always"] */
const { S } = require ('../sanctuary') ()

// chain :: Chain m => (a -> m b) -> m a -> m b

// Monad for Maybe, Either, ...
const doM =
  g =>
    m => {
      const log = () => {} // debug

      const gen = g (m)
      const next = m => gen.next (m) // :: a -> m b
      let result = null

      try {
        for (
          result = next ();
          !result.done;
          result = log ({ result }) || S.unchecked.chain (next) (result.value)
        ) ;
      } catch (e) {
        log (e.message)
        return result
      }
      return result.value
    }

// List
doM.G =
  g =>
    m => {
      const recur =
        val =>
          state => {
            const log = () => {} // debug

            const _do = g (m)

            for (const it of state) {
              _do.next (it) // replay, discard the result
            }

            const result = _do.next (val)

            return log ({ result }) || result.done
              ? result.value
              : S.unchecked.chain (v => recur (v) ([...state, val])) (result.value)
          }
      return recur (null) ([])
    }

// Continuation
// ref:
//   https://dev.to/avaq/composable-callbacks-1l7i
//   https://itnext.io/promises-continuation-monad-in-javascript-f2d70ceb24a4
doM.K =
  g =>
    m => {
      const log = () => {} // debug

      // :: M a -> (a -> M b) -> M b
      // :: ((a -> m) -> m) -> (a -> (b -> m) -> m) -> (b -> m) -> m
      const bind =
        k => // :: ((a -> m) -> m)
          fn => // :: (a -> (b -> m) -> m)
            cb => // :: (b -> m)
              k (a => log ({ a, fn, cb }) || fn (a) (cb))

      // :: a -> M a
      // :: a -> (a -> m) -> m
      // = T combinator
      const ret =
        a =>
          k =>
            k (a)

      const gen = g (m)
      const next = m => gen.next (m) // :: a -> { value: (m b), done }

      const Next =
        val => {
          const result = next (val)
          return result.done
            ? _ => result.value
            : ret (result.value) // for recur to call
        }

      const recur =
        k =>
          bind (k) (Next) (recur)

      return recur (ret (null))
    }

module.exports = doM
