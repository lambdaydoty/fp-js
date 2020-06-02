/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", {  ignoreEOLComments: true }] */
const { S, $ } = require ('../sanctuary') ()

//    MyType ∷ Type
const MyType = $.RecordType ({
  id: $.NonEmpty ($.String),
})

//    validate ∷ a → Maybe MyType
const validate =
  x =>
    S.filter (S.is (MyType)) (S.Just (x))

console.log (S.show (validate (null)))
console.log (S.show (validate ({ })))
console.log (S.show (validate ({ id: null })))
console.log (S.show (validate ({ id: '' })))
console.log (S.show (validate ({ id: '123' }))) // valid!
