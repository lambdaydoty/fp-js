/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { show, S } = require ('../sanctuary') ()

/* 3.3 Orders */

console.log ('')
console.log (
  `S.sort (['foo', 'bar', 'baz', '']) === ` +
  show (S.sort (['foo', 'bar', 'baz', '']))
)

/* 3.4 Monoid as Set */

console.log ('')
console.log (
  `S.concat ({ foo: 1, bar: 2 }) ({ bar: 3, baz: 4 }) === ` +
  show (S.concat ({ foo: 1, bar: 2 }) ({ bar: 3, baz: 4 }))
)
console.log (
  `S.empty (Object) === ` +
  show (S.empty (Object))
)
