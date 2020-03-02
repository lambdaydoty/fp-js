/**
 * Naming Conventions:
 *  S = require('sanctuary')
 *  $ = require('sanctuary-def')
 *  Z = require('sanctuary-type-classes')
 *  F = require('fluture')
 *  type = require('sanctuary-type-identifiers')
 *
 */
const U = {
  uncurry: f => arr => arr.reduce((p, c) => p(c), f),
  tap: f => x => (f(x), x), // eslint-disable-line no-sequences
  trampline: fn => (...args) => {}, // TODO
}
const _S = require('sanctuary')
const $ = require('sanctuary-def')
const F = require('fluture')
const FT = require('fluture-sanctuary-types')

const options = {
  checkTypes: false,
  env: [..._S.env, ...FT.env],
}

const S = _S.create(options)
const def = $.create(options)

module.exports = {
  $,
  U,
  S,
  F,
  FT,
  def,
  show: require('sanctuary-show'),
}

// const { parallel, encaseP, fork } = F
// const { pipe } = S

// const inc = def([
//   'inc',
//   {},
//   [$.Number, $.Number],
//   x => x + 1,
// ])

// pipe([
//   U.tap(console.log),
//   inc,
//   U.tap(console.log),
//   inc,
//   U.tap(console.log),
// ])(100)

// console.log(F.parallel)
