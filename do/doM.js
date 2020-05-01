/* eslint func-call-spacing: ["error", "always"] */
const { S } = require ('../sanctuary') ()

// chain :: Chain m => (a -> m b) -> m a -> m b

const doM =
  g =>
    x => {
      const log = () => {} // debug
      const gen = g (x)
      const next = x => gen.next (x) // :: a -> m b
      let result = null
      // log (x)
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

module.exports = doM
