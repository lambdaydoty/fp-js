/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function(S, K) {
  String.prototype.reverse = function () {
    return this
      .split('')
      .reverse()
      .join('')
  }

  const isNil = x => x === null || x === undefined
  const defaultTo = val => n => {
    return isNil(n)
      ? val
      : n
  }

  return defaultTo([])(S
    .toUpperCase()
    .replace(/\-/g, '')
    .reverse()
    .match(new RegExp(`.{1,${K}}`, 'g'))
  )
    .reverse()
    .map(x => x.reverse())
    .join('-')
}

console.log(
  licenseKeyFormatting('5F3Z-2e-9-w', 4),
  licenseKeyFormatting('2-5g-3-J', 2),
  licenseKeyFormatting('---', 3),
)
