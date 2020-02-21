const daggy = require('daggy')

const Bool = daggy.taggedSum(
  'Bool',
  {
    True: [],
    False: [],
  },
)

const { True, False } = Bool

Bool.prototype.invert = function () {
  return this.cata({
    True: () => False,
    False: () => True,
  })
}

Bool.prototype.thenElse = function (then, _else) {
  return this.cata({
    True: then,
    False: _else,
  })
}

const checkEven = n =>
  (n % 2 === 0) ? True
    : /* otherse */ False

const x = 30
const y = 31

console.log(
  checkEven(x).thenElse(
    () => `${x} is even!`,
    () => `${x} is NOT even!`,
  ),
)

console.log(
  checkEven(y).thenElse(
    () => `${y} is even!`,
    () => `${y} is NOT even!`,
  ),
)
