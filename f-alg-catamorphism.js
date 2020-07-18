/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const daggy = require ('daggy')

/**
 * Ref:
 *   https://gist.github.com/DrBoolean/69082469fd8ff2fa94b5
 *   https://github.com/DrBoolean/excursion
 */

const Fx = daggy.tagged ('Name', ['_'])
const unFx = x => x['_']
Fx.prototype['@@show'] = function () {
  return `Fx (${S.show (this._)})`
}
Fx.prototype[require ('util').inspect.custom] = function () {
  return S.show (this)
}

const { S: S_ } = require ('./sanctuary') ([])
const { map } = require ('fantasy-land')
const S = S_.unchecked

// ∷ (f a → a) → Fix f → a
const cata = alg => x => S.pipe ([
  unFx,                 // ∷ f (Fix f)
  S.map (cata (alg)),   // ∷ f a
  alg,                  // ∷ a
]) (x)

// ∷ (a → f a) → a → Fix f
const ana = coalg => a => S.pipe ([
  coalg,                // ∷ f a
  S.map (ana (coalg)),  // ∷ f (Fix f)
  Fx,                   // ∷ Fix f
]) (a)

const { Nil, Cons } = (function () {
  const ListF = daggy.taggedSum ('ListF', {
    Nil: [],
    Cons: ['x', 'xs'],
  })

  // Ff = id + (id x f)
  ListF.prototype[map] = function (f) {
    return this.cata ({
      Nil: _ => Nil,
      Cons: (x, xs) => Cons (x, f (xs)), // !
    })
  }

  ListF.prototype['@@show'] = function () {
    return this.cata ({
      Nil: _ => 'Nil',
      Cons: (x, xs) => `Cons (${S.show (x)}, ${S.show (xs)})`,
    })
  }

  ListF.prototype[require ('util').inspect.custom] = function () {
    return S.show (this)
  }

  return ListF
}) ()

const aToL = ana (([x, ...xs]) => x !== undefined ? Cons (x, xs) : Nil)

const term =
  Fx (Cons (1,
    Fx (Cons (2,
      Fx (Cons (3,
        Fx (Cons (4,
          Fx (Cons (5,
            Fx (Nil)))))))))))

const alg = x => x.cata ({
  Nil: _ => 0,
  Cons: (x, xs) => x + xs,
})

console.log (aToL ([5, 4, 3, 2, 1]))

console.log (cata (alg) (term))

/**
 * cata (alg) (term)
 * => alg (S.map (cata (alg)) (unFx (term)))
 * => alg (S.map (cata (alg)) (Cons (1, Fx (...))))
 * => alg (Cons (1, cata (alg) (Fx (...))))
 * => alg (Cons (1, alg (S.map (cata (alg)) (unFx (Fx (...)))))
 * => alg (Cons (1, alg (S.map (cata (alg)) (Cons (2, Fx (...)))))
 * => alg (Cons (1, alg (Cons (2, cata (alg) (Fx (...)))))
 * => 1 + alg (Cons (2, cata (alg) (Fx (...)))))
 * => 1 + (2 + cata (alg) (Fx (...))))
 * => ...
 */

const { Zero, Succ } = (function () {
  const NatF = daggy.taggedSum ('NatF', {
    Zero: [],
    Succ: ['x'],
  })

  // Ff = id + f
  NatF.prototype[map] = function (f) {
    return this.cata ({
      Zero: _ => Zero,
      Succ: (x) => Succ (f (x)),
    })
  }

  NatF.prototype['@@show'] = function () {
    return this.cata ({
      Zero: _ => '0',
      Succ: (x) => '1 + ' + S.show (x),
    })
  }

  NatF.prototype[require ('util').inspect.custom] = function () {
    return S.show (this)
  }

  return NatF
}) ()

const num3 = Fx (Succ (Fx (Succ (Fx (Succ (Fx (Zero)))))))
const num2 = Fx (Succ (Fx (Succ (Fx (Zero)))))

console.log ({ num3, num2 })

const plus = m => cata (x => x.cata ({
  Zero: _ => m,
  Succ: (x) => Fx (Succ (x)),
}))

const mult = m => cata (x => x.cata ({
  Zero: _ => Fx (Zero),
  Succ: (x) => plus (m) (x),
}))

console.log (plus (num3) (num2))
console.log (mult (num3) (num2))
