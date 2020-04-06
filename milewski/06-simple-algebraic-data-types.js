/* eslint func-call-spacing: ["error", "always"] */
const { type, show, daggy, $, def, uncurry, S } = require ('../sanc')

;(function ProductTypes () {
  const p = S.Pair ('foo') (1)
  console.log ('ProductTypes')
  console.log (p)
  console.log (S.swap (p))
  console.log ('')
}) ()

;(function Isomorphic () {
  const a = $.TypeVariable ('a')
  const b = $.TypeVariable ('b')
  const c = $.TypeVariable ('c')
  const $Tripple1 = $.Pair ($.Pair (a) (b)) (c)
  const $Tripple2 = $.Pair (a) ($.Pair (b) (c))

  const alpha = uncurry (def) (
    'alpha',
    {},
    [$Tripple1, $Tripple2],
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

  const alphaInv = uncurry (def) (
    'alphaInv',
    {},
    [$Tripple2, $Tripple1],
    S.pair (
      x =>
        S.pair (
          y =>
            z =>
              S.Pair (S.Pair (x) (y)) (z)

        )
    ),
  )

  const t1 = S.Pair (S.Pair ('foo') (1)) (true) // (('foo', 1), true)

  console.log ('Isomorphic: ( (a, b), c) ~= (a, (b, c))')
  console.log (t1)
  console.log (alpha (t1))
  console.log (alphaInv (alpha (t1)))
  console.log ('')

  const rho = uncurry (def) (
    'rho',
    {},
    [$.Pair (a) ($.Undefined), a],
    S.pair (
      x =>
        y =>
          x
    ),
  )

  const rhoInv = uncurry (def) (
    'rhoInv',
    {},
    [a, $.Pair (a) ($.Undefined)],
    x => S.Pair (x) (undefined),
  )

  const val = S.Pair ('foo') (undefined)

  console.log ('Isomorphic: (a, ()) ~= a')
  console.log (val)
  console.log (rho (val))
  console.log (rhoInv (rho (val)))
  console.log ('')
}) ()

;(function () {
  // S.Pair () () ... the data constructur
  // $.Pair ... the (binary) type constructor

  const stmt = S.Pair ('This statement is') (false)
  const type = $.Pair ($.String) ($.Boolean)

  console.log ('Data Constructor vs. Type Constructor')
  console.log (stmt)
  console.log (S.is (type) (stmt))
  console.log ('')
}) ()

;(function Records () {
  const $Tripple = $.Pair ($.String) ($.Pair ($.String) ($.Integer))

  const Tripple =
    x =>
      y =>
        z =>
          S.Pair (x) (S.Pair (y) (z))

  const startsWithSymbol = uncurry (def) (
    'startsWithSymbol',
    {},
    [$Tripple, $.Boolean],
    S.pair (
      name =>
        S.pair (
          symbol =>
            _ =>
              new RegExp (`^${symbol}`)
                .test (name)
        )
    )
  )

  const he = Tripple ('Helium') ('He') (2)
  console.log ('Records')
  console.log (he, startsWithSymbol (he))

  const Element = daggy.tagged ('Element', [
    'name',
    'symbol',
    'atomicNumber',
  ])

  const $Element = uncurry ($.NullaryType) (
    'Element',
    'http://',
    [],
    ({ name, symbol, atomicNumber }) =>
      S.is ($.String) (name) &&
      S.is ($.String) (symbol) &&
      S.is ($.Integer) (atomicNumber),
  )

  const def2 = $.create ({ checkTypes: true, env: $.env.concat ([$Element]) })

  const trippleToElement = uncurry (def2) (
    'trippleToElement',
    {},
    [$Tripple, $Element],
    S.pair (
      name =>
        S.pair (
          symbol =>
            atomicNumber =>
              Element.from ({ name, symbol, atomicNumber })
        )
    )
  )

  console.log (trippleToElement (he))

  const elementToTripple = uncurry (def2) (
    'elementToTripple',
    {},
    [$Element, $Tripple],
    ({ name, symbol, atomicNumber }) =>
      Tripple (name) (symbol) (atomicNumber),
  )

  const h = Element.from ({
    name: 'Hydrogen',
    symbol: 'H',
    atomicNumber: 1,
  })

  console.log (elementToTripple (h))

  const startsWithSymbol2 = uncurry (def) (
    'startsWithSymbol2',
    {},
    [$Element, $.Boolean],
    ({ name, symbol }) =>
      new RegExp (`^${symbol}`)
        .test (name)
  )

  console.log (h, startsWithSymbol2 (h))
  console.log ('')
}) ()

;(function SumTypes () {
  const OneOfThree = daggy.taggedSum (
    'OneOfThree',
    {
      Sinistral: ['senistral'],
      Mideial: ['midial'],
      Dextral: ['dextral'],
    },
  )

  console.log (OneOfThree)

  /* List of a */

  const List = daggy.taggedSum (
    'List',
    {
      Cons: ['x', 'xs'],
      Nil: [],
    }
  )

  const { Cons, Nil } = List

  const list =
    Cons (
      1,
      Cons (
        2,
        Cons (
          3,
          Cons (
            4,
            Nil,
          )
        )
      )
    )

  List.prototype.reduce = function (op, init) {
    return this.cata ({
      Cons: (x, xs) => op (xs.reduce (op, init), x),
      Nil: () => init,
    })
  }

  console.log (
    list
      .reduce (
        (x, y) => x * y,
        1,
      )
  )

  // static
  List.from =
    array =>
      array.reduceRight (
        (xs, x) =>
          Cons (x, xs),
        Nil,
      )

  console.log (List.from ([4, 3, 2, 1]))

  /* maybeTail */

  const a = $.TypeVariable ('a')

  const listIdent = 'jws/list'

  List.prototype['@@type'] = listIdent
  List.prototype['@@show'] = function () {
    return this.cata ({
      Cons: (x, xs) => `(${x} ${show (xs)})`,
      Nil: () => `nil`,
    })
  }

  const $List = uncurry ($.UnaryType) (
    'List',
    'http://',
    [],
    xs => type (xs) === listIdent,
    xs => xs.cata ({
      Cons: (x, xs) => [x],
      Nil: () => [],
    }),
  )

  const types = [
    $List ($.Unknown),
    $.Maybe ($List ($.Unknown)),
  ]

  const S2 = S.create ({
    checkTypes: true,
    env: S.env.concat (types),
  })

  const def2 = $.create ({
    checkTypes: true,
    env: $.env.concat (types),
  })

  const maybeTail = uncurry (def2) (
    'maybeTail',
    {},
    [$List (a), $.Maybe ($List (a))],
    xs =>
      xs.cata ({
        Cons: (y, ys) => S2.Just (ys),
        Nil: () => S2.Nothing,
      }),
  )

  const xs = List.from ('hello world!'.split (''))
  const ys = List.from ([])

  console.log (maybeTail (xs))
  console.log (maybeTail (ys))
  console.log ('')
}) ()

;(function AlgebraOfTypes () {
  const a = $.TypeVariable ('a')
  const b = $.TypeVariable ('b')
  const c = $.TypeVariable ('c')

  const $Prod = $.Pair (a) ($.Either (b) (c))
  const $Sum = $.Either ($.Pair (a) (b)) ($.Pair (a) (c))

  const prodToSum = uncurry (def) (
    'prodToSum',
    {},
    [$Prod, $Sum],
    S.pair (
      x =>
        S.either (
          y => S.Left (S.Pair (x) (y))
        ) (
          z => S.Right (S.Pair (x) (z))
        )
    )
  )

  const sumToProd = uncurry (def) (
    'sumToProd',
    {},
    [$Sum, $Prod],
    S.either (
      S.pair (
        x =>
          y =>
            S.Pair (x) (S.Left (y))
      )
    ) (
      S.pair (
        x =>
          z =>
            S.Pair (x) (S.Right (z))
      )
    )
  )

  const value = S.Pair (1) (S.Right ('foo'))

  console.log (value)
  console.log (prodToSum (value))
  console.log (sumToProd (prodToSum (value)))
}) ()
