const isExisted = x => x.valueOf() !== undefined && x.valueOf() !== null

const ifExists = x => ({
  map: fn => isExisted(x) ? x.map(fn) : x,
})

module.exports = ifExists
