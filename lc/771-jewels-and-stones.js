var numJewelsInStones = function (J, S) {
  return (
    jmap => S
      .split('')
      .filter((s, _, __) => jmap[s] != null)
      .length
  )(J
    .split('')
    .reduce((acc, curr, _, __) => ({ ...acc, [curr]: 1 }), {})
  )
}

console.log(numJewelsInStones('aA', 'aAAbbbb'))
console.log(numJewelsInStones('z', 'ZZ'))
