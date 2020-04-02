/* eslint func-call-spacing: ["error", "never"] */
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

  console.log(b2, logger2)
})()

;(function () {
  console.log('')
  console.log('@Pure-composable (Simulate Writer Monad by `fish` and [,])')

  const negate = b => {
    return [!b, 'Not so! ']
  }

  const fish = f => g => x => {
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

  function Writer (value, log) {
    this.value = value
    this.log = log
  }

  Writer.of = function (value) {
    return new Writer(value, '')
  }

  Writer.prototype.chain = function (fn) {
    const { value: value1, log: log1 } = this
    const { value: value2, log: log2 } = fn(value1)
    return new Writer(value2, log1 + log2)
  }

  Writer.prototype.map = function (fn) {
    const { value, log } = this
    return new Writer(fn(value), log)
  }

  // Writer.prototype['fantasy-land/map'] = Writer.prototype.map

  const negate = b => new Writer(!b, 'Not so! ')

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

  const { Writer, WriterType } = require('../Writer')
  const { show, create, env } = require('sanctuary')
  const $ = require('sanctuary-def')
  const S = create({
    checkTypes: true,
    env: env.concat([WriterType($.Unknown)]),
  })

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
  console.log('@sanctuary')

  const { Writer, WriterType } = require('../Writer')
  const { show, create, env } = require('sanctuary')
  const $ = require('sanctuary-def')
  const S = create({
    checkTypes: true,
    env: env.concat([WriterType($.Integer)]),
  })

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
