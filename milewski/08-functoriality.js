/* eslint func-call-spacing: ["error", "always"] */
const { show, Z, S, $, uncurry, def } = require ('../sanctuary') ()
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

;(function Bifunctor () {
  console.log ('')
  console.log ('Bifunctor')

  const x = S.Pair ('foo') (42)
  const g = S.toUpper
  const h = Math.sqrt

  console.log ('')
  console.log (`
    S.bimap (g) (h) (${show (x)}) === ${show (S.bimap (g) (h) (x))}
    bimap2 (g) (h) (${show (x)}) === ${show (bimap2 (g) (h) (x))}
    bimap3 (g) (h) (${show (x)}) === ${show (bimap3 (g) (h) (x))}
  `)
}) ()

;(function EitherBifunctor () {
  console.log ('')
  console.log ('EitherBifunctor')

  const x = S.Left ('foo')
  const y = S.Right (42)
  const g = S.toUpper
  const h = Math.sqrt

  console.log ('')
  console.log (`
    S.bimap (g) (h) (${show (x)}) === ${show (S.bimap (g) (h) (x))}
    bimap2 (g) (h) (${show (x)}) === ${show (bimap2 (g) (h) (x))}
    bimap3 (g) (h) (${show (x)}) === ${show (bimap3 (g) (h) (x))}
  `)

  console.log ('')
  console.log (`
    S.bimap (g) (h) ${show (y)} === ${show (S.bimap (g) (h) (y))}
    bimap2 (g) (h) ${show (y)} === ${show (bimap2 (g) (h) (y))}
    bimap3 (g) (h) ${show (y)} === ${show (bimap3 (g) (h) (y))}
  `)
}) ()

;(function AlgebraicMaybeBifunctor () {
  console.log ('')
  console.log ('AlgebraicMaybeBifunctor')

  const $Maybe =
    a =>
      $.Either ($.Null) ($.Identity (a))

  const Just =
    x =>
      S.Right (Identity (x))

  const Nothing =
    S.Left (null)

  console.log ('')
  console.log (`
    S.is ($Maybe ($.String)) (Just ('hello'))) === ${show (
    S.is ($Maybe ($.String)) (Just ('hello'))
  )}`)
  console.log (`
    S.is ($Maybe ($.String)) (Nothing)) === ${show (
    S.is ($Maybe ($.String)) (Nothing)
  )}`)

  const M = {
    bimap: f => g => S.bimap (f) (S.map (g)),
  }

  console.log (`
    S.bimap (S.I) (S.toUpper) (Just ('hello')) === ${show (
    M.bimap (S.I) (S.toUpper) (Just ('hello'))
  )}`)
}) ()

;(function WriterFunctor () {
  console.log ('')
  console.log ('WriterFunctor')

  const $Writer = $.Pair ($.String)
  const Writer = S.Pair
  const w = Writer ('') (42)

  console.log ('')
  console.log (`
    S.is ($Writer ($.Number)) (${show (w)}) === ${show (
    S.is ($Writer ($.Number)) (w)
  )}`)

  const fish =
    m1 =>
      m2 =>
        x =>
          S.pair (
            s1 =>
              y =>
                S.pair (
                  s2 =>
                    z =>
                      S.Pair (S.concat (s1) (s2)) (z)
                ) (m2 (y))
          ) (m1 (x))

  const _return = Writer ('')

  /* Implement fmap by `fish` + `_return` */
  const fmap =
    f =>
      fish (S.I) (
        x =>
          _return (f (x))
      )

  const inc = x => Writer ('Increased by 1, ') (x => x + 1)
  const sq = x => Writer ('Squared, ') (x * x)

  console.log ('')
  console.log (`
    fish (inc) (sq) (1) === ${fish (inc) (sq) (1)}
    fmap (x => x * 10) (${show (w)}) === ${show (fmap (x => x * 10) (w))}
  `)
}) ()

;(function Contravariant () {
  console.log ('')
  console.log ('Contravariant')

  // ∷ String → NonNegativeInteger
  const length = uncurry (def) (
    'length',
    {},
    [$.String, $.NonNegativeInteger],
    s => s.length,
  )

  // ∷ NonNegativeInteger → PositiveNumber
  const sqrt = uncurry (def) (
    'sqrt',
    {},
    [$.NonNegativeInteger, $.PositiveNumber],
    x => Math.sqrt (x),
  )

  const contramap2 = S.flip (S.compose)

  console.log (`
    S.contramap (length) (sqrt) ('Hello') === ${S.contramap (length) (sqrt) ('Hello')}
    contramap2 (length) (sqrt) ('Hello') === ${contramap2 (length) (sqrt) ('Hello')}
  `)
}) ()

;(function Profunctor () {
  console.log ('')
  console.log ('Profunctor')

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

  const safePrint = uncurry (def) (
    'safePrint',
    { a: [ZShowable] },
    [a, $.Undefined],
    print,
  )

  console.log ('')
  console.log (`
    S.promap (S.splitOn ('-')) (safePrint) (safeCountWords) ('snake-case-string')
  `)
  S.promap (S.splitOn ('-')) (safePrint) (safeCountWords) ('snake-case-string')
  //        ^^ preprocess                 ^^ main task
}) ()
