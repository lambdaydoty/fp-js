/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const S_ = require ('sanctuary')
const $ = require ('sanctuary-def')
const F = require ('fluture')
const F$ = require ('fluture-sanctuary-types')
const Z = require ('sanctuary-type-classes')
const show = require ('sanctuary-show')
const type = require ('sanctuary-type-identifiers')
const daggy = require ('daggy')

const types = require ('./types')

const env0 = [
  ...S_.env,
  ...F$.env,
  types.$Unit,
  types.$List ($.Unknown),
]

const { uncurry } = require ('./curry')

/*
 * Some helper functions to extend Sanctuary
 */
const extend =
  s => {
    const maybeToFuture = a => s.maybe (F.reject (a)) (F.resolve)

    const eitherToFuture = s.either (F.reject) (F.resolve)

    const repeat =
      x =>
        n =>
          s.unfoldr (i => i < n ? s.Just (s.Pair (x) (i + 1)) : s.Nothing) (0)

    const B = s.compose

    const pick =
      s.pipe ([
        s.ap (s.zip) (B (repeat (s.I)) (s.size)), // ∷ Pair string (a → a)
        s.fromPairs,                              // ∷ strMap (a → a)
        s.ap,                                     // ∷ (strMap a) → (strMap a)
      ])

    return {
      maybeToFuture,   // ∷ a → Maybe b → Future a b
      eitherToFuture,  // ∷ Etiher a b → Future a b
      repeat,          // ∷ a → Integer → [a]
      pick,            // ∷ [String] → (StrMap a) → (StrMap a)
    }
  }

/*
 * Uncurry defining functions in $ for convenience
 */
const uncurrys =
  def =>
    S_.pipe ([
      S_.ap (S_.zip) (S_.map (fn => $[fn])), // ∷ [Pair String Function]
      S_.map (S_.map (uncurry)),             // ∷ [Pair String UncurriedFunction]
      S_.prepend (S_.Pair ('def') (uncurry (def))),
      S_.fromPairs,                          // ∷ StrMap UncurriedFunction
    ]) ([
      'NullaryType',
      'UnaryType',
      'BinaryType',
      'RecordType',
      'NamedRecordType',
    ])

module.exports =
  (env = [/* types */]) => {
    const S = S_.create ({ checkTypes: true, env: [ ...env, ...env0 ] })
    const def = $.create ({ checkTypes: true, env: [ ...env, ...env0 ] })

    const E = extend (S)
    E.unchecked = extend (S.unchecked)

    const D = uncurrys (def)

    return {
      daggy,
      ...{ Z, $, F, F$, S, E },
      ...{ D, def, show, type },
      ...require ('./curry'),
      ...require ('./types'),
    }
  }

/* example */

// ∷ Number → Number
// const inc = uncurry (def) (
//   'inc',
//   {},
//   [$.Number, $.Number],
//   x => x + 1,
// )

// $prototype = {
//   [require ('util').inspect.custom]: function () {
//     return show (this)
//   },
// }

/*
 * eslint func-call-spacing fixer for vim:
 *
 *   never → always:  :%s/\(\S\)(/\1\ (/g
 *
 *   always → never:  :%s/\(\S\)\ (/\1(/g
 *                     :%s/function\ \(\w\+\)(/function \1 (/g
 *                     :%s/=(/= (/g
 */
