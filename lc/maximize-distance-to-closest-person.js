/**
 *  * @param {number[]} seats
 *   * @return {number}
 *    */
var maxDistToClosest = function(seats) {

  let state = 1
  let zeros = 0
  const inArows = []

  if (seats[0] === 1) inArows.push(0)

  for (let i = 0; i < seats.length; i++) {
    if (state === 1 && seats[i] === 1) {
    } else if (state === 1 && seats[i] === 0) {
      zeros++
    } else if (state === 0 && seats[i] === 1) {
      inArows.push(zeros)
      zeros = 0
    } else if (state === 0 && seats[i] === 0) {
      zeros++
    }
    state = seats[i]
  }

  inArows.push(zeros)

  if (seats[seats.length - 1] === 1) inArows.push(0)

  let max = Math.ceil(Math.max(...inArows) / 2)
  return Math.max(max, inArows[0], inArows[inArows.length - 1])

};

console.log(
  maxDistToClosest([1,0,0,0,1,0,1]),
  maxDistToClosest([1,0,0,0]),
)
