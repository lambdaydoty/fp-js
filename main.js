/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
// const { S, F } = require ('./sanctuary') ()
const { F } = require ('./sanctuary') ()

const parseJsonF = F.encase (JSON.parse)

parseJsonF ('{"foo":1}')
  .pipe (F.fork (console.error) (console.log))

// JSON.parse ∷ String → Throw e ..
// S.toUpper ∷ String → String
// parseF    ∷ String → Future Error Object
// const fut = F.resolve ('{"foo":"bar"}')    // ∷ Future Error String
//  .pipe (F.map (S.toUpper))  // ∷ Future Error String
//  .pipe (F.map (x => console.log ({ x }) || x))
//  .pipe (F.map (S.toLower))  // ∷ Future Error String
//  .pipe (F.chain (parseF))   // ∷ Future Error Object
// F.fork (console.error) (console.log) (fut)
