/**
 * @param {string} s
 * @return {string}
 *
 * keypoint:
 *
 *   區分 parser & evaluator
 *
 *      parser 通常是較麻煩處 (stack, count, forloop, generator)
 *      evaluator 用 parser destruct 後，直接 recur 即可
 *
 *        認出 operatros: 本題: repeat(n) 和 concat(prefix)
 *
 *   其他
 *      in JS, use c.charCodeAt('0')
 */
var decodeString = function (s) {
  return evaluator(s)

  /* parser */

  function matchParens (program = '[x[y]z]...') {
    let count = 0
    for (let i = 0; i < program.length; ++i) {
      if (program[i] === '[') ++count
      if (program[i] === ']') --count
      if (count === 0) return program.slice(1, i) // copy
    }
  }

  function destruct (program = 'xyz10[...]abc5[]') {
    const inCharCodeRange = (c, c1, c2) => c && c.charCodeAt(0) >= c1.charCodeAt(0) && c.charCodeAt(0) <= c2.charCodeAt(0)
    const isDigit = c => inCharCodeRange(c, '0', '9')
    const isAlphabet = c => inCharCodeRange(c, 'a', 'z') || inCharCodeRange(c, 'A', 'Z')

    const len = program.length

    if (len === 0) return [null]

    let c = program[0]
    let i = 0

    if (isAlphabet(c)) {
      while (isAlphabet(program[i])) { ++i }
      return ['+', program.slice(0, i), program.slice(i, len)]
    }

    if (isDigit(c)) {
      while (isDigit(program[i])) { ++i }
      const n = parseInt(program.slice(0, i), 10)
      const sub = matchParens(program.slice(i, len))
      return [n, sub, program.slice(i + sub.length + 2, len)]
    }
  }

  /* evaluator */

  function evaluator (program) {
    const repeat =
      n =>
        str =>
          (n === 0) ? ''
            : /* otherwise */ str.slice() + repeat(n - 1)(str)
    const [op, x, rest] = destruct(program)
    // console.log({ op, x, rest })
    return (
      (op === '+') ? x + evaluator(rest)
        : (typeof op === 'number') ? repeat(op)(evaluator(x)) + evaluator(rest)
          : /* otherwise */ ''
    )
  }
}

console.log(
  decodeString('3[a]2[bc]')
)
console.log(
  decodeString('3[a2[c]]')
)
console.log(
  decodeString('2[abc]3[cd]ef')
)
console.log(
  decodeString('')
)
