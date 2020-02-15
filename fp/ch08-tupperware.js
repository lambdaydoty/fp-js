/* eslint func-call-spacing: ["error", "never"] */
const { create, env } = require('sanctuary')
const { env: flutureEnv } = require('fluture-sanctuary-types')
const S = create({ checkTypes: true, env: env.concat(flutureEnv) })
const { map, pipe, toUpper } = S

const Future = require('fluture')
const { fork } = Future

// console.log(S.Just('do it!'))
// console.log(S.head([]),)
// console.log(
//   S.head([1, 2, 3]),
//   S.fromMaybe(0)(S.head([1, 2, 3])),
//   S.fromMaybe(0)(S.head([])),
// )

function BasicFuture () {
  // const fu = Future((reject, resolve) => {
  //   const t = setTimeout(resolve, 1000, 'done')
  //   return () => clearTimeout(t)
  // })
  // const fu = resolve('cc')

  const fs = require('fs')

  // readFile :: String -> Future Error String
  const readFile = name => Future.node(done => fs.readFile(name, 'utf8', done))

  const task = pipe([
    readFile,
    map(toUpper),
  ])('./sanc.js')

  fork(console.error)(console.log)(task)
}

BasicFuture()

function BasicIO () {
  const IO = function (f) {
    this.__value = f
    this.unsafeRun = f
  }

  IO.of = function (x) {
    return new IO(() => x)
  }

  IO.prototype.map = function (f) {
    return new IO(x => f(this.__value(x)))
  }

  const timingIO = new IO(() => Date.now())

  timingIO
    .map(x => x.toString())
    .map(s => `It is ${s}, now`)
    .map(console.log)
    .unsafeRun()
}

function BasicContainer () {
  const Container = function (v) {
    this.__value = v
  }

  Container.prototype.toString = function () {
    return `Container(${this.__value.toString()})`
  }

  Container.prototype.map = function (fn) {
    const x = this.__value
    return Container.of(fn(x))
  }

  Container.of = v => new Container(v)

  const passenger = name => ({
    name,
    toString () {
      return `Passenger(${this.name})`
    },
  })

  console.log(
    Container.of(3)
      .map(x => x * x)
      .toString(),
  )
  console.log(
    Container.of(Container.of([1, 2, 3]))
      .toString(),
  )

  console.log(
    Container.of(passenger('Rose'))
      .map(p => passenger(`${p.name} Dawson`))
      .toString(),
  )
}

module.exports = { BasicContainer, BasicIO }
