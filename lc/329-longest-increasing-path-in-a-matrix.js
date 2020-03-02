const memoize =
  (key = x => x) =>
    f => {
      const table = {}
      return (...args) => {
        const k = key(...args)
        if (table[k] === undefined) {
          table[k] = f(...args)
        }
        return table[k]
      }
    }
/**
 * @param {number[][]} matrix
 * @return {number}
 *
 * @ A node is represented by a 2-array [i, j]
 * @ use memoize with key function: [1, 200] => '[1,200]'
 */
var longestIncreasingPath = function (matrix) {
  const n = matrix.length
  const m = (n === 0) ? 0 : matrix[0].length

  const adjacents = ([x, y]) => {
    const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]]
    const valid = ([i, j]) => i >= 0 && j >= 0 && i < n && j < m
    return [...(function * () {
      for (const [dx, dy] of directions) {
        const [i, j] = [x + dx, y + dy]
        if (valid([i, j]) && matrix[i][j] > matrix[x][y]) yield [i, j]
      }
    })()]
  }
  const key = ([i, j]) => `[${i},${j}]`
  const dfs0 = memoize(key)(dfs)

  let max = 0
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < m; ++j) {
      max = Math.max(max, dfs0([i, j]))
    }
  }

  return max

  function dfs ([x, y]) {
    return 1 + Math.max(
      ...adjacents([x, y]).map(dfs0),
      0,
    )
  }
}

console.log(longestIncreasingPath(
  [
    [9, 9, 4],
    [6, 6, 8],
    [2, 1, 1],
  ],
))

console.log(longestIncreasingPath(
  [
    [3, 4, 5],
    [3, 2, 6],
    [2, 2, 1],
  ],
))

console.log(longestIncreasingPath(
  [
    [1, 2, 3, 4],
    [2, 2, 3, 4],
    [3, 2, 3, 4],
    [4, 5, 6, 7],
  ],
))

console.log(longestIncreasingPath(
  [],
))

console.log(longestIncreasingPath(
  [
    [7, 8, 9],
    [9, 7, 6],
    [7, 2, 3],
  ]
))
