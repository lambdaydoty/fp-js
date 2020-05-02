/* eslint func-call-spacing: ["error", "always"] */
const doM = require ('./doM')
const { $, S, def, uncurry } = require ('../sanctuary') ()

;(() => {
  console.log ('')

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

  const program = doM (function * (m/* :: Monad a */) {
    const x = yield m
    const a = yield S.get (S.is ($.Object)) ('a') (x)
    const b = yield S.get (S.is ($.Object)) ('b') (a)
    const c = yield S.get (S.is ($.String)) ('c') (b)
    const n = yield S.parseFloat (c)
    const r = yield safeSqrt (n)
    return S.of (S.Maybe) (r)
  })

  console.log ('Maybe Monad, happy path: ',
    program (S.Just ({ a: { b: { c: '+10' } } }))
  )

  console.log ('Maybe Monad, unhappy path: ',
    program (S.Just ({ a: { b: { c: '-10' } } }))
  )

  console.log ('Maybe Monad, unhappy path: ',
    program (S.Just ({ a: { b: {} } }))
  )
}) ()

;(() => {
  console.log ('')

  const program = doM (function * (m/* :: Monad a */) {
    const a = yield S.Just (1)
    const b = yield S.Just (2)
    const c = yield S.Just (a + b)
    return S.of (S.Maybe) (c)
  })

  console.log ('Maybe Monad (lifted), happy path: ',
    program ()
  )
}) ()

;(() => {
  console.log ('')

  const safeDiv =
    x =>
      y =>
        y === 0 ? S.Left ('Cannot divide by zero')
        /* o.w. */ : S.Right (x / y)

  const safeSqrt =
    x =>
      x < 0 ? S.Left ('Cannot take a square root of negatives')
      /* o.w. */ : S.Right (Math.sqrt (x))

  const safeSqrt2 =
    x =>
      x < 0 ? S.Nothing
      /* o.w. */ : S.Just (Math.sqrt (x))

  const program1 = doM (function * (m) {
    const x = yield m
    const y = yield safeSqrt (x) // :: Either a b
    const inv = yield safeDiv (1) (y)
    return S.of (S.Either) (inv)
  })

  const program2 = doM (function * (m) {
    const x = yield m
    const y = yield safeSqrt2 (x) // :: Maybe a
    const inv = yield safeDiv (1) (y)
    return S.of (S.Either) (inv)
  })

  console.log ('Either Monad, happy path: ', program1 (S.Right (9)))
  console.log ('Either Monad, unhappy path: ', program1 (S.Right (0)))
  console.log ('Either Monad, unhappy path: ', program1 (S.Right (-1)))
  console.log ('Mixed Monad, unhappy path: ', program2 (S.Right (-1)))
}) ()

;(() => {
  console.log ('')

  // :: Number -> Number
  const square = x => x * x

  // :: a -> Generator a
  const copy = function * (x) {
    yield x
    yield x
  }

  const { range } = require ('./generator')
  const ten = () => range (0) (10)

  console.log ('ten: ', [...ten ()])
  console.log ('squared: ', [
    ...S.unchecked.map (square) (ten ()),
  ])
  console.log ('copied: ', [
    ...S.unchecked.chain (copy) (ten ()),
  ])
}) ()

;(() => {
  console.log ('')

  require ('./generator')

  const g1 = function * () {
    yield 1
    yield 2
  }

  const g2 = function * (x) {
    yield x + 1
    yield x + 2
  }

  const app2 = doM.G (function * (m) {
    const x = yield m ()
    const c = yield g1 ()
    const d = yield g2 (c)
    return [x, d]
  })

  const minusOne = function * () {
    yield -1
  }

  console.log ('Non-deterministic:')
  console.log ([...app2 (minusOne)])
}) ()
