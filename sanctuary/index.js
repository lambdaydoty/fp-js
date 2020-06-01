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

const extend = require ('./extend')
const { uncurry } = require ('./curry')

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
      'EnumType',
      'RecordType',
      'NamedRecordType',
    ])

module.exports =
  (env = [/* types */]) => {
    const S = S_.create ({ checkTypes: true, env: [ ...env, ...env0 ] })
    const def = $.create ({ checkTypes: true, env: [ ...env, ...env0 ] })
    const D = uncurrys (def)
    const E = extend (S)
    E.unchecked = extend (S.unchecked)

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
