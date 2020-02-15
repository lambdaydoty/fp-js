/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {


};

function build (val, next = null) {
  return {
    val,
    next,
    random: undefined,
  }
}

function toArray (list) {
  return (list === null)
    ? []
    : [list, ...toArray(list.next)]
}

const test0 = build(7,
  build(13,
    build(11,
      build(10,
        build(1)))))

const arr0 = toArray(test0)
arr0[0].random = null
arr0[1].random = arr0[0]
arr0[2].random = arr0[4]
arr0[3].random = arr0[2]
arr0[4].random = arr0[0]

const util = require('util')

console.log(util.inspect(
  test0,
  false,
  null,
  true,
))

console.log(toArray(
  test0,
))
