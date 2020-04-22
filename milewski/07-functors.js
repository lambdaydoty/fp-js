/* eslint func-call-spacing: ["error", "always"] */
const { Z, type, show, daggy, $, uncurry, S } = require ('../sanctuary')
const R = require ('ramda')

;(function TypeClass () {
  const a = $.TypeVariable ('a')

  const pointIndentifier = 'jws/Point'

  const $Point = uncurry ($.BinaryType) (
    'Point',
    'http://',
    [],
    x => type (x) === pointIndentifier,
    ({ x, y }) => [x],
    ({ x, y }) => [y],
  )

  const def2 = $.create ({
    checkTypes: true,
    env: $.env.concat ([$Point ($.Unknown) ($.Unknown)]),
  })

  const _Point = daggy.tagged ('Point', ['x', 'y'])

  _Point.prototype['@@type'] = pointIndentifier
  _Point.prototype['@@show'] = function () {
    return `Point (${show (this.x)}) (${show (this.y)})`
  }

  const Point = uncurry (def2) (
    'Point',
    { a: [Z.Setoid] },
    [a, a, $Point (a) (a)],
    x =>
      y =>
        _Point.from ({ x, y }),
  )

  console.log (show (Point (1.1) (2.2)))
  console.log (R.tryCatch (() => Point (1.1) ('hello'), () => 'catched!') ())

  const S2 = S.create ({
    checkTypes: true,
    env: S.env.concat ([$Point ($.Unknown) ($.Unknown)]),
  })

  // Setoid a => a ~> a -> Boolean
  _Point.prototype['fantasy-land/equals'] = function (that) {
    return (
      S.equals (this.x) (that.x) &&
      S.equals (this.y) (that.y)
    )
  }

  console.log (
    S2.equals (
      Point (1.1) (2.2)
    ) (
      Point (1.1) (2.2)
    )
  )
}) ()
