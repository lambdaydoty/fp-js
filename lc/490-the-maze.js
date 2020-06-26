// DFS
// adjacent = positions
//
/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 */
var hasPath = function (maze, start, destination) {
  // dimension
  const X = maze.length
  const Y = maze[0].length

  const visited = new Set()

  // x: up & down
  // y: left & right

  const leftMost = ([x, y]) => {
    while (y >= 0 && maze[x][y] === 0) --y
    return [x, y + 1]
  }
  const rightMost = ([x, y]) => {
    while (y < Y && maze[x][y] === 0) ++y
    return [x, y - 1]
  }
  const upMost = ([x, y]) => {
    while (x >= 0 && maze[x][y] === 0) --x
    return [x + 1, y]
  }
  const downMost = ([x, y]) => {
    while (x < X && maze[x][y] === 0) ++x
    return [x - 1, y]
  }

  const target =
    ([x, y]) =>
      x === destination[0] &&
      y === destination[1]

  const adj =
    (node) =>
      [
        leftMost(node),
        rightMost(node),
        upMost(node),
        downMost(node),
      ]

  function dfs (node) {
    visited.add(`${node}`)

    if (target(node)) return true

    for (const _node of adj(node)) {
      if (!visited.has(`${_node}`)) {
        if (dfs(_node)) return true
      }
    }

    return false
  }

  return dfs(start)
}

console.log(
  hasPath(
    [
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 0, 0, 0, 0],
    ],
    [0, 4],
    [4, 4],
  )
)

console.log(
  hasPath(
    [
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 0, 0, 0, 0],
    ],
    [0, 4],
    [3, 2],
  )
)

console.log(
  hasPath(
    [
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 1, 0, 0],
    ],
    [0, 0],
    [8, 6],
  )
)
