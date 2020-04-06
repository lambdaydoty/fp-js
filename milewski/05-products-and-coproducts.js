const R = require('ramda')
const { B, $, def, uncurry, S } = require('../sanc')

;(function InitialObject () {
  const a = $.TypeVariable('a')

  // :: Void -> a
  const absurd = uncurry(def)(
    'absurd',
    {},
    [$.Void, a],
    _ => {},
  )

  console.log('InitialObject')
  console.log(absurd)
  console.log(
    R.tryCatch(
      absurd,
      S.K('catched!')
    )()
  )
  console.log('')
})()

;(function TermialObject () {
  const a = $.TypeVariable('a')

  // :: a -> Unit
  const unit = uncurry(def)(
    'unit',
    {},
    [a, $.Undefined],
    _ => {},
  )

  console.log('TermialObject')
  console.log(unit)
  console.log(unit(123))
  console.log('')
})()

;(function Products () {
  // (Integer)
  const p1 = uncurry(def)(
    'p1',
    {},
    [$.Integer, $.Integer],
    x => x,
  )
  const q1 = uncurry(def)(
    'q1',
    {},
    [$.Integer, $.Boolean],
    _ => true,
  )

  // (Integer, (Integer, Boolean))
  const $Tuple = $.Pair($.Integer)($.Pair($.Integer)($.Boolean))
  const p2 = uncurry(def)(
    'p2',
    {},
    [$Tuple, $.Integer],
    S.pair(
      a =>
        p =>
          a
    ),
  )

  const q2 = uncurry(def)(
    'q2',
    {},
    [$Tuple, $.Boolean],
    S.pair(
      a =>
        S.pair(
          x =>
            y =>
              y
        )
    ),
  )

  console.log('Product? (Int)')
  console.log(p1(3))
  console.log(q1(3))
  console.log(p2(S.Pair(1)(S.Pair(2)(true))))
  console.log(q2(S.Pair(1)(S.Pair(2)(true))))
  console.log('')

  // p1 = fst . m1
  // q1 = snd . m1
  const m1 = uncurry(def)(
    'm1',
    {},
    [$.Integer, $.Pair($.Integer)($.Boolean)],
    n => S.Pair(n)(true),
  )

  console.log(
    S.equals(p1(42))(B(S.fst)(m1)(42)),
    S.equals(q1(42))(B(S.snd)(m1)(42)),
  )

  // p2 = fst . m2
  // q2 = snd . m2
  const m2 = uncurry(def)(
    'm2',
    {},
    [$Tuple, $.Pair($.Integer)($.Boolean)],
    S.pair(
      a =>
        S.pair(
          x =>
            y =>
              S.Pair(a)(y)
        )
    )
  )

  const t = S.Pair(3)(S.Pair(4)(false))

  console.log('Product? (Int, (Int, Bool))')
  console.log(
    S.equals(p2(t))(B(S.fst)(m2)(t)),
    S.equals(q2(t))(B(S.snd)(m2)(t)),
  )
  console.log('')
})()

;(function Coproducts () {
  const { daggy } = require('../sanc')
  const Contact = daggy.taggedSum(
    'Contact',
    {
      PhoneNum: ['phoneNum'],
      EmailAddr: ['emailAddr'],
    },
  )
  const { PhoneNum, EmailAddr } = Contact

  console.log('Coproducts')
  console.log(
    PhoneNum(2222222),
    EmailAddr('hello@world.com'),
  )
})()
