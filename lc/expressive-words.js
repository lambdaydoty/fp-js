/**
 *  * @param {string} S
 *   * @param {string[]} words
 *    * @return {number}
 *     */
var expressiveWords = function(S, words) {

  return words.map(w => isStretchy(S, w)).filter(x => x).length

  function isStretchy (xs, y) {
    // console.log([xs, y])
    if (xs === '' && y === '') return true
    if (xs !== '' && y === '') return false
    if (xs === '' && y !== '') return false
    const [xsPrefix, xsSuffix] = destruct(xs)
    const [yPrefix, ySuffix] = destruct(y)
    // console.log({ xsPrefix, xsSuffix, yPrefix, ySuffix })
    return isExtension(xsPrefix, yPrefix) && isStretchy(xsSuffix, ySuffix)
  }

  function destruct (str) {
    const n = str.length
    const arr = str.split('')
    const c = arr[0]
    let i = 0
    while (i < n && arr[i] === c) {
      i++
    }
    return [str.slice(0, i), str.slice(i, n)]
  }

  function isExtension (xs, x) {
    return xs === x ||
      (xs[0] === x[0] && xs.length >= x.length && xs.length >= 3)
  }

};

console.log(
  expressiveWords('heeellooo', ['hello', 'hi', 'helo']),
  // expressiveWords('hhhellooo', ['hello', 'hi', 'helo']),
  // expressiveWords('oooo', ['hello', 'hi', 'helo']),
)
