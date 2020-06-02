/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const show = require ('sanctuary-show')
// const type = require ('sanctuary-type-identifiers')
const daggy = require ('daggy')
const $ = require ('sanctuary-def')
const S = require ('sanctuary')
const util = require ('util')
const { uncurry } = require ('../curry')
const { map, chain, ap, of: of_ } = require ('fantasy-land')

/**
 * https://gist.github.com/dypsilon/883e878ca1c05a7c355e41fb28a2f3e3
 * https://github.com/fantasyland/fantasy-readers
 * https://github.com/monet/monet.js/blob/master/docs/READER.md
 */

const Reader_ = daggy.tagged ('Reader', ['run'])

/* Type-Checking */

const $Reader = uncurry ($.NullaryType) (
  'Reader',
  'https://',
  [],
  r => r instanceof Reader_,
)

const def = $.create ({ checkTypes: true, env: [...$.env, $Reader] })

// ∷ (* → *) → Reader (* → *)
const Reader = uncurry (def) (
  'Reader',
  {},
  [$.AnyFunction, $Reader],
  f => Reader_ (f),
)

/* Prototyping */

const ask = 'ask'

const $static = {
  // ∷ Applicative f ⇒ a → f a
  [of_] (x) {
    return Reader (S.K (x))
  },

  [ask]: Reader (S.I),
}

const $prototype = {
  constructor: Reader,
  '@@show' () {
    return `Reader (${show (this.run)})`
  },
  [util.inspect.custom] () {
    return show (this)
  },

  // ∷ Chain m ⇒ m a ~> (a → m b) → m b
  [chain] (fn) {
    return Reader (
      e => fn (this.run (e)).run (e)
    )
  },

  // ∷ Functor f ⇒ f a ~> (a → b) → f b
  [map] (fn) {
    return this[chain] (x => Reader_[of_] (fn (x)))
  },

  // ∷ Apply f ⇒ f a ~> f (a → b) → f b
  [ap] (that) {
    return this[chain] (
      f => that[map] (f)
    )
  },
}

Object.assign (Reader_.prototype, $prototype)
Object.assign (Reader_, $static)

module.exports = {
  Reader,
  $Reader,
}

// Example:
