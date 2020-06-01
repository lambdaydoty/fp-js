/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { List, Unit, $Unit, type, show, daggy, $, D, S } = require ('../sanctuary') ()

const show2 =
  a => type (a) === 'sanctuary-pair/Pair@1'
    ? S.pair (
      x =>
        y =>
          `(${show2 (x)},${show2 (y)})`
    ) (a) : show (a)

;(function ProductTypes () {
  console.log ('')
  console.log ('@ProductTypes')

  const p = S.Pair ('foo') (1)

  console.log (`
    S.swap ${show2 (p)} === ` + show2 (
    S.swap (p)
  ))
}) ()

;(function Isomorphic () {
  console.log ('')
  console.log ('@Isomorphic')

  const a = $.TypeVariable ('a')
  const b = $.TypeVariable ('b')
  const c = $.TypeVariable ('c')

  const $Triple1 = $.Pair ($.Pair (a) (b)) (c)
  const $Triple2 = $.Pair (a) ($.Pair (b) (c))

  const Triple1 = a => S.Pair (S.Pair (a[0]) (a[1])) (a[2])
  const Triple2 = a => S.Pair (a[0]) (S.Pair (a[1]) (a[2]))

  // ∷ ((a, b), c) → (a, (b, c))
  const alpha = D.def (
    'alpha',
    {},
    [$Triple1, $Triple2],
    S.pair (
      p =>
        z =>
          S.pair (
            x =>
              y =>
                S.Pair (x) (S.Pair (y) (z))
          ) (p)
    )
  )

  // ∷ (a, (b, c)) → ((a, b), c)
  const alphaInv = D.def (
    'alphaInv',
    {},
    [$Triple2, $Triple1],
    S.pair (
      x =>
        S.pair (
          y =>
            z =>
              S.Pair (S.Pair (x) (y)) (z)

        )
    ),
  )

  const t1 = Triple1 (['foo', 1, true])
  const t2 = Triple2 (['foo', 1, true])

  console.log ('')
  console.log (`
    S.equals (alpha ${show2 (t1)}) ${show2 (t2)} === ` +
    S.equals (alpha (t1)) (t2)
  )
  console.log (`
    S.equals ${show2 (t1)} (alphaInv ${show2 (t2)}) === ` +
    S.equals (t1) (alphaInv (t2))
  )

  // ∷ Pair a Unit → a
  const rho = D.def (
    'rho',
    {},
    [$.Pair (a) ($Unit), a],
    S.pair (
      x =>
        _ =>
          x
    ),
  )

  // ∷ a → Pair a Unit
  const rhoInv = D.def (
    'rhoInv',
    {},
    [a, $.Pair (a) ($Unit)],
    x => S.Pair (x) (Unit ()),
  )

  const v1 = S.Pair ('foo') (Unit ())
  const v2 = 'foo'

  console.log ('')
  console.log (`
    rho ${show2 (v1)} === ${show2 (rho (v1))}`)
  console.log (`
    rhoInv (${show2 (v2)}) === ${show2 (rhoInv (v2))}`)
}) ()

;(function TypeConstructorDataConstructor () {
  console.log ('')
  console.log ('@TypeConstructorDataConstructor')

  // S.Pair ... the data constructur
  // $.Pair ... the type constructor

  console.log (`
    The type constructor:
    $.Pair ($.String) ($.Boolean) === ` + show (
    $.Pair ($.String) ($.Boolean)
  ))
  console.log (`
    The data constructor:
    S.Pair ('This statement is') (true) === ` + show (
    S.Pair ('This statement is') (true)
  ))
}) ()

