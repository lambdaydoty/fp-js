/**
 * ref: https://folktale.origamitower.com/api/v2.3.0/en/folktale.core.lambda.html
 */
const counter = {
  value: 0,
  next () { return ++this.value },
  reset () { this.value = 0 },
}

console.log(
  counter.next(),
  counter.next(),
  counter.next(),
  counter.next(),
)

counter.reset()

const test0 = Array.from({ length: 5 })

console.log('')
console.log('@laziness')
console.log(
  test0
    .map(_ => counter.next())
)

counter.reset()

console.log('')
console.log('@eagerness')
console.log(
  test0
    .map((x => _ => x)(counter.next()))
)

const { S: { K, map } } = require('./sanc')

counter.reset()

console.log('')
console.log('@eagerness via S.K')
console.log(
  map(
    K(counter.next())
  )(
    test0
  )
)
