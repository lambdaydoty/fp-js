/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const nodes = grid
    .map((x, i) => x
      .map((y, j) => (y === '1') ? ({ i, j }) : null))
  const dim1 = nodes.length
  const dim2 = (dim1 === 0) ? 0 : nodes[0].length
  const NODES =
    i =>
      j =>
        (i === -1 || j === -1) ? null
          : (i === dim1 || j === dim2) ? null
            : /* otherwise */ nodes[i][j]
  const adjacent = ({ i, j }) => [
    NODES(i + 1)(j),
    NODES(i)(j - 1),
    NODES(i - 1)(j),
    NODES(i)(j + 1),
  ].filter(x => x)

  // function dfs (x) {
  //   x.visited = true
  //   adjacent(x)
  //     .forEach(y => y.visited || dfs(y))
  // }

  function dfs (x) {
    x.visited = true
    adjacent(x)
      .forEach(y => y.visited || dfs(y))
  }

  let count = 0
  for (let x = 0; x < dim1; ++x) {
    for (let y = 0; y < dim2; ++y) {
      const node = NODES(x)(y)
      if (node && !node.visited) {
        ++count
        dfs(node)
      }
    }
  }

  return count
}

const test0 = `
11110
11010
11000
00000
`
const test1 = `
11000
11000
00100
00011
`

const parse =
  test => test
    .trim()
    .split('\n')
    .map(x => x.split(''))

console.log(parse(test0))
console.log(numIslands(parse(test0)))
console.log(numIslands(parse(test1)))
console.log(numIslands([['1', '0', '1', '1', '0', '1', '1']]))
console.log(numIslands([]))
// console.log(parse('1011011'))
