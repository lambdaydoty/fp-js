
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  const swap = ([i, j], [x, y]) => {
    const tmp = matrix[i][j]
    matrix[i][j] = matrix[x][y]
    matrix[x][y] = tmp
  }

  const dim = matrix.length

  for (let i = 0; i < dim; i++) {
    for (let j = i + 1; j < dim; j++) {
      swap([i, j], [j, i])
    }
  }

  for (let i = 0; i < dim; i++) {
    const row = matrix[i]
    let j = 0
    let k = dim - 1
    while (j < k) {
      const tmp = row[j]
      row[j] = row[k]
      row[k] = tmp
      j++
      k--
    }
  }

  console.log(matrix)
};

console.log(
  rotate(
    [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ],
  )
)

console.log(
  rotate(
    [
        [ 5, 1, 9,11 ],
        [ 2, 4, 8,10 ],
        [13, 3, 6, 7],
        [15,14,12,16]
    ],
  )
)
