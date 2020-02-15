
const top = 0
const parent = i => ((i + 1) >>> 1) - 1  // (i + 1) / 2 - 1
const left = i => (i << 1) + 1           // i * 2 + 1
const right = i => (i + 1) << 1    // (i + 1) * 2

class PriorityQ {
  constructor (comparator = (a, b) => a > b) {
    this._heap = []
    this._comparator = comparator
  }

  size () {
    return this._heap.length
  }

  isEmpty () {
    return this.size() === 0
  }

  peak () {
    return this._heap[top]
  }

  push (...values) {
    values.forEach(v => {
      this._heap.push(v)
      this._swim()
    })
    return this.size()
  }

  pop () {
    this._swap(top, this.size() - 1)
    const v = this._heap.pop()
    this._sink()
    return v
  }

  _swap (i, j) {
    ;([
      this._heap[i],
      this._heap[j],
    ] = [
      this._heap[j],
      this._heap[i],
    ])
  }

  _swim () {
    const bottom = this.size() - 1
    for (
      let i = bottom;
      this._heap[i] < this._heap[parent(i)];
      i = parent(i)
    ) { this._swap(i, parent(i)) }
  }

  _sink () {
    const size = this.size()
    for (
      let i = top;
      (left(i) < size && this._heap[i] > this._heap[left(i)]) ||
      (right(i) < size && this._heap[i] > this._heap[right(i)]);
    ) {
      const min = (right(i) < size && this._heap[right(i)] < this._heap[left(i)]) ? right(i) : left(i)
      this._swap(i, min)
      i = min
    }
  }
}

module.exports = PriorityQ
