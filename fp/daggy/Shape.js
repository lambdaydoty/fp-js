const daggy = require('daggy')

// Coord :: (Int, Int, Int) -> Coord
const Coord = daggy.tagged('Coord',
  ['x', 'y', 'z'],
)

// Line :: (Coord, Coord) -> Line
const Line = daggy.tagged('Line',
  ['from', 'to'],
)

Coord.prototype.translate = function (x, y, z) {
  return Coord(
    this.x + x,
    this.y + y,
    this.z + z,
  )
}

const origin = Coord(0, 0, 0)

const myLine = Line(
  origin,
  origin.translate(2, 4, 6),
)

console.log({ myLine })

const Shape = daggy.taggedSum('Shape', {
  // Square :: (Coord, Coord) -> Shape
  Square: ['topleft', 'bottomright'],

  // Circle :: (Coord, Number) -> Shape
  Circle: ['center', 'radius'],
})

Shape.prototype.translate = function (x, y, z) {
  return this.cata({
    Square: (topleft, bottomright) => Shape.Square(
      topleft.translate(x, y, z),
      bottomright.translate(x, y, z),
    ),

    Circle: (center, radius) => Shape.Circle(
      center.translate(x, y, z),
      radius,
    ),
  })
}

console.log(
  Shape
    .Square(Coord(2, 2, 0), Coord(3, 3, 0))
    .translate(3, 3, 3)
)

console.log(
  Shape
    .Circle(Coord(1, 2, 3), 8)
    .translate(6, 5, 4)
)
