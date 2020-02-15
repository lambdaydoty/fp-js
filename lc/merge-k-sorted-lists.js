/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {

  /* tail call optimization */
  const trampoline = fn => (...args) => {
    let result = fn(...args)
    while (typeof result === 'function') { result = result() }
    return result
  }

  return lists.reduce(
    (acc, curr) => trampoline(merge)(acc, curr),
    null,
  )

  /* merge() with continuation passing style */
  function merge (A, B, conti = x => x) {
    const { val: aVal, next: aNext } = B || {}
    const { val: bVal, next: bNext } = B || {}
    if (A === null) return conti(B)
    if (B === null) return conti(A)
    return (aVal <= bVal)
      ? () => merge(aNext, B, result => conti(build(aVal, result))) // thunkify merge()
      : () => merge(A, bNext, result => conti(build(bVal, result))) // thunkify merge()
  }
}

function ListNode (val) {
  this.val = val
  this.next = null

  this.toString = function () {
    return (this.next === null)
      ? `${val}`
      : `${val}->${this.next.toString()}`
  }
}

function build (val, next = null) {
  const node = new ListNode(val)
  node.next = next
  return node
}

const test0 = [
  build(1, build(4, build(5))),
  build(1, build(3, build(4))),
  build(2, build(6)),
]


// console.log(
//   mergeKLists(test0).toString(),
// )

/**
 * use priority queue
 */
function mergeKLists2 (lists) {
  const Q = require('./_priorityQ')
  const q = new Q()

  lists.forEach(list => {
    for (n = list; n !== null; n = n.next) {
      q.push(n.val)
    }
  })

  let head = q.isEmpty() ? null : { val: q.pop(), next: null }
  let curr = head
  while (!q.isEmpty()) {
    curr.next = { val: q.pop(), next: null }
    curr = curr.next
  }

  return head
}

console.log(
  mergeKLists2(
    test0,
  )
)
/////////////////////////////////////////////////////

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// naive version
var mergeKLists1 = function(lists) {

  return lists.reduce(
    (acc, curr) => merge(acc, curr),
    null,

  )

  function merge (A, B) {
    const { val: aVal, next: aNext  } = A || {}
    const { val: bVal, next: bNext  } = B || {}
    if (A === null) return B
    if (B === null) return A
    return (aVal <= bVal)
      ? build(aVal, merge(aNext, B))
      : build(bVal, merge(A, bNext))

  }

  function ListNode (val) {

    this.val = val
    this.next = null

    this.toString = function () {
      return (this.next === null)
        ? `${val}`
        : `${val}->${this.next.toString()}`

    }

  }

  function build (val, next = null) {
    const node = new ListNode(val)
    node.next = next
    return node

  }


};
