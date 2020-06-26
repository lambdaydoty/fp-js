/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { S, show } = require ('./sanctuary') ()
/**
 *
 * https://www.schoolofhaskell.com/user/tel/lenses-from-scratch
 * https://medium.com/javascript-scene/lenses-b85976cb0534
 * https://r6research.livejournal.com/23705.html
 * https://bartoszmilewski.com/2013/10/08/lenses-stores-and-yoneda/
 * https://github.com/sanctuary-js/sanctuary/issues/177
 * https://vimeo.com/104807358
 * https://medium.com/javascript-scene/lenses-b85976cb0534
 * https://www.linkedin.com/pulse/functional-lenses-javascript-vladim%C3%ADr-gorej/
 *
 */

const B =
  f =>
    g =>
      x =>
        f (g (x))

;(function Store () {
  const extract = 'fantasy-land/extract'
  const duplicate = 'fantasy-land/duplicate'
  const extend = 'fantasy-land/extend'
  const map = 'fantasy-land/map'
  // a = $.TypeVariable ('a')
  // b = $.TypeVariable ('b')
  // c = $.TypeVariable ('c')
  // $Store = D.BinaryType (..., $.Function ([b, a]), b)
  // Store b a ∷ Record { v: (b → a) y: b }
  const Store =
    v => // ∷ b → a
      b => // ∷ b
        Object.assign (
          Object.create ({
            [map]: function (fn/* ∷ a → c */) {
              return Store (B (fn) (this.v)) (this.b)
            },
            [extract]: function () {
              return this.v (this.b)
            },
            [duplicate]: function () {
              return Store (Store (this.v)) (this.b)
            },
            // ∷ w a ~> (w a → b) → w b
            [extend]: function (fn/* ∷ Store  b a → c */) {
              return S.unchecked.map (fn) (this[duplicate])
            },
          }),
          { v, b },
        )

  // Lens a b = a → Store b a
  // Lens can be thought as a coalgebra for the Store b a

  // ∷ Lens a b → a → b
  const get =
    l =>
      a =>
        (l (a)).b

  // ∷ Lens a b → a → b → a
  const set =
    l =>
      a =>
        (l (a)).v

  const lens =
    prop =>
      entry =>
        Store (x => ({ ...entry, [prop]: x })) (entry[prop])

  const entry0 = {
    name: 'Alice',
    age: 8,
    interest: [
      'kitty',
      'puppy',
      'Category',
    ],
  }

  const nameLens = lens ('name')
  const ageLens = lens ('age')
  const interestLens = lens ('interest')
  const firstLens = lens ('0')

  console.log ('')
  console.log (
    get (nameLens) (entry0),
  )
  console.log (
    set (ageLens) (entry0) (9),
  )
  console.log (
    get (
      B (firstLens) (interestLens)
    ) (
      entry0
    )
  )
}) ()

;(function Motivation () {
  // ∷ Lens a b
  const _1 = {
    // ∷ (Pair a b) → a
    get: S.pair (x => _ => x),
    //

    // ∷ a → (Pair a b) → (Pair a b)
    set: x => S.pair (_ => y => S.Pair (x) (y)),
    //
  }

  const get =
    lens =>
      lens['get']

  const set =
    lens =>
      lens['set']

  const data = S.Pair ('foo') (1)

  console.log ('')
  console.log ('')
  console.log ('')
  console.log (
    show (get (_1) (data)),
    show (set (_1) ('bar') (data)),
  )

  // Lens a b = { get: A → B, set: B → A → A } // original
  //
  // Lens a b = { get: A → B, set: A → B → A } // flipped
  //
  // Lens a b = A → { get: B, set: B → A } // factorized
}) ()
