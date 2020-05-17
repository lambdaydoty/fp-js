/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { type, daggy, show, D, $ } = require ('../sanctuary') ()

; (function () {
  console.log ('')
  console.log ('@Side-effect')

  let logger = ''

  const negate = b => {
    logger += 'Not so! '
    return !b
  }

  console.log ('')
  console.log ({ logger })
  console.log (`negate (true) === ${negate (true)}`)
  console.log ({ logger })
  console.log (`negate (false) === ${negate (false)}`)
  console.log ({ logger })
}) ()

; (function () {
  console.log ('')
  console.log ('@Pure')

  // ∷ Tuple Bool String → Tuple Bool String
  const negate = (b, logger) => {
    return [!b, logger + 'Not so! ']
  }

  const [b1, logger1] = negate (true, '')
  const [b2, logger2] = negate (b1, logger1)

  console.log ('')
  console.log (`negate (true, '') === ${[b1, logger1]}`)
  console.log (`negate (${b1}, ${logger1}) === ${[b2, logger2]}`)
}) ()

; (function () {
  console.log ('')
  console.log ('@Purely-composable (Do Writer Monad by `fish` and [_,String])')

  // ∷ Bool → Tuple Bool String
  const negate = b => {
    return [!b, 'Not so! ']
  }

  const fish =
    f =>       // ∷ a → Tuple b String
      g =>     // ∷ b → Tuple c String
        x => { // ∷ a → Tuple c String
          const [y, logger1] = g (x)
          const [z, logger2] = f (y)
          return [z, logger1 + logger2]
        }

  const [result, logger] = fish (negate) (negate) (true)

  console.log ('')
  console.log (`
    fish (negate) (negate) (true) === ` + show (
    [result, logger]
  ))
}) ()

; (function () {
  console.log ('')
  console.log ('@Pure-composable (Writer Monad w. negate)')

  const { Writer, $Writer } = writer ()

  // ∷ Bool → Writer Bool
  const negate = D.def (
    'negate',
    {},
    [$.Boolean, $Writer ($.Boolean)],
    b => Writer ('Not so! ') (!b),
  )

  const { S } = require ('../sanctuary') ([$Writer ($.Unknown)])

  console.log (`
    S.pipe ([
      S.chain (negate),
      S.chain (negate),
      S.chain (negate),
      S.map (bool => String (bool)),
    ]) (S.of (Writer) (true)) ` + '=== ' + show (
    S.pipe ([
      S.chain (negate),
      S.chain (negate),
      S.chain (negate),
    ]) (S.of (Writer) (true))
  ))
}) ()

; (function () {
  console.log ('')
  console.log ('@Pure-composable (Writer Monad w. toUpper, words)')

  const { $Writer, Writer } = writer ()
  const { $ } = require ('../sanctuary') ()
  const { S } = require ('../sanctuary') ([$Writer ($.Unknown)])

  // ∷ String → Writer String
  const toUpper = D.def (
    'toUpper',
    {},
    [$.String, $Writer ($.String)],
    s => Writer ('toUpperCase () ') (s.toUpperCase ()),
  )

  // ∷ String → Writer [String]
  const toWords = D.def (
    'toWords',
    {},
    [$.String, $Writer ($.Array ($.String))],
    s => Writer (`toWords () `) (s.split (' '))
  )

  // chain ∷ (a → m b) → m a → m b
  // of ∷ a → m a
  // ∷ (a → m b) → (b → m c) → (a → m c)
  const fish =
    f =>
      g =>
        S.pipe ([
          S.of (Writer), // ∷ m a
          S.chain (f),   // ∷ m b
          S.chain (g),   // ∷ m c
        ])

  console.log ('')
  console.log (`
    fish (toUpper) (toWords) ('hello, world!')` + ' === ' + show (
    fish (toUpper) (toWords) ('hello, world!')
  ))
}) ()

function writer () {
  const { S, curryN } = require ('../sanctuary') ()

  const chain = 'fantasy-land/chain'
  const map = 'fantasy-land/map'
  const ap = 'fantasy-land/ap'
  const of_ = 'fantasy-land/of'

  const writerTypeIdent = 'jws/Writer/1' // type identifier
  const a = $.TypeVariable ('a') // type variable

  // type constructor
  // ∷ a → Writer a
  const $Writer = D.UnaryType (
    '$Writer',
    'http://',
    [],
    x => type (x) === writerTypeIdent,
    w => [w.val],
  )

  // data constructor
  const Writer_ = daggy.tagged ('Writer', [
    'log',
    'val',
  ])

  // data constructor
  // ∷ TypeRep Writer
  // ∷ String → a → Writer a
  const Writer = D.def (
    'Writer',
    {},
    [$.String, a, $Writer (a)],
    curryN (2) (Writer_),
  )

  const Writer$prototype = {
    constructor: Writer,
    '@@type': writerTypeIdent,
    '@@show': function () {
      const log = show (this.log)
      const val = show (this.val)
      return `Writer (${log}) (${val})`
    },

    [require ('util').inspect.custom]: function () {
      return show (this)
    },

    [chain]: function (fn) {
      const { log: log1, val: val1 } = this
      const { log: log2, val: val2 } = fn (val1)
      return Writer (S.concat (log1) (log2)) (val2)
    },

    [map]: function (fn) {
      const { log, val } = this
      return Writer (log) (fn (val))
    },

    [ap]: function (fn) {
      // TODO
    },
  }

  const WriterTypeRepresentative = {
    [of_]: x => Writer ('') (x),
  }

  Object.assign (Writer_.prototype, Writer$prototype)
  Object.assign (Writer, WriterTypeRepresentative)

  return {
    $Writer,
    Writer,
  }
}
