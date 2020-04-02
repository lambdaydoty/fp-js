/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */

// Hamitonian Path
// DFS
// Set

var crackSafe = function (n, k) {
  const range =
    k =>
      Array.from({ length: k }, (_, i) => `${i}`)

  const repeat =
    n =>
      x =>
        (n === 0)
          ? ''
          : `${repeat(n - 1)(x)}${x}`

  const adj =
    node =>
      range(k).map(s => `${node}${s}`.slice(1, undefined))

  const visited = new Set()

  const size = k ** n

  function dfs (x, acc) {
    // console.log({ x, acc })

    visited.add(x)

    if (visited.size === size) return acc

    for (const y of adj(x)) {
      if (!visited.has(y)) {
        const pass = dfs(y, `${acc}${y.slice(-1)}`)
        if (pass !== '') return pass
      }
    }

    visited.delete(x)
    return ''
  }

  const root = repeat(n)('0')

  return dfs(root, root)
}

console.log(crackSafe(1, 2))
console.log(crackSafe(2, 2))
