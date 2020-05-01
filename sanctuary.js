/* eslint func-call-spacing: ["error", "always"] */
const S = require ('sanctuary')
const $ = require ('sanctuary-def')
const F = require ('fluture')
const F$ = require ('fluture-sanctuary-types')
const Z = require ('sanctuary-type-classes')
const show = require ('sanctuary-show')
const type = require ('sanctuary-type-identifiers')
const daggy = require ('daggy')

const env0 = [
  ...S.env,
  ...F$.env,
]

// :: a -> Maybe b -> Future a b
const maybeToFuture =
  a =>
    S.maybe (F.reject (a)) (F.resolve)

// :: Etiher a b -> Future a b
const eitherToFuture =
  S.either (F.reject) (F.resolve)

module.exports =
  (env = [/* types */]) =>
    ({
      Z,
      $,
      F,
      F$,
      S: S.create ({ checkTypes: true, env: [ ...env, ...env0 ] }),
      def: $.create ({ checkTypes: true, env: [ ...env, ...env0 ] }),
      _S: S.create ({ checkTypes: false, env: [ ...env, ...env0 ] }),
      show,
      type,
      daggy,
      ...{
        maybeToFuture,
        eitherToFuture,
      },
      ...require ('./curry'),
    })
