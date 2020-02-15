/* eslint func-call-spacing: ["error", "always"] */
const $ = require ('sanctuary-def')
const { create, env } = require ('sanctuary')
const { env: flutureEnv } = require ('fluture-sanctuary-types')
const S = create ({ checkTypes: true, env: env.concat (flutureEnv) })
const { chain, pipe, map, is, get } = S
const tap = f => x => (f (x), x) // eslint-disable-line no-sequences
// const Future = require ('fluture')
// const { fork } = Future

BasicMonad ()

function BasicMonad () {
  const { head: safeHead } = S
  const getArrayOfObj = prop => get (is ($.Array ($.Object))) (prop)
  const getObj = prop => get (is ($.Object)) (prop)

  console.log ('')
  console.log ('@Just-to-the-deep..')
  const firstAddressStreet = pipe ([
    getArrayOfObj ('addresses'),
    tap (console.log),
    map (safeHead),
    tap (console.log),
    map (map (getObj ('street'))),
  ])

  const test0 = {
    addresses: [
      {
        street: { name: 'Mulburry', number: 8402 },
      },
      {
        postcode: 'WC2N',
      },
    ],
  }

  console.log (
    firstAddressStreet (test0)
  )

  console.log ('')
  console.log ('@Introduce-chain')

  const firstAddressStreet2 = pipe ([
    getArrayOfObj ('addresses'),
    tap (console.log),
    chain (safeHead),
    tap (console.log),
    chain (getObj ('street')),
  ])

  console.log (
    firstAddressStreet2 (test0)
  )
}
