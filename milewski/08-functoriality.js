/* eslint func-call-spacing: ["error", "always"] */
const { Z, S, $, uncurry, def } = require ('../sanctuary')
const Identity = require ('sanctuary-identity')

const first = S.mapLeft
const second = S.map

const bimap2 =
  f1 =>
    f2 =>
      S.compose (first (f1)) (second (f2))

const bimap3 =
  f1 =>
    f2 =>
      S.compose (second (f2)) (first (f1))

;(function () {
  /* The Bifunctor of Product */

  const x = S.Pair ('foo') (64)
  const g = S.toUpper
  const h = Math.sqrt

  console.log ('')
  console.log (S.bimap (g) (h) (x))
  console.log (bimap2 (g) (h) (x))
  console.log (bimap3 (g) (h) (x))
}) ()

;(function () {
  /* The Bifunctor of Either */

  const x = S.Left ('left')
  const y = S.Right (64)
  const g = S.toUpper
  const h = Math.sqrt

  console.log ('')
  console.log (S.bimap (g) (h) (x))
  console.log (bimap2 (g) (h) (x))
  console.log (bimap3 (g) (h) (x))
  console.log (S.bimap (g) (h) (y))
  console.log (bimap2 (g) (h) (y))
  console.log (bimap3 (g) (h) (y))
}) ()

;(function () {
  const $Maybe =
    a =>
      $.Either ($.Null) ($.Identity (a))

  const Just =
    x =>
      S.Right (Identity (x))

  const Nothing =
    S.Left (null)

  console.log ('')
  console.log (S.is ($Maybe ($.String)) (Just ('hello')))
  console.log (S.is ($Maybe ($.String)) (Nothing))
}) ()

;(function () {
  /* The Writer Functor */

  const $Writer =
    a =>
      $.Pair (a) ($.String)

  const Writer =
    x =>
      s =>
        S.Pair (x) (s)

  const w = Writer (42) ('')

  console.log ('')
  console.log (S.is ($Writer ($.Number)) (w), w)

  const fish =
    m1 =>
      m2 =>
        x =>
          S.pair (
            y =>
              s1 =>
                S.pair (
                  z =>
                    s2 =>
                      S.Pair (z) (S.concat (s1) (s2))
                ) (m2 (y))
          ) (m1 (x))

  const _return =
    x =>
      Writer (x) ('')

  /* Implement fmap by `fish` + `_return` */
  const fmap =
    f =>
      fish (S.I) (
        x =>
          _return (f (x))
      )

  const inc = x => Writer (x + 1) ('Increased by 1, ')
  const sq = x => Writer (x * x) ('Squared, ')

  console.log (fish (inc) (sq) (1))
  console.log (fmap (x => x * 10) (w))
}) ()

;(function () {
  /* The Reader Functor */

  // const $Reader =
  //   r => // stands for the return type
  //     a => // stands for the argument type
  //       $.Function ([r, a])

  /* The Contravariant Functor */
  // f :: a -> f a
  // fmap :: (a -> b) -> f a -> f b
  // contramap :: (b -> a) -> f a -> f b

  const $Op =
    r =>
      a =>
        $.Function ([a, r])

  /* ($Op (r)) is a Contravariant Functor */

  const length = uncurry (def) (
    'length',
    {},
    [$.String, $.NonNegativeInteger],
    s => s.length,
  )

  const sqrt = uncurry (def) (
    'sqrt',
    {},
    [$.NonNegativeInteger, $.PositiveNumber],
    x => Math.sqrt (x),
  )

  console.log ('')
  console.log (
    S.is (
      $Op ($.PositiveNumber) ($.NonNegativeInteger)
    ) (sqrt)
  )
  console.log (
    S.is (
      $Op ($.PositiveNumber) ($.String)
    ) (S.contramap (length) (sqrt))
  )
  console.log (
    S.contramap (length) (sqrt) ('Hello'), // contramap `length` over `sqrt` Functor (預先處理: 根號前先取長度)
    S.map (sqrt) (length) ('Hello'), // map `sqrt` over `length` Functor
  )

  const B = S.compose
  const C = S.flip

  console.log (
    C (B) (length) (sqrt) ('Hello'), // map `sqrt` over `length` Functor
    B (sqrt) (length) ('Hello'), // map `sqrt` over `length` Functor
  )
}) ()

;(function () {
  /* Profunctor */

  const countWords =
    listOfWords =>
      listOfWords.length

  const print =
    x =>
      console.log (x)

  const hasMethod =
    name =>
      x =>
        x != null &&
        typeof x[name] === 'function'

  const ZShowable = Z.TypeClass (
    'jws/Showable',
    'http://',
    [],
    hasMethod ('toString'),
  )

  const safeCountWords = uncurry (def) (
    'safeCountWords',
    {},
    [$.Array ($.String), $.NonNegativeInteger],
    countWords,
  )

  const a = $.TypeVariable ('a')
  // const f = $.UnaryTypeVariable ('f')

  const safePrint = uncurry (def) (
    'safePrint',
    { a: [ZShowable] },
    [a, $.Undefined],
    print,
  )

  console.log (ZShowable.test (3), safePrint (1234))
  //                        vv postprocess
  S.promap (S.splitOn ('-')) (safePrint) (safeCountWords) ('snake-case-string')
  //        ^^ preprocess              ^^ main task
}) ()
