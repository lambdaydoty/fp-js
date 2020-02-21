
const {
  S: { lift2 },
  F: { fork, resolve },
} = require('./sanc-boilerplate')

fork(
  console.error
)(
  console.log
)(
  lift2(
    x => y => x + y
  )(
    resolve('Hello, ')
  )(
    resolve('world!')
  )
)
