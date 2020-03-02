/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

Array.prototype.flatMap = /* eslint no-extend-native: "never" */
  function (fn) {
    return this.reduce((acc, x) => acc.concat(fn(x)), [])
  }

var levelOrder = function (root) {
  const adjacent =
    n => [
      n.left,
      n.right,
    ].filter(x => x)

  const formatter =
    nodes => [
      nodes.map(x => x.val)
    ]

  function bfs2 (nodes) {
    // console.log({ nodes })
    nodes.forEach(n => { n.visited = true })
    return (nodes.length === 0)
      ? []
      : formatter(nodes).concat(
        bfs2(nodes.flatMap(
          n =>
            adjacent(n)
              .filter(m => !m.visited)
        ))
      )
  }

  return root === null
    ? []
    : bfs2([root])
};

function build (val, left = null, right = null) {
  return ({ val, left, right })
}

const test0 =
  build(3,
    build(9),
    build(20,
      build(15),
      build(7),
    ))

console.log(
  levelOrder(test0)
)
console.log(
  levelOrder(null)
)
