/* eslint func-call-spacing: ["error", "always"] */
const { type, show, daggy, $, uncurry } = require ('./sanc')
const util = require ('util')

const listIdentifier = 'jws/list'

const reduce = 'fantasy-land/reduce'
const map = 'fantasy-land/map'
const filter = 'fantasy-land/filter'
const concat = 'fantasy-land/concat'
const empty = 'fantasy-land/empty'
const chain = 'fantasy-land/chain'
const ap = 'fantasy-land/ap'
const _of = 'fantasy-land/of'

const List = daggy.taggedSum (
  'List',
  {
    _Cons: ['x', 'xs'],
    _Nil: [],
  },
)

const { _Cons, _Nil } = List

/* Type-Checking */

const a = $.TypeVariable ('a')

const $List = uncurry ($.UnaryType) (
  'List',
  'http://',
  [],
  xs =>
    type (xs) === listIdentifier,
  xs =>
    xs.cata ({
      _Cons: (x, xs) => [x],
      _Nil: () => [],
    }),
)

const def = $.create ({
  checkTypes: true,
  env: $.env.concat ([$List ($.Unknown)]),
})

// :: a => List a => List a
const Cons = uncurry (def) (
  'Cons',
  {},
  [a, $List (a), $List (a)],
  x =>
    xs =>
      _Cons (x, xs),
)

const Nil = _Nil

/* Prototyping */

const $prototype = {
  '@@type': listIdentifier,

  '@@show' () {
    return this.cata ({
      _Cons: (x, xs) => `(${x} ${show (xs)})`,
      _Nil: () => `()`,
    })
  },

  [util.inspect.custom] () {
    return show (this)
  },

  // :: Foldable f => f a ~> ((b, a) -> b, b) -> b
  [reduce] (op, init) {
    return this.cata ({
      _Cons: (x, xs) => op (xs[reduce] (op, init), x),
      _Nil: () => init,
    })
  },

  // :: Functor f => f a ~> (a -> b) -> f b
  [map] (fn) {
    return this[reduce] (
      (xs, x) => Cons (fn (x)) (xs),
      Nil,
    )
  },

  // :: Filterable f => f a ~> (a -> Boolean) -> f a
  [filter] (pred) {
    return this[reduce] (
      (xs, x) =>
        pred (x) ? Cons (x) (xs) : xs,
      Nil,
    )
  },

  // :: Semigroup a => a ~> a -> a
  [concat] (that) {
    return this[reduce] (
      (xs, x) => Cons (x) (xs),
      that,
    )
  },

  // :: Chain m => m a ~> (a -> m b) -> m b
  [chain] (fn) {
    return this[map] (fn)[reduce] (
      (xs, ys) => ys[concat] (xs),
      List[empty] (),
    )
  },

  // :: Apply f => f a ~> f (a -> b) -> f b
  [ap] (that) {
    return this[chain] (
      f => that[map] (f)
    )
  },
}

const $static = {
  // :: Monoid m => () -> m
  [empty] () {
    return Nil
  },

  // :: Applicative f => a -> f a
  [_of] (x) {
    return Cons (x) (Nil)
  },

  // data constructor
  from (arr) {
    return arr.reduceRight (
      (xs, x) => Cons (x) (xs),
      Nil,
    )
  },
}

Object.assign (List.prototype, $prototype)
Object.assign (List, $static)

const list1 =
  Cons (1) (
    Cons (2) (
      Cons (3) (
        Cons (4) (
          Nil
        )
      )
    )
  )

const list2 = List.from ([3, 2, 1])

const copy =
  x =>
    List.from ([x, x])

const square =
  x =>
    x * x

const negate =
  x =>
    -x

const even =
  x =>
    x % 2 === 0

const list3 = List.from ([square, negate])

console.log (list1[concat] (list2))
console.log (list1[chain] (copy))
console.log (list3[ap] (list1))
console.log (List[_of] ('hello'))
console.log (list1[filter] (even))

module.exports = {
  Cons, // the (polymorphic) data constructor
  Nil, // the (polymorphic) data constructor
  $List, // the type (representative)
}
