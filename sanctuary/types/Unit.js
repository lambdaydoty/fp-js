/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const daggy = require ('daggy')
const $ = require ('sanctuary-def')
const { uncurry } = require ('./curry')

/* Unit */

const Unit = daggy.tagged ('Unit', [])

const $Unit = uncurry ($.NullaryType) (
  'Unit',
  'http://',
  [],
  x => x instanceof Unit,
)

Unit.prototype['@@show'] = _ => '()'

module.exports = {
  Unit,
  $Unit,
}
