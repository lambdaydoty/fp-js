/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { daggy, show, S, $, uncurry, def } = require ('../sanctuary') ()

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
const absurd = uncurry (def) (
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
const f44 = uncurry (def) (
  'f44',
  {},
  [$.Null, $.Integer],
  _ => 44,
)

console.log ('')
console.log (`f44 (null) === ${f44 (null)}`)

// ∷ Number → Unit
const fInt = uncurry (def) (
  'fInt',
  {},
  [$.Integer, $.Undefined],
  _ => {},
)

console.log ('')
console.log (`fIn4 (3) === ${fInt (3)}`)

// ps. In sanctuary.js we could emulate Void type by $.Null or $.Undefined
//     If needed, we could also explicitly define a new Void type:

const Unit = daggy.tagged ('Unit', [])
const $Unit = uncurry ($.NullaryType) (
  'Unit',
  'http://',
  [],
  x => x instanceof Unit,
)

Unit.prototype['@@show'] = () => '()'

console.log ('')
console.log (`show ($Unit) === ${show ($Unit)}`)

// The unit function
// ∷ a → Unit
const unit = uncurry (def) (
  'unit',
  {},
  [$.TypeVariable ('a'), $Unit],
  _ => new Unit (),
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
const not = uncurry (def) (
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
