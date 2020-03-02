/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const trampoline = fn => (...args) => {
  let r = null
  for (
    r = fn(...args);
    typeof r === 'function';
    r = r()
  );
  return r
}

var countNodes = function (root) {
  // const count =
  //   node =>
  //     node === null
  //       ? 0
  //       : 1 + count(node.left) + count(node.right)

  const count =
    (node, k) =>
      node === null
        ? k(0)
        : () => count(node.left, x => () => count(node.right, y => k(1 + x + y)))

  const count0 = trampoline(count)

  let ans = null

  count0(root, r => { ans = r })

  return ans
}

function build (val, left = null, right = null) {
  return ({ val, left, right })
}

const test0 =
  build(1,
    build(2,
      build(4),
      build(5),
    ),
    build(3,
      build(6),
      null,
    )
  )

console.log(countNodes(test0))
