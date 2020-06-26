/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */

const { S } = require ('./sanctuary') ()

// [Binary]
//
//   From:
//
//     op ∷ a → b → c
//     f ∷ c → d
//
//   get:
//
//     S.map (f) (op) ∷ a → b → d
//
//
;(function Compose () {
  const pretty = s => `Number (${s})`
  const { negated, plus } = require ('./bn3')

  console.log ('')
  console.log ('Compose unary')
  console.log (`
  S.map (pretty) (negated) (1.23) === ${
  S.map (pretty) (negated) (1.23)
  }`)

  console.log ('')
  console.log ('Compose binary')
  console.log (`
  S.map (S.map (pretty)) (plus) (1.23) (3.21) === ${
  S.map (S.map (pretty)) (plus) (1.23) (3.21)
  }`)

  console.log ('')
  console.log ('Compose ternary')
  console.log (`
  S.map (S.map (S.map (S.fromPairs))) (S.zipWith) (S.Pair) (['foo', 'bar']) ([1, 2]) === ${S.show (
    S.map (S.map (S.map (S.fromPairs))) (S.zipWith) (S.Pair) (['foo', 'bar']) ([1, 2])
  )}`)
}) ()
