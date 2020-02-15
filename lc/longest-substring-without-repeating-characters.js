/**
 * @param {string}
 * @return {number}
 */
var lengthOfLongestSubstring = function(str) {
  let total = 0
  const w = { start: 0, end: 0 } // window
  const types = new Set()

  for (let i = 0; i < str.length; ++i) {
    const c = str[i]
    while (types.has(c)) {
      const c0 = str[w.start]
      types.delete(c0)
      w.start++
    }
    types.add(c)
    w.end++
    total = Math.max(total, w.end - w.start)
  }

  return total
};

/**
 * @param {number[]} tree
 * @return {number}
 */
var totalFruit = function(tree) {
  /*
   *               i
   *               |
   *               v
   *
   *  [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]
   *
   *   ^        ^
   *   |        |
   * start     end
   *
   *   types: { _size: 2, '3': 3, '1': 1, }
   *
   *                 | add tree[i] === 2
   *                 v
   *
   *   types: { _size: 3, '3': 3, '1': 1, '2': 1}
   *
   *                 | exclude prefix of 3's
   *                 v
   *
   *   types: { _size: 2, '3': 0, '1': 1, '2': 1}
   *
   *
   *   total = 4
   */
  let total = 0
  const w = { start: 0, end: 0 } // window
  const types = { // types DS
    _size: 0,
    size () { return this._size },
    inc (t) {
      if (this[t] === undefined || this[t] === 0) {
        this[t] = 1
        this._size++
      } else {
        this[t]++
      }
    },
    dec (t) {
      this[t]--
      if (this[t] === 0) {
        this._size--
      }
    },
  }

  for (let i = 0; i < tree.length; ++i) {
    const t = tree[i]
    types.inc(t)
    w.end++
    while (types.size() > 2) {
      const t0 = tree[w.start]
      types.dec(t0)
      w.start++
    }
    total = Math.max(total, w.end - w.start)
  }

  return total
}


console.log(
  lengthOfLongestSubstring("abcabcbb"),
  lengthOfLongestSubstring("bbbbb"),
  lengthOfLongestSubstring("pwwkew"),
)
