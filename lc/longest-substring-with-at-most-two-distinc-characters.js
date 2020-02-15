/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {

  const count = {

    nDistinct: 0,

    inc (key) {
      this[key] = (this[key] || 0) + 1
      if (this[key] === 1) {
        this.nDistinct++
      }
    },

    dec (key) {
      this[key] = (this[key] || 0) - 1
      if (this[key] === 0) {
        this.nDistinct--
      }
    },

  }

  const best = {

    length: 0,
    // left: null,
    // right: null,

    update (l, r) {
      if (r - l > this.length) {
        this.length = r - l
        // this.left = l
        // this.left = l
      }
    },

  }

  let l = 0
  let r = 0
  while (r < s.length) {
    count.inc(s[r])
    r++

    while (count.nDistinct > 2) {
      count.dec(s[l])
      l++
    }

    best.update(l, r) // NOTE: at most 2, 1 is OK
  }

  return best.length

};

console.log(
  lengthOfLongestSubstringTwoDistinct(
    'eceba',
  )
)

console.log(
  lengthOfLongestSubstringTwoDistinct(
    'ccaabbb',
  )
)
