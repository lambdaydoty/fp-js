
const { S, daggy } = require('../sanctuary')()

const dispatch =
  key =>
    S.prop(key)({
      warn: S.toUpper,
      info: S.I,
      log: S.toLower,
    })

console.log(
  dispatch('warn')('Emergency here!'),
  dispatch('log')('Just log something'),
  // dispatch('foo')('Hello?'),
)

const D = daggy.taggedSum('Dispatcher', {
  Pair: ['x', 'y'],
  Cons: ['x', 'xs'],
  String: ['s'],
  Number: ['n'],
})

const dispatch2 =
  value =>
    value.cata({
      Pair: (x, y) => S.Pair(x)(y),
      Cons: (x, xs) => [x, ...xs],
      String: S.toUpper,
      Number: S.add(1),
    })

console.log('')
console.log(
  dispatch2(D.Pair(3, 4)),
  dispatch2(D.Cons(3, [4, 5, 6, 7])),
  dispatch2(D.String('hello')),
  dispatch2(D.Number(100)),
)
