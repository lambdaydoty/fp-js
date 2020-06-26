// /* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
// const type = require('sanctuary-type-identifiers')
const show = require('sanctuary-show')
const daggy = require('daggy')
const $ = require('sanctuary-def')
const util = require('util')
const { uncurry } = require('../curry')
const { map, filter, reduce, concat, chain, ap, of: of_, empty } = require('fantasy-land')
const a = $.TypeVariable('a')

const listIdentifier = 'jws/list/1'

const List = daggy.taggedSum('List', {
  Nil: [],
  Cons: ['x', 'xs'],
})

/* Type-Checking */

const $List = uncurry($.UnaryType)(
  'List',
  'https://',
  [],
  xs => List.is(xs),
  xs => xs.cata({
    Nil: _ => [],
    Cons: (x, xs) => [x],
  }),
)

const def = $.create({
  checkTypes: true,
  env: $.env.concat([$List($.Unknown)]),
})

// ∷ a → List a → List a
const Cons = uncurry(def)(
  'Cons',
  {},
  [a, $List(a), $List(a)],
  x =>
    xs =>
      List.Cons(x, xs),
)

const Nil = List.Nil

/* Prototyping */

const $prototype = {
  constructor: List,
  '@@type': listIdentifier,
  '@@show' () {
    return this.cata({
      Nil: _ => '()',
      Cons: (x, xs) => `(${x} ${show(xs)})`,
    })
  },
  [util.inspect.custom] () {
    return show(this)
  },

  // `foldl` for cons-list
  // ∷ Foldable f ⇒ f a ~>((b, a) → b, b) → b
  [reduce] (op /* ∷ (b, a) → b */, c /* ∷ b */) {
    return this.cata({
      Nil: _ => c,
      Cons: (a, as) => as[reduce](op, op(c, a)),
    })
  },

  // `foldr` for cons-list
  // ∷ Foldable f ⇒ f a ~>((b, a) → b, b) → b
  foldr (op /* ∷ (a, b) → b */, init /* ∷ b */) {
    return this.cata({
      Nil: _ => init,
      Cons: (x, xs) => op(x, xs.foldr(op, init)),
    })
  },

  // ∷ Functor f ⇒ f a ~>(a → b) → f b
  [map] (fn) {
    return this[reduce](
      (xs, x) => Cons(fn(x))(xs),
      Nil,
    )
  },

  // ∷ Filterable f ⇒ f a ~>(a → Boolean) → f a
  [filter] (pred) {
    return this[reduce](
      (xs, x) =>
        pred(x) ? Cons(x)(xs) : xs,
      Nil,
    )
  },

  // ∷ Semigroup a ⇒ a ~> a → a
  [concat] (that) {
    return this[reduce](
      (xs, x) => Cons(x)(xs),
      that,
    )
  },

  // ∷ Chain m ⇒ m a ~>(a → m b) → m b
  [chain] (fn) {
    return this[map](fn)[reduce](
      (xs, ys) => ys[concat](xs),
      List[empty](),
    )
  },

  // ∷ Apply f ⇒ f a ~> f(a → b) → f b
  [ap] (that) {
    return this[chain](
      f => that[map](f)
    )
  },
}

const $static = {
  // ∷ Monoid m ⇒() → m
  [empty] () {
    return Nil
  },

  // ∷ Applicative f ⇒ a → f a
  [of_] (x) {
    return Cons(x)(Nil)
  },

  // ∷ Array a → List a
  from: uncurry(def)(
    'from',
    {},
    [$.Array(a), $List(a)],
    arr =>
      arr.reduceRight(
        (xs, x) => Cons(x)(xs),
        Nil,
      )
  ),
}

Object.assign(List.prototype, $prototype)
Object.assign(List, $static)

module.exports = {
  Cons, // the(polymorphic) data constructor ∷ a → List a → List a
  Nil, // the(polymorphic) data constructor ∷ List a
  List, // the type representative
  $List, // the type
}

// Example:
// const S = require('sanctuary')
// const list1 =
//   Cons(1)(
//     Cons(2)(
//       Cons(3)(
//         Cons(4)(
//           Nil
//         )
//       )
//     )
//   )
// const list2 = List.from([4, 3, 2, 1])
// console.log(show(list1))
// console.log(show(list2))
// console.log(S.unchecked.of(List)('hello'))
