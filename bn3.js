/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
// const { Decimal128: D128 } = require ('mongodb')
const BN = require ('bignumber.js')
const { $, S, E } = require ('./sanctuary') ()
global.crypto = global.crypto || require ('crypto')
BN.config ({ CRYPTO: true })

/**
 * For unary operators ...
 *
 *   BN → (String|Boolean|Number)
 *
 * For binary operators ...
 *
 *   BN → BN → (String|Boolean|Number)
 *
 * For Ternary operators ...
 *
 *   (BN|Null) → (BN|Null) → BN → (String|Boolean|Number)
 */

/**
 * NOTE:
 *   > If a base is specified, n is rounded according to
 *   > the current DECIMAL_PLACES and ROUNDING_MODE settings.
 *   > This includes base 10 so DON'T include a base parameter
 *   > for decimal values unless this behaviour is wanted.
 */

const bn = base => x => new BN (x, base)
const bn10 = bn (null)
const isAnyFunction = S.is ($.AnyFunction) // ∷ a → Boolean
const isNumber = S.is ($.Number) // ∷ a → Boolean
const bnToFixed = S.unchecked.when (BN.isBigNumber) (x => x.toFixed (null, null))

const arities = [[], [], [], [], []]

// ∷ String → String → Maybe Function
const curryWithArity =
  name =>
    arity =>
      arities[arity + 1].push (name) &&
      S.prop (`${arity}`) ({
        '0': S.Just (x => bnToFixed (bn10 (x)[name] ())),
        '1': S.Just (y => x => bnToFixed (bn10 (x)[name] (y))),
        '2': S.Just (b => x => y => bnToFixed (bn10 (x)[name] (y, b))),
        '3': S.Nothing,
        '4': S.Nothing,
      })

const exportInstanceOps =
  proto =>
    S.pipe ([
      S.filter (name => isAnyFunction (proto[name])),           // ∷ [String]
      S.map (S.ap (S.Pair) (name => proto[name].length)),  // ∷ [Pair String NNInt]
      S.map (S.extend (S.pair (curryWithArity))),               // ∷ [Pair String (Maybe Function)]
      S.fromPairs,                                              // ∷ StrMap (Maybe Function)
      S.justs,                                                  // ∷ StrMap Function
    ]) (Object.getOwnPropertyNames (proto))

const classOps = {
  bn,
  isBN: x => BN.isBigNumber (x),
  max: arr => BN.max (...arr),
  min: arr => BN.min (...arr),
  sum: arr => BN.sum (...arr),
  random: dp => BN.random (dp),
}

const instanceOps = exportInstanceOps (BN.prototype)

const base = [
  'bn',
  'comparedTo',
  ...['dividedBy', 'div'],
  ...['dividedToIntegerBy', 'idiv'],
  ...['isEqualTo', 'eq'],
  ...['isGreaterThan', 'gt'],
  ...['isGreaterThanOrEqualTo', 'gte'],
  ...['isLessThan', 'lt'],
  ...['isLessThanOrEqualTo', 'lte'],
  'minus',
  ...['modulo', 'mod'],
  ...['multipliedBy', 'times'],
  'plus',
  'toString',
]

const decimal = S.pipe ([
  E.pick (base),
  S.map (S.T (null)),
]) (S.concat (classOps) (instanceOps))

const I = instanceOps
const extend = {
  isStrictPositive: S.lift2 (S.and) (I.isPositive) (S.complement (I.isZero)),
}

const intersect = S.map (S.compose (S.join)) (
  S.lift2 (x => y => x === y ? [x] : [])
)

const difference =
  xs =>
    ys =>
      S.reject (x => ys.includes (x)) (xs)

arities[1] = S.concat (arities[1]) (intersect (arities[2]) (base))
arities[2] = difference (arities[2]) (arities[1])
arities[2] = S.concat (arities[2]) (intersect (arities[3]) (base))
arities[3] = difference (arities[3]) (arities[2])

const exportConsts =
  proto =>
    S.pipe ([
      S.filter (name => isNumber (proto[name])),    // ∷ [String]
      S.map (S.ap (S.Pair) (name => proto[name])),  // ∷ [Pair String Number]
      S.fromPairs,                                  // ∷ StrMap Number
    ]) (Object.getOwnPropertyNames (proto))

const consts = exportConsts (BN)

module.exports = ({
  ...consts,
  ...classOps,
  ...instanceOps,
  ...decimal, // !overwrite
  ...extend,
  arities,
  base,
})

// const round = [
//   'integerValue',
//   'sd', // 'precision'
//   'toExponential',
//   'toFixed',
//   'toPrecision',
// ]

// const special = [
//   'toFormat',
// ]
