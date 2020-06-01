/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */

const F = require ('fluture')

/*
 * Some helper functions to extend Sanctuary
 */
module.exports =
  s => {
    const B = s.compose

    const maybeToFuture = a => s.maybe (F.reject (a)) (F.resolve)

    const eitherToFuture = s.either (F.reject) (F.resolve)

    const fromNullable = s.compose (s.eitherToMaybe) (s.tagBy (x => x != null))

    const repeat =
      x =>
        n =>
          s.unfoldr (i => i < n ? s.Just (s.Pair (x) (i + 1)) : s.Nothing) (0)

    const pick =
      s.pipe ([
        s.ap (s.zip) (B (repeat (s.I)) (s.size)), // ∷ Pair string (a → a)
        s.fromPairs,                              // ∷ strMap (a → a)
        s.ap,                                     // ∷ (strMap a) → (strMap a)
      ])

    // ∷ String → String → Object → Object
    const renameKey =
      oldKey =>
        newKey =>
          ({ [oldKey]: value, ...o }) => ({ ...o, [newKey]: value })

    // ∷ StrMap String → Object → Object
    // ∷ { a: b } ⇒ { a: * } ⇒ { b: * }
    const renameKeys = s.pipe ([
      s.pairs,                    // ∷ [Pair String String]
      s.map (s.pair (renameKey)), // ∷ [Object → Object]
      s.pipe,                     // ∷ Object → Object
    ])

    return {
      maybeToFuture,   // ∷ a → Maybe b → Future a b
      eitherToFuture,  // ∷ Etiher a b → Future a b
      fromNullable,    // ∷ Nullable a → Maybe a
      repeat,          // ∷ a → Integer → [a]
      pick,            // ∷ [String] → (StrMap a) → (StrMap a)
      renameKey,       // ∷ String → String → Object → Object
      renameKeys,      // ∷ StrMap String → Object → Object
    }
  }

/**
 * Egs:
 *
 * const opts = renameKeys ({
 *   HOST: host,
 *   KEY: private_key,
 * }) (process.env)
 *
 * let i = 2
 * const opts = renameKey ({
 *   [i++]: 'param1',
 *   [i++]: 'param2',
 *   [i++]: 'param3',
 *   [i++]: 'param1', // overwrite!
 * }) (process.argv)
 */
