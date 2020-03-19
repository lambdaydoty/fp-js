const Identity = value => ({
  _value: value, // for demo's sake

  map: fn => Identity(fn(value)), // functor!
  valueOf: () => value,
  toString: () => `Identity(${value})`,
  [Symbol.iterator]: function * () {
    yield value
  },
  constructor: Identity,
})

// static
Object.assign(Identity, {
  toString: () => `Identity`,
  is: x => typeof x.map === 'function',
})

module.exports = Identity
