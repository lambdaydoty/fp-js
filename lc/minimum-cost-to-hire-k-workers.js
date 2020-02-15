/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} K
 * @return {number}
 */
var mincostToHireWorkers = function (quality, wage, K) {
  const n = quality.length
  const Heap = require('./heap')
  const heap = Heap((x, y) => y - x) // max heap

  const data = Array.from(
    { length: n },
    (v, i) => ({
      r: wage[i] / quality[i],
      q: quality[i],
      // w: wage[i],
    }),
  ).sort((x, y) => x.r - y.r)

  let ans = Number.MAX_SAFE_INTEGER
  let sumq = 0
  for (const { r, q } of data) {
    heap.push(q)
    sumq += q

    if (heap.size() === K) {
      ans = Math.min(ans, sumq * r)
      sumq -= heap.pop()
    }
  }

  return ans
}

console.log(mincostToHireWorkers([10, 20, 5], [70, 50, 30], 2))
console.log(mincostToHireWorkers([3, 1, 10, 10, 1], [4, 8, 2, 2, 7], 3))
