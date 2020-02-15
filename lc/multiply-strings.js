/**
 *  * @param {string} num1
 *   * @param {string} num2
 *    * @return {string}
 *     */
var multiply = function(num1, num2) {
  const BASE = 100000
  const WIDTH = 5

  return recur(num1, num2).replace(/^0+[1-9]/, '')

  function recur (num1, num2) {
    const n1 = num1.length
    const n2 = num2.length

    if (n1 > WIDTH) {
      const m = Math.floor(n1 / 2)
      const msb = recur(num1.slice(0, m), num2)
      const lsb = recur(num1.slice(m, n1), num2)
      return addition(
        msb + '0'.repeat(n1 - m),
        lsb,
      )
    } else if (n2 > WIDTH ){
      return recur(num2, num1)
    } else {
      return String(Number(num1) * Number(num2))
    }
  }

  function addition (num1, num2) {
    let numA = null
    let numB = null

    if (num1.length < num2.length) {
      numA = num2
      numB = num1
    } else {
      numA = num1
      numB = num2
    }

    // assert( numA.length >= numB.length )

    // numA, i
    // numB, j
    // sum, k

    const sum = Array.from({ length: numA.length + 1 })

    let carry = 0
    let i = numA.length - 1
    let j = numB.length - 1
    let k = sum.length - 1
    while (k >= 0) {
      const s = Number(numA[i] || 0) + Number(numB[j] || 0) + carry
      sum[k] = String(s % 10)
      carry = Math.floor(s / 10)
      k--
      i--
      j--
    }
    console.log({ numA, numB, sum })
    return sum.join('')
  }

};

console.log(
  multiply('123456789', '987654321'),
  // multiply('0', '0'),
  // multiply('2', '3'),
  // multiply('123', '456'),
  // multiply('1111111111111111111', '99999'),
  // multiply('1111111111111111111', '999999'),
  // multiply('999', '1'),
)
