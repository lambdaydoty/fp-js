/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", {  ignoreEOLComments: true }] */
const { S } = require ('../sanctuary') ()

// const S_ =
//   f =>
//     g =>
//       x =>
//         f (x) (g (x)) // S-combinator
// const B =
//   f =>
//     g =>
//       x =>
//         f (g (x)) // B-combinator
// const lift2 =
//   f =>
//     a =>
//       b =>
//         S_ (B (f) (a)) (b)

/**
 * parallelised/indepedent computation
 *
 * Cartesian builder
 *
 * data validation
 *
 *
 * https://softwaremill.com/applicative-functor/
 */

console.log ('')
console.log (
  S.lift3 (
    x =>
      y =>
        z => [x, y, z]
  ) (S.toUpper) (S.toLower) (S.splitOn ('')) ('Hello')
)

console.log ('')
console.log (
  S.lift2 (S.Pair) (S.toUpper) (S.toLower) ('Hello')
)
