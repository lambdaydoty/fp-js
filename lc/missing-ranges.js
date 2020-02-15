/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function(nums, lower, upper) {

  let l = 0
  while (nums[l] < lower) l++
  nums[l - 1] = lower - 1


  let r = nums.length - 1
  while (nums[r] > upper) r--
  nums[r + 1] = upper + 1


  const output = []
  while (l <= r + 1) {
    const range = {
      lower: nums[l - 1] + 1,
      upper: nums[l] - 1,
    }
    if (range.lower === range.upper) output.push(`${range.lower}`)
    if (range.lower < range.upper) output.push(`${range.lower}->${range.upper}`)
    l++
  }

  return output

};

console.log(
  findMissingRanges(
    [0, 1, 3, 50, 75], 0, 99
  ),
  findMissingRanges(
    [1, 3, 50, 75], 5, 99
  ),
)
