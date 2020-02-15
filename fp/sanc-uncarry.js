/* eslint func-call-spacing: ["error", "never"] */
/* eslint operator-linebreak: ["error", "after"] */

// cf. issue https://github.com/sanctuary-js/sanctuary/issues/568
// also see: R.uncurryN() R.isNil() R.tap()
const uncurry = f => arr => arr.reduce((p, c) => p(c), f)
const isNil = x => x == null
const tap = f => x => (f(x), x) // eslint-disable-line no-sequences

const { create, env } = require('sanctuary')
const $ = require('sanctuary-def')
const S = create({ checkTypes: true, env })
const { pipe } = S
const def = $.create({ checkTypes: true, env })
const add = uncurry(S.add)

console.log(add([1, 2]))

const inc = uncurry(def)([
  'inc',
  {},
  [$.Number, $.Number],
  x => x + 1,
])

console.log(inc(100))

console.log('')
console.log('@issue#505')

// also see: R.cond()
const cond = x =>
  x > 0 ? 'positive' :
    x < 0 ? 'negative' :
    /* otherwise */ 'should be zero...'

console.log(cond(0))

console.log([
  isNil(null),
  isNil(undefined),
  isNil([]),
  isNil(''),
])

pipe([
  tap(console.log),
  x => x + 1,
  tap(console.log),
  x => x * x,
  tap(console.log), // x => console.log(x) || x
])(2)

const adder = x => y => x + y
const add3 = adder(3)
const addd3 = S.add(3)

console.log([
  adder(3)(4),
  add3(4),
  addd3(4),
])
