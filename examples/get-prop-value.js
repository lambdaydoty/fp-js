/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", {  ignoreEOLComments: true }] */
const { S } = require ('../sanctuary') ()

/**
 *                                                              Type     allow    Extended
 *                                                                       missing
 *                                                                       propery
 * --------------------------------------------------------------------------------------------
 *
 * S.prop    ∷              String  →   a      →   b            Object
 * S.props   ∷             [String] →   a      →   b            Object             Depth
 *
 * S.get     ∷ Predicate →  String  →   a      → Maybe b        Object     *
 * S.gets    ∷ Predicate → [String] →   a      → Maybe b        Object     *       Depth
 *
 * S.value   ∷              String  → StrMap a → Maybe a        StrMap     *
 * S.values  ∷                        StrMap a →  [a]           StrMap     *       Breadth
 *
 * B (S.isJust) (S.value) ∷ String  → StrMap a → Boolean
 *
 *
 * S.prop                ∷ String@s → { @s: b } → b
 * S.get (S.is ($TypeB)) ∷ String@s → { @s: b } → Maybe b
 */

const R = require ('ramda')

const fooLens = R.lensProp ('foo')
const barLens = R.lensProp ('bar')

const foo = { bar: S.compose (fooLens) (barLens) }

const obj = {
  foo: {
    bar: 123,
  },
  secret: 'hello',
}

console.log (`
  const obj = ${S.show (obj)}
`)

console.log (`
  R.view (foo.bar) (obj) === ${R.view (foo.bar) (obj)}
  R.view (foo.bar) ({ foo: {} }) === ${R.view (foo.bar) ({ foo: {} })}
  R.view (foo.bar) ({}) === ${R.view (foo.bar) ({})}
`)

console.log (`
  R.set (foo.bar) (111) ({}) === ${S.show (R.set (foo.bar) (111) ({}))}
  R.over (foo.bar) (x => x + 1) ({}) === ${S.show (R.over (foo.bar) (x => x + 1) ({}))}
  R.set (foo.bar) (456) (obj) === ${S.show (R.set (foo.bar) (456) (obj))}
  R.over (foo.bar) (x => x + 1) (obj) === ${S.show (R.over (foo.bar) (x => x + 1) (obj))}
`)
