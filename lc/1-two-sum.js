/**
 *  * @param {number[]} nums
 *   * @param {number} target
 *    * @return {number[]}
 *     */
var twoSum = function(nums, target) {

  // for all i !== j:

  for (let i = 0; i < nums.length; ++i) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }

  return '?'
};

var twoSum2 = function(nums, target) {

  const map = {}

  for (let i = 0; i < nums.length; ++i) {
    const comp = target - nums[i]
    if (map[comp] !== undefined) return [map[comp], i]
    map[nums[i]] = i
  }

}

console.log(
  twoSum2([2, 7, 11, 15], 9)
)
