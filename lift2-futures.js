
const { S, F } = require('./sanc')
const { uncurry } = require('./sak')

uncurry(F.fork)(
  console.error,
  console.log,
  uncurry(S.lift2)(
    x => y => x + y,
    F.resolve('Hello, '),
    F.resolve('world!'),
  ),
)
