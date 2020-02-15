/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function(_nums) {

  const map = {}

  const origin = _nums.sort((a, b) => a - b)

  // keep less than 3 duplicated element
  const nums = []
  let dup = 0
  let last = null
  for (let i = 0; i < origin.length; ++i) {
    const curr = origin[i]
    if (curr === last) {
      dup++
      if (dup < 3) {
        nums.push(curr)
      }
    } else {
      dup = 0
      nums.push(curr)
    }
    last = curr
  }

  for (k = nums.length - 1; k >= 2; --k) {
    let i = 0 // i increases only
    let j = k - 1 // j decreases only
    while (i !== j) {
      const [x, y, z] = [nums[i], nums[j], nums[k]]
      if (z < 0) break

      if (x + y + z === 0) {
        map[`${x},${y},${z}`] = [x, y, z]
        ++i
        continue;
      }

      if (x + y + z > 0) {
        --j
        continue;
      }

      if (x + y + z < 0) {
        ++i
        continue;
      }
    }
  }

  return Object.values(map)
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum2 = function(_nums) { // TLE

  const nums = _nums.sort()

  const set = new Set()

  let i = 2

  while (nums[i] < 0) ++i

  for (; i < nums.length; ++i) {
    const tuples = twoSum2(nums.slice(0, i), 0 - nums[i])
      .map(pair => [...pair, i])
      .map(([i, j, k]) => [nums[i], nums[j], nums[k]])
      .map(a => a.sort())
      .forEach(x => set.add(JSON.stringify(x)))
  }

  return [...set].map(x => JSON.parse(x))

  function twoSum2 (nums, target) {

    const map = {}

    const pairs = []

    for (let i = 0; i < nums.length; ++i) {
      const comp = target - nums[i]
      if (map[comp] !== undefined) pairs.push([map[comp], i])
      map[nums[i]] = i
    }

    return pairs
  }

};

console.log(
  threeSum([-1, 0, 1, 2, -1, -4]),
  threeSum([0, 0, 0]),
  threeSum([1,1,-2]),
  threeSum([0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 3, 3, 4, 5]),
)
