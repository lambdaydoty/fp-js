/* eslint func-call-spacing: ["error", "always"] */
const { S, $, uncurry, def } = require ('./sanctuary')

// :: Number -> Maybe PositiveNumber
const safeSqrt = uncurry (def) (
  'safeSqrt',
  {},
  [$.Number, $.Maybe ($.PositiveNumber)],
  x =>
    x >= 0
      ? S.Just (Math.sqrt (x))
      : S.Nothing,
)

// :: Maybe Object -> Maybe Number
const safe3 = S.pipe ([
  S.chain (S.get (S.is ($.Object)) ('a')),
  S.chain (S.get (S.is ($.Object)) ('b')),
  S.chain (S.get (S.is ($.String)) ('c')),
  S.chain (S.parseFloat),
  S.chain (safeSqrt),
])

const $do =
  fs =>
    S.pipe (S.map (S.chain) (fs))

// :: Maybe Object -> Maybe Number
const safe4 = $do ([
  S.get (S.is ($.Object)) ('a'),
  S.get (S.is ($.Object)) ('b'),
  S.get (S.is ($.String)) ('c'),
  S.parseFloat,
  safeSqrt,
])

const x = {
  a: {
    b: {
      c: '+10',
      // c: '-10',
    },
  },
}

const doM =
  Gen =>
    x => {
      const log = () => {} // debug
      const gen = Gen (x)
      const next = x => gen.next (x)
      let result = null
      log (x)
      for (
        result = next ();
        !result.done && S.isJust (result.value); // FIXME!
        result = S.unchecked.chain (next) (result.value)
      ) {
        log (result)
      }
      return result.value
    }

const safe5 = doM (function * (m/* :: Monad a */) {
  const x = yield m

  const a = yield S.get (S.is ($.Object)) ('a') (x)
  const b = yield S.get (S.is ($.Object)) ('b') (a)
  const c = yield S.get (S.is ($.String)) ('c') (b)
  const n = yield S.parseFloat (c)
  const r = yield safeSqrt (n)

  return S.of (S.Maybe) (r)
})

const safe6 = doM (function * () {
  const a = yield S.Just (1)
  const b = yield S.Just (2)
  const c = yield S.Just (a + b)
  return S.of (S.Maybe) (c)
})

console.log (safe3 (S.Just (x)))
console.log (safe4 (S.Just (x)))
console.log (safe5 (S.Just (x)))
console.log (safe6 ())