;(function Records () {
  console.log ('')
  console.log ('@Records')

  const $Triple =
    $.Pair ($.String) (
      $.Pair ($.String) (
        $.Pair ($.Integer) ($Unit)))

  // ∷ String → String → Integer -> Triple
  const Triple = D.def (
    'Triple',
    {},
    [$.String, $.String, $.Integer, $Triple],
    x =>
      y =>
        z =>
          S.Pair (x) (
            S.Pair (y) (
              S.Pair (z) (Unit ())))
  )

  // ∷ (a → b → c → d) -> Triple a b c → d
  const a = $.TypeVariable ('a')
  const b = $.TypeVariable ('b')
  const c = $.TypeVariable ('c')
  const d = $.TypeVariable ('d')
  const triple = D.def (
    'triple',
    {},
    [$.Fn (a) (
      $.Fn (b) (
        $.Fn (c) (d))), $Triple, d],
    fn =>
      S.pair (
        x =>
          S.pair (
            y =>
              S.pair (
                z =>
                  _ =>
                    fn (x) (y) (z))))
  )

  // ∷ Triple → Boolean
  const startsWithSymbol = D.def (
    'startsWithSymbol',
    {},
    [$Triple, $.Boolean],
    triple (
      name =>
        symbol =>
          _ =>
            S.test (new RegExp (`^${symbol}`)) (name))
  )

  const he = Triple ('Helium') ('He') (2)

  console.log ('')
  console.log (`
    he === ${show2 (he)}`
  )
  console.log (`
    startsWithSymbol (he) === ${startsWithSymbol (he)}`
  )

  const Element = daggy.tagged ('Element', [
    'name',
    'symbol',
    'atomicNumber',
  ])

  const $Element = $.RecordType ({
    name: $.String,
    symbol: $.String,
    atomicNumber: $.Integer,
  })

  const _ = require ('../sanctuary') ([$Element])

  // ∷ Triple → Element
  const tripleToElement = _.D.def (
    'tripleToElement',
    {},
    [$Triple, $Element],
    triple (
      name =>
        symbol =>
          atomicNumber =>
            Element.from ({ name, symbol, atomicNumber }))
  )

  // ∷ Element → Triple
  const elementToTriple = _.D.def (
    'elementToTriple',
    {},
    [$Element, $Triple],
    ({
      name,
      symbol,
      atomicNumber,
    }) => Triple (name) (symbol) (atomicNumber),
  )

  const h = Element.from ({
    name: 'Hydrogen',
    symbol: 'H',
    atomicNumber: 1,
  })

  console.log ('')
  console.log (`
    tripleToElement (${show2 (he)}) === ` + show2 (
    tripleToElement (he)
  ))
  console.log (`
    elementToTriple (${show2 (h)}) === ` + show2 (
    elementToTriple (h)
  ))

  // ∷ Element → Boolean
  const startsWithSymbolRec = S.compose (startsWithSymbol) (elementToTriple)

  console.log ('')
  console.log (`
    h === ${show2 (h)}`
  )
  console.log (`
    startsWithSymbolRec (h) === ${startsWithSymbolRec (h)}`
  )
}) ()

;(function SumTypes () {
  console.log ('')
  console.log ('@SumTypes')

  const OneOfThree = daggy.taggedSum ('OneOfThree', {
    Sinistral: ['value'],
    Midial: ['value'],
    Dextral: ['value'],
  })

  OneOfThree.prototype['@@show'] = function () {
    return this.cata ({
      Sinistral: x => `Sinistral (${show (x)})`,
      Midial: x => `Midial (${show (x)})`,
      Dextral: x => `Dextral (${show (x)})`,
    })
  }

  const { Sinistral } = OneOfThree

  console.log ('')
  console.log (`
    Sinistral (1) === ` + show (
    Sinistral (1)
  ))

  /* List */

  const list1 = List.from ([1, 2, 3])
  const list2 = List.from ([])

  console.log ('')
  console.log (`
    S.tail (${show (list1)}) === ${show (S.tail (list1))}
    S.tail (${show (list2)}) === ${show (S.tail (list2))}
  `)
}) ()

;(function AlgebraOfTypes () {
  console.log ('')
  console.log ('AlgebraOfTypes')

  const a = $.TypeVariable ('a')
  const b = $.TypeVariable ('b')
  const c = $.TypeVariable ('c')

  const $Prod = $.Pair (a) ($.Either (b) (c))
  const $Sum = $.Either ($.Pair (a) (b)) ($.Pair (a) (c))

  // const B = S.compose

  // ∷ (a,b|c) → (a,b)|(a,c)
  const prodToSum = D.def (
    'prodToSum',
    {},
    [$Prod, $Sum],
    S.sequence (S.Either),
  )

  // ∷  (a,b)|(a,c) → (a,b|c)
  const sumToProd = D.def (
    'sumToProd',
    {},
    [$Sum, $Prod],
    S.either (S.map (S.Left)) (S.map (S.Right)),
  )

  const value = S.Pair (1) (S.Right ('foo'))

  console.log ('')
  console.log (`
    prodToSum ${show (value)} === ${show (prodToSum (value))}
    sumToProd (prodToSum) ${show (value)} === ${show (sumToProd (prodToSum (value)))}
  `)
}) ()
