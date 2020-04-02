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
const Z = require('sanctuary-type-classes')
const daggy = require('daggy')

const env = [
  ...S.env,
  ...F$.env,
]

module.exports = {
  Z,
  $,
  F,
  F$,
  S: S.create({ checkTypes: true, env }),
  def: $.create({ checkTypes: true, env }),
  _S: S.create({ checkTypes: false, env }),
  show,
  type,
  daggy,
  ...require('./sak'),
}
