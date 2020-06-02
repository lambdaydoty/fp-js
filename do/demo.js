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

  const fromArray = function * (arr) {
    yield * arr
  }

  const app = doM.G (function * (m) {
    const x = yield m
    const c = yield fromArray ([1, 2])
    const d = yield fromArray ([c + 1, c + 2])
    return [x, d]
  })

  const minusOne = fromArray ([-1])

  console.log ('Non-deterministic:')
  console.log ([...app (minusOne)])

  const app2 = doM.G (function * (m) {
    const c = yield 'ABC'.split ('')
    const d = yield '12'.split ('')
    return [c, d]
  })

  console.log ([...app2 ()])
}) ()

;(() => {
  console.log ('')

  console.log ('Curried continuation passing style & Monad')

  // :: Number -> (Number -> ⊥) -> ⊥
  const cpsSquare =
    x =>
      k =>
        k (x * x)

  cpsSquare (3) (x =>
    cpsSquare (x) (y =>
      cpsSquare (y) (z =>
        console.log (`cpsSquare (3) ... = ${z}`))))

  console.log ('')
  console.log ('Continuation Monad: M a = (a -> m) -> m')
  console.log ('return :: a -> M a')
  console.log ('join :: M (M a) -> M a')

  // :: a -> M a
  // :: a -> (a -> m) -> m
  // = T combinator
  const ret =
    a =>
      k =>
        k (a)

  // console.log ('')
  // console.log ('ret 9:')
  // ret (9) (console.log)

  // :: M a -> (a -> M b) -> M b
  // where M x = (x -> m) -> m
  const bind =
    k => // :: (a -> m) -> m
      fn => // :: a -> (b -> m) -> m
        cb => // :: (b -> m)
          k (a => fn (a) (cb)) // :: m

  // :: (a -> M b) -> M a -> (M b)
  const chain = S.unchecked.flip (bind)

  console.log ('')
  console.log ('bind:')
  bind (
    bind (
      bind (
        ret (3)
      ) (cpsSquare)
    ) (cpsSquare)
  ) (cpsSquare) (console.log)

  console.log ('')
  console.log ('chain:')

  S.unchecked.pipe ([
    chain (cpsSquare), // (a -> M b) -> M a -> M b
    chain (cpsSquare),
    chain (cpsSquare),
  ]) (ret (3)) (console.log)

  // yield :: M b -> b
  const app = doM.K (function * () {
    const x = yield ret (3)
    const y = yield cpsSquare (x)
    const z = yield cpsSquare (y)
    const u = yield cpsSquare (z)
    return ret (`${u}`)
  }) // :: a -> (b -> m) -> m

  console.log ('')
  console.log ('do:')
  app () (x => console.log (x))
}) ()
