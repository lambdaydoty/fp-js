/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  return recur(l1, l2)

  function recur (l1, l2, carry = 0) {
    // console.log({ l1, l2, carry })
    const one = build(1)
    const { val: v1, next: n1 } = l1 || {}
    const { val: v2, next: n2 } = l2 || {}
    if (!l1 && !l2) return carry ? one : null
    if (!l1) return carry ? recur(l2, one) : l2
    if (!l2) return carry ? recur(l1, one) : l1
    const r = (v1 + v2 + carry) % 10
    const c = Math.floor((v1 + v2 + carry) / 10)
    return build(
      r,
      recur(n1, n2, c),
    )
  }
}

function build (val, next = null) {
  return ({
    val,
    next,
    toString () {
      return `${val}` +
        (next ? ` -> ${next.toString()}` : '')
    },
  })
}

console.log(
  addTwoNumbers(
    build(2, build(4, build(3))),
    build(5, build(6, build(4))),
  ).toString()
)

console.log(
  addTwoNumbers(
    build(5),
    build(5),
  ).toString()
)
