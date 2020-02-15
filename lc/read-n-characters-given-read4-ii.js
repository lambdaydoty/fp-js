/**
 *  * Definition for read4()
 *
 * @param {character[]} buf Destination buffer
 * @return {number} The number of characters read
 * read4 = function(buf) {
 *     ...
 * };
 */

/**
 * @param {function} read4()
 * @return {function}
 */

var solution = function(read4) {

  function* gen (r4) {
    const local = []
    let num = 0
    do {
      num = r4(local)
      for (let i = 0; i < num; i++) {
        yield local[i]
      }
    } while (num === 4)
  }

  const read1 = gen(read4)

  /**
   * @param {character[]} buf Destination buffer
   * @param {number} n Number of characters to read
   * @return {number} The number of actual characters read
   */
  return function(buf, n) {

    let i = 0
    while (i < n) {
      const { value, done } = read1.next()
      if (done) break
      buf.push(value)
      i++
    }

    return i

  };

};
