/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {

  const n = height.length
  const leftMax = Array.from({ length: n }, () => 0)
  const rightMax = Array.from({ length: n }, () => 0)

  leftMax[0] = height[0]
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i])
  }

  rightMax[n - 1] = height[n - 1]
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i])
  }

  // console.log({ leftMax })
  // console.log({ rightMax })

  let ans = 0
  for (let i = 1; i < n - 1; i++) {
    ans += Math.min(leftMax[i], rightMax[i]) - height[i]
    // console.log({ ans })
  }

  return ans
}

console.log(
  // trap(
  //   [0,1,0,2,1,0,1,3,2,1,2,1]
  // ),
  trap(
    [2,0,2]
  )
)

/**
 * @param {number[]} height
 * @return {number}
 */
var trap2 = function(height) {

  return recur(height)

  function destruct (h) {
    const layer = h.map(x => (x === 0) ? 0 : 1)
    const sub = h.map((x, i) => x - layer[i])
    return [layer, sub]
  }

  function cal (layer) {
    return layer
      .join('')
      .split('1')
      .filter((x, i, ar) => (0 < i && i < ar.length - 1) || (x === '')) // remove first/last zeros
      .reduce((acc, curr) => acc + curr.length, 0) // sum inner zeros lengths
  }

  function isZeros (height) {
    for (let i = 0; i < height.length; i++) {
      if (height[i] !== 0) return false
    }
    return true
  }

  function recur (height) {
    const [layer, sub] = destruct(height)
    const val = cal(layer)
    return isZeros(sub)
      ? val
      : val + recur(sub)
  }
}
