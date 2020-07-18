/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { S, $ } = require ('../sanctuary') ()

const Union =
  name => // ∷ String
    url => // ∷ String
      types => // ∷ [Type]
        $.NullaryType (name) (url) ([]) (x => S.any (S.flip (S.is) (x)) (types))

const $StringInteger = Union ('StringInteger') ('https://') ([$.String, $.Integer])

const input = ['a', 'b', 'c', 1, 2, 3]

console.log (
  S.unchecked.filter (S.is ($.FiniteNumber)) (input)
)

const { S: S2 } = require ('../sanctuary') ([$StringInteger])

console.log (
  S2.filter (S.is ($.FiniteNumber)) (input)
)

console.log (
  S2.filter (S.is ($.FiniteNumber)) (['a', 'b', 'c', {}])
)
