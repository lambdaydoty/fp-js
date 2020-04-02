const { type, show, uncurry, S, $, $Writer, Writer, def } = require('../Writer')

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

console.log(show(x))
console.log(type(x))
console.log('')

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

console.log(show(w))
console.log(type(w))
