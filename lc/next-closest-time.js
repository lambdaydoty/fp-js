/**
 *  * @param {string} time
 *   * @return {string}
 *    */
var nextClosestTime = function(_time) {

  const time = _time.replace(':', '')
  const digit = Object.keys({
    [time[0]]: true,
    [time[1]]: true,
    [time[2]]: true,
    [time[3]]: true,
  })

  const bases = [3, 10, 6, 10]

  const order = digit.reduce((acc, curr, ix) => ({ ...acc, [curr]: ix }), {})

  const inc = (base = 10) => d => {
    let ix = order[d]
    while (true) {
      ix++
      if (ix === digit.length || digit[ix] >= base) {
        carry = true
        return [digit[0], true]
      } else {
        return [digit[ix], false]
      }
    }
  }

  let carry = true
  let d = null
  const answer = Array.from({ length: 4 })
  for (i = 3; i >= 0; i--) {
    ;([d, carry] = carry ? inc(bases[i])(time[i]) : [time[i], false])
    answer[i] = d
    // if (i === 1 && time[0] !== '2') carry = false
  }

  let [x, y, z, u] = answer

  if (Number(`${x}${y}`) >= 24) {
    ;([y, carry] = inc(4)(y))
    ;([x, _] = inc(3)(x))
  }

  return `${x}${y}:${z}${u}`
};

console.log(
  nextClosestTime("19:34")
)

console.log(
  nextClosestTime("23:59")
)
console.log(
  nextClosestTime("11:12")
)
console.log(
  nextClosestTime("01:34")
)
console.log(
  nextClosestTime("13:55")
)
