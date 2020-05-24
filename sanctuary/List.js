/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
// const type = require ('sanctuary-type-identifiers')
const show = require ('sanctuary-show')
const daggy = require ('daggy')
const $ = require ('sanctuary-def')
const util = require ('util')
const { uncurry } = require ('./curry')
const FL = require ('fantasy-land')
const a = $.TypeVariable ('a')

const listIdentifier = 'jws/list/1'

const List = daggy.taggedSum ('List', {
  Cons: ['x', 'xs'],
  Nil: [],
})

/* Type-Checking */

const $List = uncurry ($.UnaryType) (
  'List',
  'https://',
  [],
  xs => List.is (xs),
  xs => xs.cata ({
    Cons: (x, xs) => [x],
    Nil: () => [],
  }),
)

const def = $.create ({
  checkTypes: true,
  env: $.env.concat ([$List ($.Unknown)]),
})

// ∷ a → List a → List a
const Cons = uncurry (def) (
  'Cons',
  {},
  [a, $List (a), $List (a)],
  x =>
    xs =>
      List.Cons (x, xs),
)

const Nil = List.Nil

/* Prototyping */

const $prototype = {
  constructor: List,
  '@@type': listIdentifier,
  '@@show' () {
    return this.cata ({
      Cons: (x, xs) => `(${x} ${show (xs)})`,
      Nil: () => `()`,
    })
  },
  [util.inspect.custom] () {
    return show (this)
  },

  // ∷ Foldable f => f a ~> ((b, a) → b, b) → b
  [FL.reduce] (op, init) {
    return this.cata ({
      Cons: (x, xs) => xs[FL.reduce] (op, op (init, x)),
      Nil: _ => init,
    })
  },

  // ∷ Functor f => f a ~> (a → b) → f b
  [FL.map] (fn) {
    return this[FL.reduce] (
      (xs, x) => Cons (fn (x)) (xs),
      Nil,
    )
  },

  // ∷ Filterable f => f a ~> (a → Boolean) → f a
  [FL.filter] (pred) {
    return this[FL.reduce] (
      (xs, x) =>
        pred (x) ? Cons (x) (xs) : xs,
      Nil,
    )
  },

  // ∷ Semigroup a => a ~> a → a
  [FL.concat] (that) {
    return this[FL.reduce] (
      (xs, x) => Cons (x) (xs),
      that,
    )
  },

  // ∷ Chain m => m a ~> (a → m b) → m b
  [FL.chain] (fn) {
    return this[FL.map] (fn)[FL.reduce] (
      (xs, ys) => ys[FL.concat] (xs),
      List[FL.empty] (),
    )
  },

  // ∷ Apply f => f a ~> f (a → b) → f b
  [FL.ap] (that) {
    return this[FL.chain] (
      f => that[FL.map] (f)
    )
  },
}

const $static = {
  // ∷ Monoid m => () → m
  [FL.empty] () {
    return Nil
  },

  // ∷ Applicative f => a → f a
  [FL.of] (x) {
    return Cons (x) (Nil)
  },

  // ∷ Array a → List a
  from: uncurry (def) (
    'from',
    {},
    [$.Array (a), $List (a)],
    arr =>
      arr.reduceRight (
        (xs, x) => Cons (x) (xs),
        Nil,
      )
  ),
}

Object.assign (List.prototype, $prototype)
Object.assign (List, $static)

module.exports = {
  Cons, // the (polymorphic) data constructor ∷ a → List a → List a
  Nil, // the (polymorphic) data constructor ∷ List a
  List, // the type representative
  $List, // the type
}

// Example:
// const S = require ('sanctuary')
// const list1 =
//   Cons (1) (
//     Cons (2) (
//       Cons (3) (
//         Cons (4) (
//           Nil
//         )
//       )
//     )
//   )
// const list2 = List.from ([4, 3, 2, 1])
// console.log (show (list1))
// console.log (show (list2))
// console.log (S.unchecked.of (List) ('hello'))
