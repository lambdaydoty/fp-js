/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { S, Z, type, show } = require ('./sanctuary') ()

const isTypeClass = x => type (x) === 'sanctuary-type-classes/TypeClass@1'

// const value = { foo: 'bar' }
const value = []
// const value = 'string'
// const value = x => x

console.log (`
  value === ${show (value)}
`)

const Classes = S.keys (S.unchecked.filter (isTypeClass) (Z))

console.log (
  S.map (
    k =>
      k + ' '.repeat (16 - k.length) + (
        Z[k].test (value) ? ' * ' : '   '
      )
  ) (Classes)
)

// ∷ fn → Maybe String
const render = S.pipe ([
  fn => S.Pair (fn) (fn ()), // heterogeneous types      ∷ Pair Function Any
  S.bimap (S.show) (S.show),                          // ∷ Pair String String
  S.bimap (S.stripPrefix ('_ => ')) (S.of (S.Maybe)), // ∷ Pair (Maybe String) (Maybe String)
  S.pair (S.lift2 (x => y => x + ' === ' + y)),       // ∷ Maybe String
])

// ∷ [fn] → Maybe [String]
const renderAll = S.pipe ([
  S.map (render),       // ∷ [Maybe String]
  S.sequence (S.Maybe), // ∷ Maybe [String]
])

const equals = [
  _ => S.equals ([[1], [2]]) ([[1], [2]]),
  _ => S.equals ([[]]) ([]),
]

const lte = [
  _ => S.filter (S.lte ([1])) ([[0], [1], [2], [0, 1], [1, 2], [1, 0]]),
]

const concat = [
  _ => S.concat ([1, 2]) ([3, 4, 5]),
]

const empty = [
  _ => S.empty (Array),
]

const filter = [
  _ => S.filter (x => x % 2 === 0) ([1, 2, 3]),
]

const alt = [
  _ => S.alt ([1, 2, 3]) ([4, 5]),
  _ => S.alt ([1, 2, 3]) ([3, 4]),
]

const zero = [
  _ => S.zero (Array),
]

const reduce = [
  _ => S.reduce (x => y => `(${x},${y})`) ('@') ([1, 2, 3, 4]),
]

// const traverse = []

// const equals = [
//   _ => S.equals ({ x: 1 }) ({ x: 1 }),
//   _ => S.equals ({ x: 1 }) ({ x: 1, y: 2 }),
// ]
// const lte = [
//   _ => S.filter (S.lte ({ foo: 0, bar: 0 })) ([{ foo: -1 }, { foo: 0, bar: -1 }]),
// ]

// const concat = [
//   _ => S.concat ({ x: 1, y: 2 }) ({ y: 3, z: 4 }),
// ]

// const empty = [
//   _ => S.empty (Object),
// ]

// const filter = [
//   _ => S.filter (x => x % 2 === 0) ({ x: 1, y: 2, z: 3 }),
// ]

// const alt = [
//   _ => S.alt ({ x: 'hello', y: 'world!' }) ({ x: 'default' }),
//   _ => S.alt ({ y: 'world!' }) ({ x: 'default' }),
// ]

// const zero = [
//   _ => S.zero (Object),
// ]

// const reduce = [
//   _ => S.reduce (x => y => x + '_' + y) ('@') ({ x: 'x', y: 'y', z: 'z' }),
// ]

// const traverse = []

// ∷ StrMap (Maybe [String])
const demo = {
  'Setoid': renderAll (equals),
  'Ord': renderAll (lte),
  'Semigroup': renderAll (concat),
  'Monoid': renderAll (empty),
  'Filterable': renderAll (filter),
  'Alt': renderAll (alt),
  'Plus': renderAll (zero),
  'Foldable': renderAll (reduce),
  // 'Traversable': renderAll (traverse),
}

console.log (
  S.justs (demo)
)
