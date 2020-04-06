;(function () {
  console.log('')
  console.log('@Side-effect')

  let logger = ''

  const negate = b => {
    logger += 'Not so! '
    return !b
  }

  negate(true)
  negate(true)
  negate(false)

  console.log(logger)
})()

;(function () {
  console.log('')
  console.log('@Pure')

  const negate = (b, logger) => {
    return [!b, logger + 'Not so! ']
  }

  const [b1, logger1] = negate(true, '')
  const [b2, logger2] = negate(b1, logger1)

  console.log([b2, logger2])
})()

;(function () {
  console.log('')
  console.log('@Pure-composable (Simulate Writer Monad by `fish` and [,])')

  const negate = b => {
    return [!b, 'Not so! ']
  }

  const fish =
    f =>
      g =>
        x => {
          const [y, logger1] = g(x)
          const [z, logger2] = f(y)
          return [z, logger1 + logger2]
        }

  const [result, logger] = fish(negate)(negate)(true)

  console.log([result, logger])
})()

;(function () {
  console.log('')
  console.log('@Pure-composable (Writer Monad Type)')

  function Writer (log, val) {
    this.log = log
    this.val = val
  }

  Writer.of = function (x) {
    return new Writer('', x)
  }

  Writer.prototype.chain = function (fn) {
    const { log: log1, value: value1 } = this
    const { log: log2, value: value2 } = fn(value1)
    return new Writer(log1 + log2, value2)
  }

  Writer.prototype.map = function (fn) {
    const { log, val } = this
    return new Writer(log, fn(val))
  }

  const negate = b => new Writer('Not so! ', !b)

  console.log(
    negate(true)
      .chain(negate)
      .chain(negate)
      .map(bool => String(bool))
  )

  console.log('')
  console.log('@ramda')

  const R = require('ramda')

  console.log(
    R.pipe(
      R.chain(negate),
      R.chain(negate),
      R.chain(negate),
      R.map(bool => String(bool)),
    )(Writer.of(true))
  )
})()

;(function () {
  console.log('')
  console.log('@sanctuary')

  const { Writer, show, S } = require('../Writer')

  const negate = b => Writer('Not so! ')(!b)

  console.log(
    S.pipe([
      S.chain(negate),
      S.chain(negate),
      S.map(x => String(x)),
      show,
    ])(negate(true))
  )
})()

;(function () {
  console.log('')
  console.log('@sanctuary2')

  const { Writer, S, show } = require('../Writer')

  const double = b => Writer(`${b} was doubled to ${b * 2}; `)(b * 2)
  const halve = b => Writer(`${b} was halved to ${b / 2}; `)(b / 2)

  console.log(
    S.pipe([
      S.chain(double),
      S.chain(double),
      S.chain(halve),
      show,
    ])(S.of(Writer)(2))
  )
})()

;(function () {
  console.log('')
  console.log('@sanctuary-strict')

  const { uncurry, def, $Writer, $, Writer, S, show, type } = require('../Writer')

  // :: String -> Writer String
  const toUpper = uncurry(def)(
    'toUpper',
    {},
    [
      $.String,
      $Writer($.String),
    ],
    s => Writer('to uppered! ')(s.toUpperCase()),
  )

  // :: String -> String -> Writer String
  const prefix = uncurry(def)(
    'pefix',
    {},
    [
      $.String,
      $.String,
      $Writer($.String),
    ],
    pre =>
      s =>
        Writer(`prefixed with ${pre}`)(pre + s)
  )

  const x = 'world!' // :: String

  console.log('x')
  console.log(show(x))
  console.log(type(x))

  // :: (a -> m b) -> (b -> m c) -> (a -> m c)
  const fish =
    f =>
      g =>
        x => S.pipe([
          S.of(Writer),
          S.chain(f),
          S.chain(g),
        ])(x)

  const w = fish(toUpper)(prefix('Hello '))(x) // :: Writer String

  console.log('w')
  console.log(show(w))
  console.log(type(w))
})()
