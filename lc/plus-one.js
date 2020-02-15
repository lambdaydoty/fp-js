/**
 *  * @param {number[]} digits
 *   * @return {number[]}
 *    */
var plusOne = function(digits) {

  let carry = 1
  for (k = digits.length - 1; k >= 0; k--) {
    const sum = digits[k] + carry
    digits[k] = sum % 10
    carry = Math.floor(sum / 10)
  }

  return carry ? [1, ...digits] : digits

};

console.log(
  plusOne([0]),
  plusOne([1]),
  plusOne([1,0]),
  plusOne([1,2,3]),
  plusOne([4,3,2,1]),
  plusOne([9,9,9]),
)
