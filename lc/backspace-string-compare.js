const assert = require('assert')
/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
  let i = S.length - 1
  let j = T.length - 1

  // console.log(S, T)
  let skipS = 0
  let skipT = 0
  while (i >= 0 || j >= 0) {
    // console.log(S[i], T[j])

    const s = S[i]
    const t = T[j]

    // console.log({ s, t })

    if (s === '#' || t === '#') {
      while (S[i] === '#') { skipS++; i-- }
      while (T[j] === '#') { skipT++; j-- }
      while (i >= 0 && S[i] !== '#' && skipS > 0) { i--; skipS-- }
      while (j >= 0 && T[j] !== '#' && skipT > 0) { j--; skipT-- }
    } else {
      if (s !== t) return false
      i--
      j--
    }
  }

  // console.log({ i, j })
  return i === j
}

assert.strictEqual(backspaceCompare('bxj##tw', 'bxo#j##tw'), true)
// assert.strictEqual(backspaceCompare('ab#c', 'ad#c'), true)
// assert.strictEqual(backspaceCompare('ab##', 'c#d#'), true)
// assert.strictEqual(backspaceCompare('a##c', '#a#c'), true)
// assert.strictEqual(backspaceCompare('a#c', 'b'), false)
