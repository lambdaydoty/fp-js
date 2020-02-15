/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let ptr = head
  for (let i = 0; i < n; i++) {
    ptr = ptr.next
  }

  if (!ptr) {
    // remove the first element
    return head.next
  }

  let left = head
  let right = ptr
  for (; right.next; left = left.next, right = right.next);

  left.next = left.next.next

  return head
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
  removeNthFromEnd(
    build(1, build(2, build(3, build(4, build(5))))),
    2,
  )
)

console.log(
  removeNthFromEnd(
    build(1),
    1,
  )
)
