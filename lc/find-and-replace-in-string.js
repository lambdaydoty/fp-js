

/**
 * @param {string} S
 * @param {number[]} indexes
 * @param {string[]} sources
 * @param {string[]} targets
 * @return {string}
 */
var findReplaceString = function(S, indexes, sources, targets) {

  const data = Array.from(
    { length: indexes.length },
    (v, j) => ({ ix: indexes[j], s: sources[j], t: targets[j] })
  ).sort((a, b) => a.ix - b.ix)

  return recur(S, 0, data)

  function recur (str, i, data) {
    // console.log(str, i, data)
    if (data.length === 0) return str

    const n = str.length
    const [{ ix, s, t }, ...rest] = data

    if (i < ix) {
      const head = str.slice(0, ix - i)
      const tail = str.slice(ix - i, n)
      return head +
        recur(tail, ix, data)
    } else if (i === ix) {
      const head = str.slice(0, s.length)
      const tail = str.slice(s.length, n)
      return (head === s ? t : head) +
        recur(tail, i + head.length, rest)
    } else {
      throw new Error({ i, ix })
    }
  }

  // return recur(S, 0, indexes, sources, targets)

  // function recur (str, i, [ix, ...ixs], sources, targets) {
  //   const n = str.length
  //   const [source, ...ss] = sources
  //   const [target, ...ts] = targets
  //   if (i < ix) {
  //     const head = str.slice(0, ix)
  //     const rest = str.slice(ix, n)
  //     return head +
  //       recur(rest, ix, [ix, ...ixs], sources, targets)
  //   } else if (i === ix) {
  //     const head = str.slice(0, source.length)
  //     const rest = str.slice(source.length, n)
  //     return (head === source ? target : head) +
  //       recur(rest, i + head.length, ixs, ss, ts)
  //   } else {
  //     return str
  //   }
  // }
};


console.log(
  findReplaceString("abcd", [0,2], ["a","cd"], ["eee","ffff"]),
  findReplaceString("abcd", [0,2], ["ab","ec"], ["eee","ffff"]),
  findReplaceString("vmokgggqzp", [3,5,1], ["kg","ggq","mo"], ["s","so","bfr"])
)
