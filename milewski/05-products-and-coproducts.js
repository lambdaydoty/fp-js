/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { daggy, show, $, S, D } = require ('../sanctuary') ()

; (function Products () {
  console.log ('')
  console.log ('@Product')

  // p1 ∷ Integer → Integer
  // q1 ∷ Integer → Boolean
  const p1 = D.def (
    'p1',
    {},
    [$.Integer, $.Integer],
    x => x,
  )
  const q1 = D.def (
    'q1',
    {},
    [$.Integer, $.Boolean],
    _ => true,
  )

  const $Tuple = $.Pair ($.Integer) ($.Pair ($.Integer) ($.Boolean))
  // p2 ∷ (Integer, (Integer, Boolean)) → Integer
  // q2 ∷ (Integer, (Integer, Boolean)) → Boolean
  const p2 = D.def (
    'p2',
    {},
    [$Tuple, $.Integer],
    S.pair (
      x =>
        p =>
          x
    ),
  )
  const q2 = D.def (
    'q2',
    {},
    [$Tuple, $.Boolean],
    S.pair (
      x =>
        S.pair (
          a =>
            b =>
              b
        )
    ),
  )

  // p1 = fst . m1 ∷ Integer → Integer
  // q1 = snd . m1 ∷ Integer → Boolean
  const m1 = D.def (
    'm1',
    {},
    [$.Integer, $.Pair ($.Integer) ($.Boolean)],
    n => S.Pair (n) (true),
  )

  console.log ('')
  console.log (`
    S.equals (p1 (42)) (S.compose (S.fst) (m1) (42)) === ` + show (
    S.equals (p1 (42)) (S.compose (S.fst) (m1) (42))
  ))
  console.log (`
    S.equals (q1 (42)) (S.compose (S.snd) (m1) (42)) === ` + show (
    S.equals (q1 (42)) (S.compose (S.snd) (m1) (42))
  ))

  // p2 = fst . m2 ∷ (Integer, (Integer, Boolean)) → Integer
  // q2 = snd . m2 ∷ (Integer, (Integer, Boolean)) → Boolean
  const m2 = D.def (
    'm2',
    {},
    [$Tuple, $.Pair ($.Integer) ($.Boolean)],
    S.pair (
      x =>
        S.pair (
          a =>
            b =>
              S.Pair (x) (b)
        )
    )
  )

  const tuple = S.Pair (3) (S.Pair (4) (false))

  console.log ('')
  console.log (`tuple === ${show (tuple)}`)
  console.log (`
    S.equals (p2 (tuple)) (S.compose (S.fst) (m2) (tuple)) === ` + show (
    S.equals (p2 (tuple)) (S.compose (S.fst) (m2) (tuple))
  ))
  console.log (`
    S.equals (q2 (tuple)) (S.compose (S.snd) (m2) (tuple)) === ` + show (
    S.equals (q2 (tuple)) (S.compose (S.snd) (m2) (tuple))
  ))
}) ()

; (function Coproducts () {
  console.log ('')
  console.log ('@Coproducts')

  const Contact = daggy.taggedSum ('Contact',
    {
      PhoneNum: ['phoneNum'],
      EmailAddr: ['emailAddr'],
    },
  )
  const $Contact = D.BinaryType (
    'Contact',
    'https://',
    [],
    x => Contact.is (x),
    x => x.phoneNum ? [x.phoneNum] : [],
    x => x.emailAddr ? [x.emailAddr] : [],
    $.Integer,
    $.String,
  )

  // const { PhoneNum, EmailAddr } = Contact

  // ∷ Integer → Contact
  const PhoneNum = D.def (
    'PhoneNum',
    {},
    [$.Integer, $Contact],
    Contact.PhoneNum,
  )

  // ∷ String → Contact
  const EmailAddr = D.def (
    'EmailAddr',
    {},
    [$.String, $Contact],
    Contact.EmailAddr,
  )

  const util = require ('util')

  Contact.prototype['@@show'] = function () {
    return this.cata ({
      PhoneNum: x => `PhoneNum (${show (x)})`,
      EmailAddr: x => `EmailAddr (${show (x)})`,
    })
  }

  Contact.prototype[util.inspect.custom] = function () {
    return show (this)
  }

  console.log ('')
  console.log (
    PhoneNum (123456789),
  )
  console.log (
    EmailAddr ('hello@world.com'),
  )
}) ()
