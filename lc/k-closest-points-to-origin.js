/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = function (points, K) {
  const Heap = require('./heap')
  const minHeap = Heap((p, q) => distSquare(p) - distSquare(q))
  points.forEach(x => minHeap.push(x))
  return Array.from({ length: K }, () => minHeap.pop())

  function distSquare ([x, y]) {
    return x * x + y * y
  }
}

console.log(
  kClosest([[1, 3], [-2, 2]], 1)
)

console.log(
  kClosest([[3, 3], [5, -1], [-2, 4]], 2)
)
