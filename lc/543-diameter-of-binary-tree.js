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
var diameterOfBinaryTree = function (root) {
  const isLeaf =
    node =>
      node && !node.left && !node.right

  let diam = 0

  depth(root)

  return diam

  function depth (root) {
    if (!root) return -1
    if (isLeaf(root)) return 0
    const { left, right } = root
    // console.log({ val }, diam)
    const l = depth(left)
    const r = depth(right)
    diam = Math.max(diam, l + r + 2)
    return Math.max(l, r) + 1
  }
}

function build (val, left = null, right = null) {
  return ({
    val,
    left,
    right,
  })
}

console.log(diameterOfBinaryTree(
  build(1,
    build(2,
      build(4),
      build(5)),
    build(3))
))
