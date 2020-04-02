const { S, daggy, type, show, $, uncurry, def } = require('../sanc')

const fst = uncurry(def)(
  'fst',
  {},
  [$.Pair($.Integer)($.Boolean), $.Integer],
  pair => S.fst(pair),
)

const p = S.Pair(123)(true)

console.log(p)
console.log(fst(p))
