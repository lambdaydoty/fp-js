/* eslint func-call-spacing: ["error", "always"] */
const { S, F } = require ('./sanctuary')

const tasks = [
  F.resolve ('resolved with 1'),
  F.resolve ('resolved with 2'),
  F.reject ('rejected with 3!'),
  F.resolve ('resolved with 4'),
]

const app = S.pipe ([
  S.map (F.coalesce (S.I) (S.I)), // :: Array (Future e a)
  F.parallel (Infinity), // :: Future e (Array a)
]) (tasks)

F.fork (console.error) (console.log) (app)

/**
 * ref:
 *  https://github.com/fluture-js/Fluture#parallel
 */
