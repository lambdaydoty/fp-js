/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  // return [
  //   beginWord,
  //   endWord,
  //   wordList,
  // ]

  const queue = []

  function bfs (start, goal) {
    const n = start
    n.visited = true
    queue.push(n)
    while (queue.length !== 0) {
      const x = queue.shift()
      if (x === goal) return x
      for (const y of adjacent(x)) {
        if (!y.visited) {
          y.visited = true
          queue.push(y)
        }
      }
    }
  }

  return adjacent('log', wordList)

  function adjacent (x, nodes) {
    return nodes
      .filter(y => diffByAtMostOne(x, y))
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
