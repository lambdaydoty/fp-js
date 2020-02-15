// const R = require('ramda')
// const { pipeWith, andThen, map, filter, flatten } = R

const txs = [
  { id: 1, data: 'foo' },
  { id: 2, data: 'bar' },
]

async function getReceipts (txs) {
  return txs.map(tx => ({ ...tx, receipt: 'yes' }))
}

async function decode (receipt) {
  return ({ ...receipt, decoded: 'yes' })
}

const isTransfer = () => true

function logToTx (log) {
  return ({ ...log, logToTx: 'yes' })
}

// ;(async () => {
//   const receipts = await getReceipts(txs)
//   const logs = await Promise.all(map(decode)(receipts))
//   const decodedTxs = compose(map(logToTx), filter(isTransfer), flatten)(logs)
//   console.log(decodedTxs)
// })()

// pipeWith(andThen)([
//   getReceipts,
//   x => Promise.resolve(map(decode)(x)),
//   x => Promise.all(x),
//   x => Promise.resolve(flatten(x)),
//   x => Promise.resolve(filter(isTransfer)(x)),
//   x => Promise.resolve(map(logToTx)(x)),
//   console.log,
// ])(txs)

console.log('')
console.log('@future')
const { env: flutureEnv, FutureType } = require('fluture-sanctuary-types')
const $ = require('sanctuary-def')
const { create, env } = require('sanctuary')
const S = create({ checkTypes: true, env: env.concat(flutureEnv) })
const { map, filter, pipe } = S
const { chain, parallel, encaseP, fork } = require('fluture')
const def = $.create({ checkTypes: true, env: env.concat(flutureEnv) })

const log = x => y => console.log(x, y)
// const uncurry = f => arr => arr.reduce((p, c) => p(c), f)
// const isNil = x => x == null
// const tap = f => x => (f(x), x) // eslint-disable-line no-sequences
// const trampline = fn => (...args) => {}
// const { isEmpty } = R

// const task = uncurry(def)([
//   'task',
//   {},
//   [$.Array($.Object), FutureType($.String)($.Array($.Object))],
//   pipe([
//     encaseP(getReceipts), // Array Obj -> Future Array Obj
//     map(map(encaseP(decode))), // Future Array Obj -> Future Array Future Obj
//     chain(parallel(2)), // Future Array Future Obj -> Future Array Obj
//     map(filter(isTransfer)), // Future Array Obj -> Future Array Obj
//     map(map(logToTx)), // Future Array Obj -> Future Array Obj
//   ]),
// ])

const task =  pipe([
  encaseP(getReceipts),
  map(map(encaseP(decode))),
  chain(parallel(2)),
  map(filter(isTransfer)),
  map(map(logToTx)),
])

fork(
  log('rejected\n')
)(
  log('resolved\n')
)(
  task(txs)
)
