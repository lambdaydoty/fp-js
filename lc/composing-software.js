const { pipe } = require('ramda')

/**
 *
 * 1) pure functions ->
 * 2) factories -> (a non-class, non-constructor function that returns a (new) object)
 * 3) functional mixins ->
 * 4) classes
 */

/* pure functions */
const double = x => x * 2
const time = () => Date.now()
const loop = (run = 100000) => { for (let i = 0; i < run; i++); }

console.log('')
console.log('@pure')
console.log(Math.max(2, 5, 8), Math.max(2, 5, 8))
console.log(double(2), double(2))

console.log('')
console.log('@impure')
console.log(Math.random(), Math.random())
console.log(time(), loop(), time())

/* factories */
const createUser = (name = '', phone = 123) => ({
  name,
  phone,
  salute () { return `Hello, ${this.name}` },
  setPhone (num) { this.phone = num; return this },
  getPhone () { return this.phone },
})

console.log('')
console.log('@literals for one')
console.log({ name: 'alice', phone: 111 })

console.log('')
console.log('@factories for many')
console.log(createUser('alice', 111), createUser('bob', 222))
console.log(
  createUser('carol', 333).salute(),
  createUser('carol', 333)
    .setPhone(444)
    .setPhone(555)
    .getPhone(),
)

console.log('')
console.log('@factories: Symbol()')
console.log(Symbol('description'))

console.log('')
console.log('@factories: Array.from(arrayLike, mapper)')
console.log(Array.from({ length: 5 }, (_, i) => i))

/* functional mixins */
// https://raganwald.com/2015/06/17/functional-mixins.html
// https://medium.com/javascript-scene/functional-mixins-composing-software-ffb66d5e731c
const isFlying = Symbol('isFlying')
// const flying = () => o => Object.assign({}, o, {
//   [isFlying]: false,

//   fly () {
//     this[isFlying] = true
//     return this
//   },

//   land () {
//     this[isFlying] = false
//     return this
//   },

//   isFlying () {
//     return this[isFlying]
//   },
// })

// const quacking = quack => o => Object.assign({}, o, {
//   quack: () => quack,
// })

const flying = () => o => ({
  ...o,
  [isFlying]: false,
  fly () {
    this[isFlying] = true
    return this
  },
  land () {
    this[isFlying] = false
    return this
  },
  isFlying () {
    return this[isFlying]
  },
})

const quacking = quack => o => ({
  ...o,
  quack: () => quack,
})

const bird = flying()({})
const duck = pipe(
  flying(),
  quacking('Quack!'),
)({})

console.log('')
console.log('@mixins')
console.log({ bird })
console.log({ bird: bird.fly() })
console.log({ duck }, duck.quack())
