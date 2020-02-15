/**
  *  * @param {number[]} height
  *   * @return {number}
  *    */
var maxArea = function(height) {

  const w = { start: 0, end: height.length - 1 }
  let area = 0

  while (w.start !== w.end){
    const leftH = height[w.start]
    const rightH = height[w.end]
    const h = Math.min(leftH, rightH)
    area = Math.max(area, h * (w.end - w.start))

    if (h === leftH) {
      w.start++
    } else {
      w.end--
    }
  }

  return area

};

var maxArea2 = function(height) {
  const area = (l, r) => (r - l) * Math.min(height[l], height[r])

  return recur(0, height.length - 1)

  function recur (l, r) {
    return l === r
      ? 0
      : Math.max(
        area(l, r),
        height[l] < height[r] // greedy
          ? recur(l + 1, r)
          : recur(l, r - 1),
      )
  }

};

console.log(
  maxArea2([1,8,6,2,5,4,8,3,7]),
)
