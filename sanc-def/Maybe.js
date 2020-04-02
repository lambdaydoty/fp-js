const { type, show, $, uncurry, def } = require('../sanc')

const maybeTypeIdent = 'jws/Maybe'

const Maybe = uncurry($.UnaryType)(
  'Maybe',
  'https://',
  [],
  x => type(x) === maybeTypeIdent,
  maybe => maybe.isJust ? [maybe.value] : [],
)

const Nothing = {
  'isJust': false,
  'isNothing': true,
  '@@type': maybeTypeIdent,
  '@@show': () => 'Nothing',
}

const Just = x => ({
  'isJust': true,
  'isNothing': false,
  '@@type': maybeTypeIdent,
  '@@show': () => `Just (${show(x)})`,
  'value': x,
})

const a = $.TypeVariable('a')

const fromMaybe = uncurry(def)(
  'fromMaybe',
  {},
  [a, Maybe(a), a],
  x => m => m.isJust ? m.value : x,
)

console.log(
  fromMaybe(0)(Just(42)),
)
console.log(
  fromMaybe(0)(Nothing),
)
