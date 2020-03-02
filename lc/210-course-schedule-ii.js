/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const adjs = Array.from({ length: numCourses }, () => [])
  prerequisites.forEach(([course, pre]) => {
    adjs[pre].push(course)
  })

  const state = Array.from({ length: numCourses }, () => 0)

  const ans = []

  function dfs (x) {
    // console.log({ x }, state)
    if (state[x] === 1) {
      return false
    }
    if (state[x] === 2) return true

    state[x] = 1 // visiting

    for (const y of adjs[x]) {
      if (!dfs(y)) return false
    }

    state[x] = 2
    ans.push(x)
    return true
  }

  for (let i = 0; i < numCourses; ++i) {
    if (!dfs(i)) return []
  }

  function * reverse (a) {
    for (let n = a.length - 1; n >= 0; --n) yield a[n]
  }

  return [...reverse(ans)]
}

Array.prototype.flatMap = /* eslint no-extend-native: "never" */
  function (fn) {
    return this.reduce((acc, x) => acc.concat(fn(x)), [])
  }

const uniq = arr => Array.from(new Set(arr))

const findOrder2 = (numCourses, prerequisites) => {
  // console.log({ numCourses, prerequisites })
  const adjs = Array.from({ length: numCourses }, () => [])
  prerequisites.forEach(([course, pre]) => {
    adjs[pre].push(course)
  })

  const visited = []

  const inDegree = Array.from({ length: numCourses }, () => 0)
  prerequisites.forEach(([course, pre]) => {
    ++inDegree[course]
  })

  // console.log({ inDegree })

  function bfs (xs) {
    // xs.forEach(x => { visited[x] = true })
    return (xs.length) === 0
      ? xs
      : xs.concat(
        bfs(uniq(xs.flatMap(
          x => adjs[x].map(y => {
            --inDegree[y]
            return 0 === inDegree[y]
              ? y
              : null
          }).filter(x => x !== null)
          // x => adjs[x].filter(y => !visited[y])
        )))
      )
  }

  function zeroInDegrees () {
    return inDegree
      .map((v, i) => (v === 0) ? i : null)
      .filter(x => x !== null)
  }

  const ans = bfs(zeroInDegrees())

  return ans.length === numCourses
    ? ans
    : []
}

console.log(
  findOrder2(4, [[1, 0], [2, 0], [3, 1], [3, 2]]),
  findOrder2(2, []),
  findOrder2(2, [[0, 1]]),
  findOrder2(2, [[0, 1], [1, 0]]),
  findOrder2(3, [[0, 1], [0, 2], [1, 2]]),
)
