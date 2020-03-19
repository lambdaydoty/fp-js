const R = require('ramda')
const { add, map, ap, multiply, chain: flatMap } = R

// const flatMap = f => xs => xs.map(f).reduce((x, y) => x.concat(y), [])

const Identity = require('./Identity')
const ifExists = require('./ifExists')

const values = {

  value: add(3)(2),

}

const functors = { // fmap :: (a -> b) -> fa -> fb

  container: [2].map(add(3)), // mappable
  array: [2, 4, 6].map(add(3)), // mappable
  promise: (Promise.resolve(2)).then(add(3)), // thenable
  object: map(add(3))({ value: 2 }), // mappable
  function: map(add(3))(x => x + 2), // composable
  'function(0)': map(add(3))(x => x + 2)(0),
  Identity: Identity(2).map(add(3)),
  ifExists: ifExists(Identity(2)).map(add(3)),
  ifExists_: ifExists(Identity(null)).map(add(3)),

}

const applicatives = {

  'applicatives': '',
  'ap 1x1': ap([ add(3) ])([2]),
  'ap 2x3': ap([ add(3), multiply(3) ])([2, 4, 6]),

}

const monads = {

  flatMap: flatMap(half)([1, 2, 3, 4, 5, 6]),

}

setImmediate(() => console.log({ values }))
setImmediate(() => console.log({ functors }))
setImmediate(() => console.log({ applicatives }))
setImmediate(() => console.log({ monads }))

function half (x) {
  return x % 2 === 0 ? [x / 2] : []
}
