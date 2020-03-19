/**
 * Naming Conventions:
 *  S = require('sanctuary')
 *  $ = require('sanctuary-def')
 *  Z = require('sanctuary-type-classes')
 *  F = require('fluture')
 *  type = require('sanctuary-type-identifiers')
 *
 */
const S = require('sanctuary')
const $ = require('sanctuary-def')
const show = require('sanctuary-show')
const type = require('sanctuary-type-identifiers')
const F = require('fluture')
const F$ = require('fluture-sanctuary-types')

const options = {
  checkTypes: false,
  env: [...S.env, ...F$.env],
}

module.exports = {
  $,
  S: S.create(options),
  def: $.create(options),
  F,
  F$,
  show,
  type,
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
