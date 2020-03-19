/**
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
const superEggDrop = function (K, N) {
  const range =
    (a, b) => Array.from({ length: b - a }, (_, i) => a + i)

  // :: (a -> String) -> (a -> b) -> a -> b
  const memoize =
    (key = x => x) =>
      f => {
        const table = {}
        return (...args) => {
          const k = key(...args)
          if (table[k] === undefined) {
            table[k] = f(...args)
          }
          return table[k]
        }
      }

  const recur =
    (k, h) =>
      (k === 1) ? h
        : (h <= 1) ? h
          : /* otherwise */ 1 + Math.min(
            ...range(1, h).map(
              l => Math.max(
                drop(k, h - l),
                drop(k - 1, l - 1),
              ))
          )

  const drop = memoize((k, h) => `(${k},${h})`)(recur)

  return drop(K, N)
}

const superEggDrop2 = function (K, N) {
  const table =
    Array.from({ length: K + 1 },
      () => Array.from({ length: N + 1 })
    )

  for (let j = 1; j <= N; ++j) table[1][j] = j
  for (let i = 1; i <= K; ++i) table[i][0] = 0
  for (let i = 1; i <= K; ++i) table[i][1] = 1
  for (let j = 2; j <= N; ++j) {
    for (let i = 2; i <= K; ++i) {
      let min = Number.MAX_SAFE_INTEGER
      for (let l = 1; l < j; ++l) {
        min = Math.min(
          min,
          Math.max(
            table[i][j - l],
            table[i - 1][l - 1],
          ),
        )
      }
      table[i][j] = 1 + min
    }
  }

  return table[K][N]
}

module.exports = { superEggDrop, superEggDrop2 }

// console.log(superEggDrop(1, 1))
// console.log(superEggDrop(1, 6))
// console.log(superEggDrop(2, 3))
// console.log(superEggDrop2(3, 14))
// console.log(superEggDrop2(3, 500))
console.log(superEggDrop2(13, 8192))
// console.log(superEggDrop(2, 2))
// console.log(superEggDrop2(3, 2))
// console.log(superEggDrop(4, 5000))
