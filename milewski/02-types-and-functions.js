const R = require('ramda')
const { type, daggy, show, S, $, uncurry, def, K } = require('../sanc')

const x = 3

console.log(
  S.is($.Integer)(x)
)

// Void type

const absurd = uncurry(def)(
  'absurd',
  {},
  [$.Void, $.Any],
  _ => _,
)

console.log(
  R.tryCatch(absurd, K('catched'))(1)
)

// C++ function of input type `void`

const f44 = uncurry(def)(
  'f44',
  {},
  [$.Null, $.Integer],
  _ => 44,
)

console.log(f44(null))

// C++ function of output type `void`

const fInt = uncurry(def)(
  'fInt',
  {},
  [$.Integer, $.Undefined],
  _ => {},
)

console.log(fInt(3))

// ps. In sanctuary.js we could emulate Void type by $.Null or $.Undefined
//     If needed, we could also explicitly define a new Void type:

const $Unit = uncurry($.NullaryType)(
  'Unit',
  'http://',
  [$.Null],
  _ => true,
)

console.log(show($Unit))

// unit function
const unit = uncurry(def)(
  'unit',
  {},
  [$.Any, $.Undefined],
  _ => {},
)

console.log(unit(1))

// Bool type

const typeBool = 'jws/Bool'

/* daggy demo */

// Bool :: Type Representative
const Bool = daggy.taggedSum(
  typeBool, // :: typeName
  {
    True: [], // :: Constructor
    False: [], // :: Constructor
  },
)

const { True, False } = Bool

console.log('Bool.is(True)?', `${Bool.is(True)}`)
console.log('Bool.is(False)?', `${Bool.is(False)}`)
console.log('Bool.True.is(True)?', `${Bool.True.is(True)}`)
console.log('Bool.True.is(False)?', `${Bool.True.is(False)}`)
console.log('Bool.False.is(True)?', `${Bool.False.is(True)}`)
console.log('Bool.False.is(False)?', `${Bool.False.is(False)}`)

True['@@type'] = typeBool
False['@@type'] = typeBool

const $Bool = uncurry($.NullaryType)(
  typeBool,
  'http://',
  [],
  x => type(x) === typeBool,
)

console.log(type(False))
console.log(show(False))
console.log(False)
console.log(S.is($Bool)(True))

Bool.prototype.invert = function () {
  return this.cata({
    True: () => False,
    False: () => True,
  })
}

console.log('True.invert()', `${True.invert()}`)
console.log('False.invert()', `${False.invert()}`)
