const { S, F, U } = require('./sanc')
const log = x => y => console.log(x, y)
const { fork, resolve } = F
const ap = U.uncurry(S.ap)

//  Future (x -> y -> z -> r) `ap`
//  Future (x)                `ap`
//       Future (y)           `ap`
//            Future (z)      `ap`
//
//  Result:        Future (r)
//
U.uncurry(fork)([
  log('rejection: '),
  log('resolution: '),
  ap([
    ap([
      ap([
        resolve(x => y => z => x + y + z),
        resolve('A_'),
      ]),
      resolve('B_'),
    ]),
    resolve('C_'),
  ]),
])

// [ x -> y -> a,
//   x -> y -> b ] `ap`
// [ 1,
//   2,
//   3 ]           `ap`
//      [ 10,
//        20  ]
//  Result: [a, b]
console.log(
  ap([
    ap([
      [
        x => y => `(${x},${y})`,
        x => y => `(${-x},${-y})`,
      ],
      [1, 2, 3],
    ]),
    [10, 20],
  ])
)

const of = U.uncurry(S.of)

console.log(
  ap([
    ap([
      ap([
        of([Array, x => y => z => x + y + z]),
        [1, 2, 3],
      ]),
      [100, 200, 300],
    ]),
    [10000, 20000],
  ])
)

console.log(
  ap([
    ap([
      s => S => n => s.slice(0, n) + '-' + S,
      s => s.toUpperCase(),
    ]),
    s => Math.ceil(s.length / 2),
  ])('Haskell')
)

const tap = S.ap(S.K)

const trace = log('trace...')

/**
 * 'Haskell'
 *    |_______________
 *    |    |    |    |
 *    |   (f)  (g)  (h)
 *    |    |    |    |
 *    u    x    y    z
 *    |____|____|____|
 *           |
 *          (F)
 *           |
 *           v
 *          ...
 */
console.log(
  ap([
    ap([
      ap([
        x => a => b => c => [x, a, b, c],
        x => tap(trace)(x) + '_A', // x -> a
      ]),
      x => tap(trace)(x) + '_B', // x -> b
    ]),
    x => tap(trace)(x) + '_C', // x -> c
  ])('Haskell')
)

console.log(
  ap([
    ap([
      ap([
        of([S.Maybe, x => y => z => x + y + z]),
        S.Just('Just '),
      ]),
      S.Just('do '),
    ]),
    S.Just('it!'),
  ])
)
