const daggy = require('daggy')

const List = daggy.taggedSum(
  'List',
  {
    Cons: ['x', 'xs'],
    Nil: [],
  },
)

List.prototype.map = function (f) {
  return this.cata({
    Cons: (x, xs) => List.Cons(f(x), xs.map(f)),
    Nil: () => List.Nil,
  })
}

List.prototype.filter = function (pred) {
  return this.cata({
    Cons: (x, xs) =>
      pred(x) ? List.Cons(x, xs.filter(pred))
        /* otherwise */ : xs.filter(pred),
    Nil: () => List.Nil,
  })
}

List.prototype.reduce = function (op, e) {
  return this.cata({
    Cons: (x, xs) => op(x)(xs.reduce(op, e)),
    Nil: () => e,
  })
}

// static method :: Array -> List
List.from = xs => xs.reduceRight(
  (acc, x) => List.Cons(x, acc),
  List.Nil,
)

List.prototype.toArray = function () {
  return this.cata({
    Cons: (x, xs) => [x, ...xs.toArray()],
    Nil: () => [],
  })
}

console.log(
  List.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .filter(x => x % 2 === 0)
    .reduce(x => y => x + y, 0)
)

console.log(
  List.from(['x', 'y', 'z'])
    .map(x => x.toUpperCase())
    .toArray(),
)
