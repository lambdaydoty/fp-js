const R = require('ramda')
const {
  map,
  of,
  chain,
  apply,
  toPairs,
  pipe,
  xprod,
  o,
  flatten,
} = R

const wrapper = o(flatten, of) // x -> [x] | x

const test0 = {
  a: [1, 2, 3],
  b: [4, 5],
}

// { a: [1, 2, 3], b: [4, 5] }
// -> [[a, [1, 2, 3]], [b, [4, 5]]]
// -> [[[a], [1, 2, 3]], [[b], [4, 5]]]
// -> [[a, 1], [a, 2], [a, 3], [b, 4], [b, 5]]
const result = pipe(
  toPairs,
  map(map(wrapper)),
  chain(apply(xprod)),
)(test0)
console.log(result)
// [['a', 1], ['a', 2], ['a', 3], ['b', 4], ['b', 5]]

const inc = x => x + 1
const square = x => x * x
const add = x => y => x + y
const copy = x => [x, x]
console.log('')
console.log('@chain: a better explaination')
console.log('')
console.log('map :     Functor f  => (a -> b) -> f a -> f b')
console.log('map : (f == Array)    : (a -> b) -> [a] -> [b]')
console.log('map : (f == (->) c _) : (a -> b) -> (c -> a) -> (c -> b)')
console.log('map(square)([1, 2, 3, 4]) ===', map(square)([1, 2, 3, 4]))
console.log('map(square)(inc) === x => square(inc(x))', 10, map(square)(inc)(10))
console.log('')
console.log('chain :      Chain m   => (a -> m b) -> m a -> m b')
console.log('chain : (m == Array)    : (a -> [b]) -> [a] -> [b]')
console.log('chain : (f == (->) c _) : (a -> c -> b) -> (c -> a) -> (c -> b)')
console.log('chain(copy)([1, 2, 3, 4]) ===', chain(copy)([1, 2, 3, 4]))
console.log('chain(add)(square) === x => add(square(x))(x)', 10, chain(add)(square)(10))
console.log('chain(append)(head) === x => append(head(x))(x)', [1, 2, 3], chain(R.append)(R.head)([1, 2, 3]))
console.log('@^^note: actually the docuemnt example use lists but chain in this case has nothing special to do with a list!')

;(() => {
  console.log('')
  console.log('@Sanctuary')
  const { create, env } = require('sanctuary')
  const S = create({ checkTypes: true, env })
  const _S = create({ checkTypes: false, env })
  const { pipe, pair, pairs, fst, snd, map, mapLeft, of, lift2, Pair } = S
  const { ap: _ap } = _S

  // x -> [x]
  const wrap = of(Array)
  // [x] -> [y] -> [[x,y]]
  const xprod = lift2(Pair)
  // (a,b) -> [a,b]
  const _pairToArray = _ap([fst, snd]) // dealt with `heterogeneous array`

  // method 1
  pipe([
    pairs, // { k: v } -> [[k,v]]
    map(mapLeft(wrap)),
    chain(pair(xprod)),
    map(wrap),
    map(_pairToArray),
    console.log,
  ])(test0)

  // method 2
  pipe([
    pairs,
    map(mapLeft(Pair)),
    chain(pair(map)),
    map(wrap),
    map(_pairToArray),
    console.log,
  ])(test0)
})()
