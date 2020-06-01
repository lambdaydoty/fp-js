/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { D, $, daggy, show, Z, S } = require ('../sanctuary') ()

;(function TypeClass () {
  console.log ('')
  console.log ('TypeClass')

  const a = $.TypeVariable ('a')

  const Point_ = daggy.tagged ('Point', ['x', 'y'])

  Object.assign (Point_.prototype, {
    '@@show' () {
      return `Point (${show (this.x)}) (${show (this.y)})`
    },
    'fantasy-land/equals' (that) {
      return (
        S.equals (this.x) (that.x) &&
        S.equals (this.y) (that.y)
      )
    },
    'fantasy-land/map' (fn) {
      return Point_.from ({
        x: this.x,
        y: fn (this.y),
      })
    },
  })

  const $Point = D.BinaryType (
    'Point',
    'http://',
    [],
    x => Point_.is (x),
    ({ x, y }) => [x],
    ({ x, y }) => [y],
  )

  const Point = D.def (
    'Point',
    { a: [Z.Setoid] },
    [a, a, $Point (a) (a)],
    x =>
      y =>
        Point_.from ({ x, y }),
  )

  console.log ('')
  console.log (show (Point (1.1) (2.2)))
  console.log ((_ => {
    try {
      return Point (1) ('hello')
    } catch (e) {
      return 'catched!'
    }
  }) ())

  console.log (`
  S.equals (Point (1.1) (2.2)) (Point (1.1) (2.2)) === ${
  S.equals (Point (1.1) (2.2)) (Point (1.1) (2.2))
  }`)

  console.log (`
  S.map (x => -x) (Point (1.1) (2.2)) === ${
  S.map (x => -x) (Point (1.1) (2.2))
  }`)
}) ()

;(function List () {
  console.log ('')
  console.log ('List')

  const { List } = require ('../sanctuary') ()

  console.log ('')
  console.log (`
    List.from ([1, 2, 3, 4]) === ${show (
    List.from ([1, 2, 3, 4])
  )}`)

  const list = List.from ([1, 2, 3, 4])

  console.log ('')
  console.log (`
    S.map (x => x * x) ${show (list)} === ${show (
    S.map (x => x * x) (list)
  )}`)
}) ()

;(function Reader () {
  console.log ('')
  console.log ('Reader')

  const { Reader } = require ('../sanctuary/types')

  process.env.KEY = 'secret'

  const r = S.pipe ([
    S.unchecked.map (S.toUpper),
    S.unchecked.map (S.concat ('PREFIX ')),
  ]) (Reader (x => x.KEY))

  console.log (`
    ${show (r)}.run (process.env) === ${
    r.run (process.env)
  }
  `)
}) ()

;(function FunctorComposition () {
  console.log ('')
  console.log ('FunctorComposition')

  const { List, $List, $ } = require ('../sanctuary') ()
  const { D, S } = require ('../sanctuary') ([$List ($.Unknown)])

  const a = $.TypeVariable ('a')

  const maybeTail = D.def (
    'maybeTail',
    {},
    [$List (a), $.Maybe ($List (a))],
    l => l.cata ({
      Nil: _ => S.Nothing,
      Cons: (x, xs) => S.Just (xs),
    })
  )

  const list = List.from ([1, 2, 3])

  console.log (`
    maybeTail ${show (list)} === ${show (
    maybeTail (list)
  )}
  `)

  const mis = S.Just (list)

  console.log (`
    S.map (S.map (x => x * x)) (${show (mis)}) === ${show (
    S.map (S.map (x => x * x)) (mis)
  )}
  `)

  console.log (`
    S.compose (S.map) (S.map) (x => x * x) (${show (mis)}) === ${show (
    S.compose (S.map) (S.map) (x => x * x) (mis)
  )}
  `)
}) ()
