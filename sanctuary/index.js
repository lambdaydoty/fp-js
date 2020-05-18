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

const env0 = [
  ...S_.env,
  ...F$.env,
]

const { uncurry } = require ('./curry')

/*
 * Some helper functions to extend Sanctuary
 */
const extend =
  s => ({
    // ∷ a → Maybe b → Future a b
    maybeToFuture: a => s.maybe (F.reject (a)) (F.resolve),

    // ∷ Etiher a b → Future a b
    eitherToFuture: s.either (F.reject) (F.resolve),
  })

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
