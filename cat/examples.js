const { tap, compose } = require('ramda')

// async function getTransactionById (id = '') {}
// async function isConfirmed (trx = {}) {}

async function getTransactionById (id = '') {
  return id === '1234567'
    ? Promise.resolve({ id, block_num: 1, hex: '000000000000000000000' })
    : undefined
}

async function isConfirmed ({ id, block_num: n, hex }) {
  return Promise.resolve(n > 0)
}

const trace = (label = ':)') => value => console.log(`${label}: ${value}`)

const composeM = method => (...ms) => ms.reduce((f, g) => x => g(x)[method](f))
const composePromise = composeM('then')

const confirm = composePromise(tap(trace()), isConfirmed, getTransactionById)

confirm('1234567')
