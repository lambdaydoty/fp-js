/**
  *  * @param {number[]} nums
  *   * @return {boolean}
  *    */
var canJump = function(nums) {
  const map = {}

  return recur(0)

  function recur (s) {
    // console.log({ s })
    if (s === nums.length - 1) return true
    if (s >= nums.length) return false

    if (map[s] !== undefined) return map[s]
    // console.log('@')

    const max = nums[s]
    for (let i = 1; i <= max; i++) {
      if (recur(s + i)) {
        map[s] = true
        return map[s]
      } else {
        if (nums[s] <= nums[s + i] + i) {
          map[s] = false
          return map[s]
        }
      }
    }
    map[s] = false
    return map[s]
  }

};


console.log(
  // canJump([2,3,1,1,4]),
  // canJump([3,2,1,0,4]),
  canJump([5, 4, 3, 2, 1, 0, 1]),
)
