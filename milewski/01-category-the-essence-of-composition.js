/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { S, $, uncurry, def } = require ('../sanctuary') ()

/* 1.2 Properties of Composition */

const a = $.TypeVariable ('a')

// ∷ a → a
const identity = uncurry (def) (
  'identity',
  {},
  [a, a],
  x => x,
)

// ∷ FiniteNumber → FiniteNumber
const square = uncurry (def) (
  'square',
  {},
  [$.FiniteNumber, $.FiniteNumber],
  x => x * x,
)

console.log ('')
console.log (
  identity (42),
  identity ('string'),
  identity ({ foo: 'bar' }),
  identity ([42, 42]),
)

console.log ('')
console.log (
  S.compose (identity) (square) (7),
  S.compose (square) (identity) (7),
)

const B =
  f =>
    g =>
      x => f (g (x))

console.log ('')
console.log (
  B (identity) (square) (7),
  B (square) (identity) (7),
)
