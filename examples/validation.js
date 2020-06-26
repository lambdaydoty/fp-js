/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", {  ignoreEOLComments: true }] */
const { S: _S, $, D } = require ('../sanctuary') ()
const S = _S

;(function () {
  const value1 = S.Just (10)
  const value2 = S.Just (-1)
  const filter = S.filter (S.gte (0))

  console.log ('')
  console.log ('> Filter A Maybe w. default ∷ Maybe a → a')
  console.log (S.fromMaybe (0) (filter (value1)))
  console.log (S.fromMaybe (0) (filter (value2)))
}) ()

;(function () {
  // ∷ String → String → Type → Type
  const StrictRecordType = name => url => supertype =>
    D.NullaryType (
      name,
      url,
      [supertype],
      S.pipe ([Object.keys, S.sort, S.equals (S.sort (supertype.keys))]),
    )

  const $MyType = $.RecordType ({ foo: $.NonEmpty ($.String) })
  const $StrictMyType = StrictRecordType ('StrictMyType') ('https://') ($MyType)

  const isTypes = [S.is ($MyType), S.is ($StrictMyType)]

  console.log ('')
  console.log ('> StrictRecordType')
  console.log (
    S.ap (isTypes) ([
      { foo: 'hello' },
      { foo: 'hello', bar: 123 }, // Not a $MyType !
    ])
  )
}) ()

;(function () {
  /**
   * To parse a hex represntation string:
   *
   *   Maybe String → Maybe Integer
   *
   */

  console.log ('')
  console.log ('> A parser for Maybe String ∷ Maybe String → Maybe Integer')
  console.log (S.chain (S.parseInt (16)) (S.Just ('0x2A')))
  console.log (S.chain (S.parseInt (16)) (S.Just ('XXX')))
  console.log (S.chain (S.parseInt (16)) (S.Nothing))
}) ()

;(function () {
  /**
   * To validate a more complex custom structure, say:
   *
   *   ({ id: '123' })              // => Just ({ id: '123' })
   *   ({ id: '123', foo: 'bar' })  // => Just ({ id: '123', ... })
   *   ({ id: '' })                 // => Nothing
   *   ({ id: null})                // => Nothing
   *   ({})                         // => Nothing
   *   null                         // => Nothing
   */

  //    MyType ∷ Type
  const $MyType = $.RecordType ({
    id: $.NonEmpty ($.String),
  })

  //    validate ∷ a → Maybe MyType
  const validate = x =>
    S.filter (S.is ($MyType)) (S.Just (x))

  console.log ('')
  console.log ('> A Simple Validator ∷ a → Maybe MyType')
  console.log (validate (null))
  console.log (validate ({ }))
  console.log (validate ({ id: null }))
  console.log (validate ({ id: '' }))
  console.log (validate ({ id: '123' })) // valid!
  console.log (validate ({ id: '123', secret: 42 })) // valid!
}) ()
