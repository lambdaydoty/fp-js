/**
 * https://adambard.com/blog/javascript-design-pattern-binding-functions/
 *
 * Binding Function Pattern
 *
 *  vs.
 *
 * Monad Pattern (using wrapped values)
 *
 */

const R = require('ramda')

const bindMaybe =
  (mx, f) =>
    (mx == null) ? null
      /* otherwise */ : f(mx)

const bindError =
  (mx, f) =>
    (mx instanceof Error) ? mx
      /* otherwise */ : R.tryCatch(f)(
        (e, _) => (e instanceof Error) ? e : Error(e)
      )(mx)

const bindPromise =
  (mx, f) => mx.then(f)

const returnPromise =
  x => Promise.resolve(x)

const bindWith =
  bindFn =>
    fns =>
      val =>
        fns.reduce(bindFn, val)

console.log(
  bindWith(bindMaybe)([
    x => x + '1',
    // y => null,
    z => z + '3',
  ])('0')
)

console.log(
  bindWith(bindError)([
    x => x + '1',
    y => { throw new Error('Failed') },
    z => z + '3',
  ])('0')
)

bindWith(bindPromise)([
  x => returnPromise(x + '1'),
  y => returnPromise(y + '2'),
  z => returnPromise(z + '3'),
  console.log,
])(returnPromise('0'))

console.log('end')
