const { daggy, type, show, $, uncurry, def } = require('../sanc')

const maybeTypeIdent = 'jws/Maybe@2'

const $Maybe = uncurry($.UnaryType)(
  'Maybe',
  'https://',
  [],
  x => type(x) === maybeTypeIdent,
  maybe => Maybe.Just.is(maybe) ? [maybe.value] : [],
)

const Maybe = daggy.taggedSum(
  'Maybe',
  {
    Nothing: [],
    Just: ['value'],
  },
)

const { Nothing, Just } = Maybe

Maybe.prototype['@@type'] = maybeTypeIdent
Maybe.prototype['@@show'] = function () {
  return Maybe.Nothing.is(this)
    ? 'Nothing'
    : `Just (${show(this.value)})`
}

// Nothing['@@show'] = () => 'Nothing'
// Just.prototype['@@show'] = function () {
//   return `Just (${show(this)})`
// }

// const Nothing = {
//   'isJust': false,
//   'isNothing': true,
//   '@@type': maybeTypeIdent,
//   '@@show':
// }

// const Just = x => ({
//   'isJust': true,
//   'isNothing': false,
//   '@@type': maybeTypeIdent,
//   '@@show': () => `Just (${show(x)})`,
//   'value': x,
// })

// console.log(Just(42)['@@show']())

const a = $.TypeVariable('a')

const fromMaybe = uncurry(def)(
  'fromMaybe',
  {},
  [a, $Maybe(a), a],
  x => m => Maybe.Nothing.is(m) ? x : m.value,
)

Maybe.prototype.fromMaybe = function (x) {
  return this.cata({
    Nothing: () => x,
    Just: value => value,
  })
}

console.log(
  fromMaybe(0)(Just(42)),
  Just(42).fromMaybe(0),
)
console.log(
  fromMaybe(0)(Nothing),
  Nothing.fromMaybe(0),
)
