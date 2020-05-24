/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { daggy, show, S, $, uncurry, D, $Unit, Unit } = require ('../sanctuary') ()

/* 2.3 What Are Types */

// The bottom type

const f =
  () => {
    throw new Error ()
  }

try {
  f ()
} catch (e) {
  console.log ('')
  console.log ('f (): catched!')
}

/* 2.6 Examples of Types */

// ∷ Void → Any
const absurd = D.def (
  'absurd',
  {},
  [$.Void, $.TypeVariable ('a')],
  _ => _,
)

try {
  absurd (null)
} catch (e) {
  console.log ('')
  console.log ('absord (null): catched!')
  // console.log (e)
}

// ∷ Unit → Number
const f44 = D.def (
  'f44',
  {},
  [$.Null, $.Integer],
  _ => 44,
)

console.log ('')
console.log (`f44 (null) === ${f44 (null)}`)

// ∷ Number → Unit
const fInt = D.def (
  'fInt',
  {},
  [$.Integer, $.Undefined],
  _ => {},
)

console.log ('')
console.log (`fIn4 (3) === ${fInt (3)}`)

// ps. In sanctuary.js we could emulate Void type by $.Null or $.Undefined
//     If needed, we could also explicitly define a new Void type:

console.log ('')
console.log (`show ($Unit) === ${show ($Unit)}`)

// The unit function
// ∷ a → Unit
const unit = D.def (
  'unit',
  {},
  [$.TypeVariable ('a'), $Unit],
  _ => Unit (),
)

console.log ('')
console.log (`unit (12345) === ${show (unit (12345))}`)
console.log (`unit ('foo') === ${show (unit ('foo'))}`)

// Bool type

// The type constructors
const Bool = daggy.taggedSum ('Bool', {
  True: [],
  False: [],
})

const { True, False } = Bool

Bool.prototype['@@show'] = function () {
  return this.cata ({
    True: _ => 'true',
    False: _ => 'false',
  })
}

// The type representative
const $Bool = uncurry ($.NullaryType) (
  'Bool',
  'http://',
  [],
  x => Bool.is (x),
)

console.log ('')
console.log (`S.is ($Bool) (True) === ${S.is ($Bool) (True)}`)
console.log (`S.is ($Bool) (False) === ${S.is ($Bool) (False)}`)

// ∷ Bool → Bool
const not = D.def (
  'not',
  {},
  [$Bool, $Bool],
  x => x.cata ({
    True: _ => False,
    False: _ => True,
  }),
)

console.log ('')
console.log (`not (True) === ${show (not (True))}`)
console.log (`not (False) === ${show (not (False))}`)
