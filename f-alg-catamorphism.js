/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const util = require ('util')
const daggy = require ('daggy')

/**
 * Ref:
 *   https://gist.github.com/DrBoolean/69082469fd8ff2fa94b5
 *   https://github.com/DrBoolean/excursion
 */

const ListF = daggy.taggedSum ('ListF', {
  Cons: ['x', 'xs'],
  Nil: [],
})
const Fx = daggy.tagged ('Name', ['_'])
const unFix = x => x['_']
Fx.prototype['@@show'] = function () {
  return `Fx (${S.show (this._)})`
}
Fx.prototype[util.inspect.custom] = function () {
  return S.show (this)
}

const { S } = require ('./sanctuary') ([])
const { map } = require ('fantasy-land')
const S_ = S.unchecked

const compose = S.compose (S.pipe) (S.reverse)

// ∷ (f a → a) → Fix f → a
const cata =
  alg =>
    x =>
      compose ([alg, S_.map (cata (alg)), unFix]) (x)

// ∷ (a → f a) → a → t
const ana =
  coalg =>
    a =>
      compose ([Fx, S_.map (ana (coalg)), coalg]) (a)

const { Cons, Nil } = ListF

ListF.prototype[map] = function (f) {
  return this.cata ({
    Cons: (x, xs) => Cons (x, f (xs)), // !
    Nil: _ => Nil,
  })
}

ListF.prototype['@@show'] = function () {
  return this.cata ({
    Cons: (x, xs) => `Cons (${S.show (x)}, ${S.show (xs)})`,
    Nil: _ => 'Nil',
  })
}

ListF.prototype[util.inspect.custom] = function () {
  return S.show (this)
}

const aToL = ana (([x, ...xs]) => x !== undefined ? Cons (x, xs) : Nil)

const term =
  Fx (Cons (1,
    Fx (Cons (2,
      Fx (Cons (3,
        Fx (Cons (4,
          Fx (Cons (5,
            Fx (Nil)))))))))))

const alg = x => x.cata ({
  Cons: (x, xs) => x + xs,
  Nil: _ => 0,
})

console.log (
  cata (alg) (term)
)

console.log (aToL ([5, 4, 3, 2, 1]))
/**
 * cata (alg) (term)
 * => alg (S.map (cata (alg)) (unFix (term)))
 * => alg (S.map (cata (alg)) (Cons (1, Fx (...))))
 * => alg (Cons (1, cata (alg) (Fx (...))))
 * => alg (Cons (1, alg (S.map (cata (alg)) (unFix (Fx (...)))))
 * => alg (Cons (1, alg (S.map (cata (alg)) (Cons (2, Fx (...)))))
 * => alg (Cons (1, alg (Cons (2, cata (alg) (Fx (...)))))
 * => 1 + alg (Cons (2, cata (alg) (Fx (...)))))
 * => 1 + (2 + cata (alg) (Fx (...))))
 * => ...
 */
