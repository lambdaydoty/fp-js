const graph = `
0 1 1 0 0
1 0 1 0 0
1 1 0 1 0
0 0 1 0 1
0 0 0 1 0
`
const matrix = graph
  .trim()
  .split('\n')
  .map(x => x.split(' '))
  .map(x => x.map(y => parseInt(y, 10)))

const adjacent =
  x => matrix[x]
    .map((v, k) => v ? k : null)
    .filter(v => v != null)

console.log(matrix)
console.log(adjacent(0))
console.log(adjacent(1))
console.log(adjacent(2))

const source = 0

function bfs (first) {
  const q = []
  const visited = []
  visited[first] = true
  q.push(first)
  while (q.length) {
    const x = q.shift()
    console.log({ x }, q)
    for (const y of adjacent(x)) {
      if (!visited[y]) {
        visited[y] = true
        q.push(y)
      }
    }
  }
}

bfs(source)

Array.prototype.flatMap = /* eslint no-extend-native: "never" */
  function (fn) {
    return this.reduce((acc, x) => acc.concat(fn(x)), [])
  }

const visited  = []

function bfs2 (nodes) {
  nodes.forEach(n => { visited[n] = true })
  return (nodes.length === 0)
    ? []
    : nodes.concat(
      bfs2(nodes.flatMap(
        n =>
          adjacent(n)
            .filter(m => !visited[m])
      ))
    )
}

console.log('')
console.log('@bfs2')
console.log(
  bfs2([source])
)
