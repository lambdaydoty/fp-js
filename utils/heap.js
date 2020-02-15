const top = 0
const parent = i => ((i + 1) >>> 1) - 1
const left = i => (i * 2) + 1
const right = i => (i + 1) * 2

/**
 * default: cmp(x, y) > 0 iff x > y
 * minHeap: (x, y) => x - y
 * maxHeap: (x, y) => y - x
 */
module.exports = (_cmp = (x, y) => x - y) => ({
  heap: [],
  size () { return this.heap.length },
  isEmpty () { return this.size() === 0 },
  peek () { return this.heap[0] },
  isLeaf (i) { return left(i) >= this.size() },
  isTop (i) { return i === 0 },

  push (x) {
    this.heap.push(x)
    const bottom = this.size() - 1
    this.swim(bottom)
    return this.size()
  },

  pop () {
    const bottom = this.size() - 1
    this.swap(top, bottom)
    const y = this.heap.pop()
    this.sink(0)
    return y
  },

  swap (i, j) {
    ;([
      this.heap[i],
      this.heap[j],
    ] = [
      this.heap[j],
      this.heap[i],
    ])
  },

  swim (i) {
    if (this.isTop(i)) return
    const cmp = _cmp
    const p = parent(i)
    if (cmp(this.heap[p], this.heap[i]) > 0) {
      this.swap(p, i)
      this.swim(p)
    }
  },

  sink (i) {
    if (this.isLeaf(i)) return
    const cmp = (x, y) => y === undefined ? -1 : _cmp(x, y)
    const l = left(i)
    const r = right(i)
    const min = cmp(this.heap[l], this.heap[r]) > 0 ? r : l
    if (cmp(this.heap[i], this.heap[min]) > 0) {
      this.swap(i, min)
      this.sink(min)
    }
  },
})
