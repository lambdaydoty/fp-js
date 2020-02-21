/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true  }] */
const { $, S, U, F, FT, def } = require('../sanc-boilerplate')
const { pipe, map, chain, filter } = S
const { encaseP, parallel, fork } = F
const { uncurry } = U
const log = x => y => console.log(x, y)

const txs = [
  { id: 1, data: 'foo' },
  { id: 2, data: 'bar' },
]

//    getReceipts :: Array Trx -> Promise (Array Receipt)
const getReceipts = txs => Promise.resolve(txs.map(tx => ({ ...tx, receipt: 'yes' })))

//    decode :: Receipt -> Promise Receipt
const decode = receipt => Promise.resolve({ ...receipt, decoded: 'yes' })

const isTransfer = () => true

//    logToTx :: Log -> Trx
const logToTx = log => ({ ...log, logToTx: 'yes' })

const task = uncurry(def)([
  'task',
  {},
  [$.Array($.Object), FT.FutureType($.String)($.Array($.Object))],
  pipe([
    encaseP(getReceipts),      // :: Future e (Array Receipt)
    map(map(encaseP(decode))), // :: Future e (Array (Future e Receipt))
    chain(parallel(2)),        // :: Future e (Array Receipt)
    map(filter(isTransfer)),   // :: Future e (Array Receipt)
    map(map(logToTx)),         // :: Future e (Array Trx)
  ]),
])

console.log('')
console.log('@future')

uncurry(fork)([
  log('rejected\n'),
  log('resolved\n'),
  task(txs),
])
// => resolved
//    [
//      { id: 1, data: 'foo', receipt: 'yes', ... },
//      { id: 2, data: 'bar', receipt: 'yes', ... },
//    ]
