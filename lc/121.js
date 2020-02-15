

var maxProfit = function (prices) {
  const { length: len } = prices
  let minprice = Number.MAX_SAFE_INTEGER
  let maxprofit = 0
  for (j = 0; j < len; ++j) {
    const currprice = prices[j]
    maxprofit = Math.max(maxprofit, currprice - minprice)
    minprice = Math.min(minprice, currprice)
  }
  return maxprofit
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]))

// AC
var maxProfit3 = function (prices) {
  const { length: len } = prices
  let answer = 0
  for (j = 0; j < len; ++j) {
    for (i = 0; i < j; ++i) {
      answer = Math.max(answer, prices[j] - prices[i])
    }
  }
  return answer
}

// Runtime Error (199/200)
var maxProfit2 = function (prices) {
  return Math.max(
    0,
    ...pairs(prices.length)
      .map(([j, i]) => prices[j] - prices[i])
  )
  function pairs (n) {
    if (n === 0) return []
    if (n === 1) return []
    if (n === 2) return [[1,0]]
    // if (n === 3) return [[1,0], [2, 0], [2, 1]]
    const max = n - 1
    const toplevel = Array.from({ length: max }, (x, i) => [max, i])
    return toplevel.concat(pairs(n - 1))
  }
}

