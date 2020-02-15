/* eslint func-call-spacing: ["error", "always"] */
/* eslint operator-linebreak: ["error", "after"] */
const { create, env } = require ('sanctuary')
const S = create ({ checkTypes: true, env })
const { pipe } = S

const uncurry = f => arr => arr.reduce ((p, c) => p (c), f)

console.log (S.add (1) (2))

const $ = require ('sanctuary-def')
const def = $.create ({ checkTypes: true, env })

// const inc = def ('inc') ({}) ([ $.Number, $.Number ]) (
//   x => x + 1
// )

const inc = uncurry (def) ([
  'inc',
  {},
  [ $.Number, $.Number ],
  x => x + 1,
])

console.log (inc (100))

console.log ('')
console.log ('@issue#505')

const cond = x =>
  x > 0 ? 'positive' :
    x < 0 ? 'negative' :
    /* otherwise */ 'should be zero...'

console.log (cond (0))

const isNil = x => x == null

console.log (
  isNil (null),
  isNil (undefined),
  isNil ([]),
  isNil (''),
)

const tap = f => x => (f (x), x) // eslint-disable-line no-sequences

pipe ([
  x => console.log (x) || x,
  x => x + 1,
  tap (console.log),
  x => x * x,
  tap (console.log),
]) (2)

const adder = x => y => x + y
console.log (
  adder (3) (4))
