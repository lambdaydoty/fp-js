const util = require('util')
const { type, show, $, S: _S, uncurry } = require('./sanctuary')()

const writerTypeIdent = 'jws/Writer@1'

const $Writer = uncurry($.UnaryType)(
  'Writer',
  'http://',
  [],
  x => type(x) === writerTypeIdent,
  writer => [writer.val],
)

const S = _S.create({
  checkTypes: true,
  env: $.env.concat([$Writer($.Unknown)]),
})

const def = $.create({
  checkTypes: true,
  env: $.env.concat([$Writer($.Unknown)]),
})

const a = $.TypeVariable('a')

// :: String -> a -> Writer a
const Writer = uncurry(def)(
  'Writer',
  {},
  [$.String, a, $Writer(a)],
  log =>
    val => Object.assign(
      Object.create(Writer$prototype),
      { log, val }, // use POJO
    ),
)

Writer['fantasy-land/of'] =
  x =>
    Writer('')(x)

const Writer$prototype = {
  '@@type': writerTypeIdent,
  '@@show': function () {
    const _log = show(this.log)
    const _val = show(this.val)
    return `Writer (${_log}) (${_val})`
  },

  [util.inspect.custom]: function () { return show(this) },

  'fantasy-land/map': function (f) {
    return Writer(this.log)(f(this.val))
  },
  'fantasy-land/ap': function (f) {
    // TODO
  },
  'fantasy-land/chain': function (f) {
    const { log, val } = f(this.val)
    return Writer(this.log + log)(val)
  },

  constructor: Writer,
}

module.exports = { type, show, $Writer, Writer, def, S, $, uncurry }
