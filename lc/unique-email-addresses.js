/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function(emails) {
  const hash = emails
    .map(m => m.split('@'))
    .map(([localName, domainName]) => [
      localName
        .replace(/\./g, '')
        .replace(/\+.*$/g, ''),
      domainName,
    ])
    .map(m => m.join('@'))
    .reduce((acc, curr, ix) => ({ [curr]: ix, ...acc }), {})
  return Object.keys(hash).length
}

var numUniqueEmails2 = function(emails) {
  const replaced = emails
    .map(m => m.split('@'))
    .map(([localName, domainName]) => [
      localName
        .replace(/\./g, '')
        .replace(/\+.*$/g, ''),
      domainName,
    ])
    .map(m => m.join('@'))
  return [...new Set(replaced)].length
}


console.log(
  numUniqueEmails2([
    'test.email+alex@leetcode.com',
    'test.e.mail+bob.cathy@leetcode.com',
    'testemail+david@lee.tcode.com',
  ])
)
