/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { S } = require ('./sanctuary') ()

const test = { // ∷ StrMap [Number]
  a: [1, 2, 3],
  b: [4, 5],
}

const app = S.pipe ([
  S.pairs,                             // ∷ [Pair String [Number]]
  S.map (S.mapLeft (S.of (Array))),    // ∷ [Pair [String] [Number]]
  S.chain (S.pair (S.lift2 (S.Pair))), // ∷ [Pair String Number]
])

console.log (
  app (test)
)

/* =>
 *
 * [ Pair ("a") (1),
 *   Pair ("a") (2),
 *   Pair ("a") (3),
 *   Pair ("b") (4),
 *   Pair ("b") (5) ]
 */
