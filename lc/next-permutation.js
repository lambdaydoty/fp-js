/**
 *  * @param {number[]} nums
 *   * @return {void} Do not return anything, modify nums in-place instead.
 *    */
var nextPermutation = function(nums) {
  const swap = (i, j) => {
    const tmp = nums[j]
    nums[j] = nums[i]
    nums[i] = tmp
  }

  let ix = nums.length - 1

  // 1, 1, 1, 1, 6, 5, 4, 3, 2, 1
  //         ix- ix
  while (nums[ix - 1] >= nums[ix]) --ix

  if (ix > 0) {
    const jx = findLargerThan(nums[ix - 1], ix, nums)

    // console.log({ ix, jx })
    // nums[ix - 1] < nums[ix] >= nums[ix + 1] >= ...

    swap(ix - 1, jx)
  }

  let i = ix
  let j = nums.length - 1

  while (i < j) {
    swap(i, j)
    ++i
    --j
  }

  // console.log(nums)

  function findLargerThan (x, start, xs) {
    let index = null
    let condidate = Number.MAX_SAFE_INTEGER
    for (let i = start; i < xs.length; ++i) {
      if (xs[i] > x && x < condidate) {
        condidate = xs[i]
        index = i
      }
    }
    return index
  }

};

var nextPermutation2 = function(nums) {
  const [x, ...xs] = nums
  const diff = (a, b) => a - b

  if (xs.length === 0) { return [x] }

  const ys = nextPermutation(xs)
  const c = cmp(xs, ys)

  console.log({ c })

  if (c === 1) {
    return [x, ...ys]
  } else {
    const ix = findNext(x, xs)
    if (ix === null) {
      return [x, ...xs].sort(diff)
    } else {
      const y = xs[ix]
      xs[ix] = x
      return [y, ...xs.sort(diff)]
    }
  }

  function cmp (a, b) {
    for (let i = 0; i < a.length; ++i) {
      if (a[i] < b[i]) return 1
      if (a[i] > b[i]) return -1
    }
    return 0
  }

  function findNext (x, xs) {
    let next = null
    let condidate = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < xs.length; ++i) {
      if (xs[i] > x && x < condidate) {
        condidate = x
        next = i
      }
    }
    return next
  }

};


console.log( nextPermutation([3, 1, 2]) )
console.log( nextPermutation([1]) )
console.log( nextPermutation([1, 2]) )
console.log( nextPermutation([2, 1]) )
console.log( nextPermutation([1, 3, 2]) )
console.log( nextPermutation([1, 2, 3]) )
console.log( nextPermutation([3, 2, 1]) )
console.log( nextPermutation([1, 1, 5]) )
console.log( nextPermutation([1, 1, 1, 1, 1, 1, 2]) )
console.log( nextPermutation([1, 1, 1, 1, 1, 2, 1]) )
console.log( nextPermutation([8, 7, 6, 5]) )
