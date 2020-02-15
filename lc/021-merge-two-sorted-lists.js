/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  const trampoline = fn => (...args) => {
    let result = fn(...args)
    while (typeof result === 'function') {
      result = result()
    }
    return result
  }

  let result = null
  trampoline(merge)(l1, l2, r => { result = r })
  return result

  function merge (l1, l2, conti = x => x) {
    // console.log({ l1, l2 })
    const { val: v1, next: n1 } = l1 || {}
    const { val: v2, next: n2 } = l2 || {}
    if (l1 === null) return conti(l2)
    if (l2 === null) return conti(l1)
    // l1 !== null && l2 !== null
    return (v1 <= v2)
      ? () => merge(n1, l2, r => conti(build(v1, r))) // thunkify
      : () => merge(l1, n2, r => conti(build(v2, r))) // thunkify
  }
}

function build (val, next = null) {
  return { val, next }
}

function print ({ val, next }) {
  return `${val}` + (
    (next === null)
      ? ''
      : ` -> ${print(next)}`
  )
}

const test0 = build(1, build(2, build(4)))
const test1 = build(1, build(3, build(4)))

console.log(
  print(
    mergeTwoLists(test0, test1),
  )
)
