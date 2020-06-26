/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const S0 = require ('sanctuary')
const $ = require ('sanctuary-def')
const F = require ('fluture')
const F$ = require ('fluture-sanctuary-types')
const FN = require ('fluture-node')
const Z = require ('sanctuary-type-classes')
const show = require ('sanctuary-show')
const type = require ('sanctuary-type-identifiers')
const daggy = require ('daggy')

const types = require ('./types')

const env0 = [
  ...S0.env,
  ...F$.env,
  types.$Unit,
  types.$List ($.Unknown),
]

const extend = require ('./extend')
const { uncurry } = require ('./curry')

/*
 * Uncurry defining functions in $ for convenience
 */
const uncurrys = def =>
  S0.pipe ([
    S0.ap (S0.zip) (S0.map (fn => $[fn])), // ∷ [Pair String Function]
    S0.map (S0.map (uncurry)),             // ∷ [Pair String UncurriedFunction]
    S0.prepend (S0.Pair ('def') (uncurry (def))),
    S0.fromPairs,                          // ∷ StrMap UncurriedFunction
  ]) ([
    'NullaryType',
    'UnaryType',
    'BinaryType',
    'EnumType',
    'RecordType',
    'NamedRecordType',
  ])

module.exports = function (env = [/* types */]) {
  const S = S0.create ({ checkTypes: true, env: [ ...env, ...env0 ] })
  const def = $.create ({ checkTypes: true, env: [ ...env, ...env0 ] })
  const D = uncurrys (def)
  const E = extend (S)
  E.unchecked = extend (S.unchecked)

  return {
    daggy,
    ...{ Z, $, F, F$, FN, S, E },
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
