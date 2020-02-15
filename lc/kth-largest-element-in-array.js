/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {

  const Q = require('./heap')
  const q = Q((x, y) => x > y)

  nums.forEach(v => q.push(v))

  let ans = null
  for (let i = 0; i < k; i++) {
    ans = q.pop()
  }

  return ans

};

// console.log(
//   findKthLargest([3,2,1,5,6,4], 2)
// )

console.log(
  findKthLargest([3,2,3,1,2,4,5,5,6], 4)
)
