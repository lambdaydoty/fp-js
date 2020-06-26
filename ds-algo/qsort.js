function qsort ([h, ...tail]) {
  return (h === undefined)
    ? []
    : qsort(lesser(h))
        .concat([h])
        .concat(qsort(larger(h)))
  function lesser (x) { return tail.filter(y => y <= x) }
  function larger (x) { return tail.filter(y => y > x) }
}

console.log(
  qsort([0, 9, 2, 6, 7, 2, 7, 2, 1, 2])
)
