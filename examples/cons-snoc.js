/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { S } = require ('./sanctuary') ()
const R = require ('ramda')
const { Cons, Nil } = require ('./sanctuary/types/List')

const arr = [1, 2, 3, 4]
const cons =
  Cons (1) (
    Cons (2) (
      Cons (3) (
        Cons (4) (Nil))))

const pad = 16

console.log ('')
console.log ({ arr })
console.log ('S.reduce:'.padStart (pad, ' '), S.reduce (b => a => `(${b} * ${a})`) ('e') (arr))
console.log ('R.reduce:'.padStart (pad, ' '), R.reduce ((b, a) => `(${b} * ${a})`) ('e') (arr))
console.log ('Array.reduce'.padStart (pad, ' '), arr.reduce ((b, a) => `(${b} * ${a})`, 'e'))
console.log ('R.reduceRight:'.padStart (pad, ' '), R.reduceRight ((a, b) => `(${a} * ${b})`) ('e') (arr))
console.log ('Array.reduceRight'.padStart (pad, ' '), arr.reduceRight ((b, a) => `(${a} * ${b})`, 'e'))
console.log ('')

console.log ('')
console.log ({ cons })
console.log ('S.reduce:'.padStart (pad, ' '), S.reduce (b => a => `(${b} * ${a})`) ('e') (cons))
console.log ('R.reduce:'.padStart (pad, ' '), R.reduce ((b, a) => `(${b} * ${a})`) ('e') (cons))
console.log ('List.foldr:'.padStart (pad, ' '), cons.foldr ((a, b) => `(${a} * ${b})`, 'e'))
console.log ('')

/**
 * Ref:
 *   https://github.com/fantasyland/fantasy-land/issues/7#issuecomment-18012990
 */
