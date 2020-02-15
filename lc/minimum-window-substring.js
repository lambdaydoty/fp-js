
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {

  const count = {
    length: 0,
    inc (key) {
      this[key] = (this[key] || 0) + 1
      if (this[key] === 0) {
        this.length--
      }
    },
    dec (key) {
      this[key] = (this[key] || 0) - 1
      if (this[key] === -1) {
        this.length++
      }
    },
    has (key) {
      return this[key] !== undefined
    },
  }

  t.split('').map(c => count.dec(c))

  const best = {
    left: 0,
    right: -1,
    size: Number.MAX_SAFE_INTEGER,
    update (l, r) {
      const check = r - l + 1
      if (check < this.size) {
        this.left = l
        this.right = r
        this.size = check
      }
    },
  }


  for (let l = 0, r = 0; r < s.length; r++) {
    if (count.has(s[r])) {
      count.inc(s[r])

      while (count.length === 0) { // valid window
        best.update(l, r)

        if (count.has(s[l])) {
          count.dec(s[l])
        }

        l++
      }
    }
  }

  return s.slice(best.left, best.right + 1)

};

console.log(
  minWindow("ADOBECODEBANC", "ABC"),
  minWindow("a", "aa"),
  minWindow("a", "x"),
  minWindow("cabwefgewcwaefgcf", "cae"),
)
