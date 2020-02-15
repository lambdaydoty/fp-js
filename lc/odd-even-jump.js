/**
  * @param {number[]} A
  * @return {number}
  */
var oddEvenJumps = function(A) {
  const stop = ix => ix === A.length - 1 || ix === -1
  const isNil = x => x === null || x === undefined
  const range = (from, to) => Array.from({ length: to - from }, (v, i) => from + i)
  // const memoizeWith = (_, fn) => { // TODO
  //   const table = {}
  //   return x => {
  //     if (typeof table[x] !== undefined) return table[x]
  //     const y = fn(x)
  //     table[x] = y
  //     return y
  //   }
  // }
  const odd = {}
  const even = {}

  return range(0, A.length)
    .map(start => oddJump(start))
    .filter(x => x >= 0)
    .length

  function oddJump (i) {
    // console.log('@oddJump')
    // console.log(i)
    if (stop(i)) return i
    if (!isNil(odd[i])) return odd[i]

    const head = A[i]
    let next = -1
    let curr = Number.MAX_SAFE_INTEGER
    for (let j = i + 1; j < A.length; ++j) {
      if (A[j] >= head && A[j] < curr) {
        next = j
        curr = A[j]
      }
    }

    odd[i] = evenJump(next)
    return odd[i]
  }

  function evenJump (i) {
    // console.log('@evenJump')
    // console.log(i)
    if (stop(i)) return i
    if (!isNil(even[i])) return even[i]

    const head = A[i]
    let next = -1
    let curr = Number.MIN_SAFE_INTEGER
    for (let j = i + 1; j < A.length; ++j) {
      if (A[j] <= head && A[j] > curr) {
        next = j
        curr = A[j]
      }
    }
    even[i] = oddJump(next)
    return even[i]
  }
}

console.log(
  oddEvenJumps([10,13,12,14,15]),
  oddEvenJumps([2,3,1,1,4]),
  oddEvenJumps([5,1,3,4,2]),
)
