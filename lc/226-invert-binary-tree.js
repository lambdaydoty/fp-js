/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {

  return root === null
    ? null
    : tree(
      root.val,
      invertTree(root.right),
      invertTree(root.left),
    )

};

function Node(val) {
  this.val = val;
  this.left = this.right = null;
}

function tree (x, left = null, right = null) {
  const root = new Node(x)
  root.left = left
  root.right = right
  return root
}

function toArray (root) {
  const q = []
  const arr = []

  q.push(root)
  while (q.length) {
    const { val, left, right } = q.shift()
    arr.push(val)
    if (left !== null) q.push(left)
    if (right !== null) q.push(right)
  }
  return arr
}

const test = tree(
  4,
  tree(
    2,
    tree(1),
    tree(3),
  ),
  tree(
    7,
    tree(6),
    tree(9),
  ),
)

console.log(
  toArray(test),
  toArray(invertTree(test)),
)
