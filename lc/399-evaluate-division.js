/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {

  const adjs = {}

  for (let i = 0; i < equations.length; ++i) {
    const [x, y] = equations[i]
    const val = values[i]
    adjs[x] = adjs[x] ? [...adjs[x], [y, val]] : [[y, val]]
    adjs[y] = adjs[y] ? [...adjs[y], [x, 1/val]] : [[x, 1/val]]
  }

  function query (X, Y) {
    const path = []
    const visited = {}

    function dfs (x, target, acc) {
      // console.log({ x, acc })

      if (adjs[x] === undefined) return // non-listed node
      if (visited[x]) return
      if (x === target) return acc // found target, return the accumulation

      visited[x] = true

      path.push(x)

      for (const [y, val] of adjs[x]) {
        const r = dfs(y, target, acc * val)
        if (r) return r // if found, do no more and return
      }
    }

    return dfs(X, Y, 1.0) || -1.0
  }

  return queries.map(([X, Y]) => query(X, Y))
}

console.log(calcEquation(
  [ ['a', 'b'], ['b', 'c'] ],
  [2.0, 3.0],
  [ ['a', 'c'], ['b', 'a'], ['a', 'e'], ['a', 'a'], ['x', 'x'] ]
))
