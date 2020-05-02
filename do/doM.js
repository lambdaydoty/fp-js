/* eslint func-call-spacing: ["error", "always"] */
const { S } = require ('../sanctuary') ()

// chain :: Chain m => (a -> m b) -> m a -> m b

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

doM.G =
  g =>
    m => {
      const recur =
        val =>
          state => {
            const log = () => {} // debug

            const doing = g (m)

            log ('*replay-start*')
            state.forEach (it => log ({ it }) || doing.next (it)) // replay
            log ('*replay-end*')

            const result = doing.next (val)

            return log ({ result }) || result.done
              ? result.value
              : S.unchecked.chain (v => recur (v) ([...state, val])) (result.value)
          }
      return recur (null) ([])
    }

module.exports = doM
