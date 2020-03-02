/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  const nodes = Array.from(
    [beginWord, ...wordList],
    (v, i, _) => ({ val: v, visited: false }),
  )

  const queue = []
  function bfs (start, goal) {
    start.visited = true
    queue.push(start)
    while (queue.length !== 0) {
      // console.log({ queue })
      const x = queue.shift()
      // console.log({ x })
      if (x.val === goal) return x
      for (const y of adjacent(x)) {
        if (!y.visited) {
          // console.log({ y })
          y.visited = true
          y.parent = x
          queue.push(y)
        }
      }
    }
    return start
  }

  let ptr = bfs(nodes[0], endWord)

  if (ptr === nodes[0]) return 0

  let count = 1
  for (; ptr.parent; ptr = ptr.parent) { count++ }
  return count

  function adjacent (x) {
    return nodes
      .filter(y => diffByAtMostOne(x.val, y.val))
      .filter(y => y !== x)
  }

  function diffByAtMostOne (x, y) {
    if (x.length !== y.length) return false
    let sum = 0
    for (let i = 0; i < x.length; i++) {
      sum += (x[i] === y[i]) ? 0 : 1
      if (sum > 1) return false
    }
    return true
  }
}

console.log(
  ladderLength(
    'hit',
    'cog',
    ['hot', 'dot', 'dog', 'lot', 'log', 'cog'],
  )
)
console.log(
  ladderLength(
    'hit',
    'cog',
    ['hot', 'dot', 'dog', 'lot', 'log'],
  )
)
