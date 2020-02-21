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
var maxPathSum = function (root) {
  const maximizer = () => ({
    _x: Number.MIN_SAFE_INTEGER,
    update (x) {
      if (this._x < x) {
        // console.log(`@update: ${x}`)
        this._x = x
      }
    },
    val () {
      return this._x
    },
  })

  const ans = maximizer()

  /**
   * @recur: calculate the max sum from `node` to a leaf
   */
  function recur (node) {
    if (!node) return 0
    const left = Math.max(recur(node.left), 0)
    const right = Math.max(recur(node.right), 0)

    // console.log({ val: node.val, left, right })

    ans.update(left + right + node.val)

    return node.val + Math.max(left, right)
  }

  recur(root)

  return ans.val()
}

function build (val, left = null, right = null) {
  return { val, left, right }
}

console.log(maxPathSum(
  build(4,
    build(11,
      build(7),
      build(2),
    ),
    build(13),
  ),
))

console.log(maxPathSum(
  build(-10,
    build(9),
    build(20,
      build(15),
      build(7),
    ),
  ),
))

console.log(maxPathSum(
  build(-15,
    build(5,
      build(-8,
        build(2),
        build(6))),
    build(6,
      build(3),
      build(9,
        null,
        build(0,
          build(4),
          build(-1,
            build(10),
            null))))),
))
