class Direction {
  #name
  #left
  #right
  #offset

  constructor(name, left, right, offset) {
    this.#name = name;
    this.#left = left;
    this.#right = right;
    this.#offset = offset;
  }

  get name() {
    return this.#name;
  }

  get right() {
    return this.#right;
  }

  get left() {
    return this.#left;
  }

  forward({ x, y }) {
    return { x: x + this.#offset.x, y: y + this.#offset.y };
  };
}

const EAST = new Direction('E', 'N', 'S', { x: 1, y: 0 });
const WEST = new Direction('W', 'S', 'N', { x: -1, y: 0 });
const NORTH = new Direction('N', 'W', 'E', { x: 0, y: 1 });
const SOUTH = new Direction('S', 'E', 'W', { x: 0, y: -1 });

const directions = { N: NORTH, E: EAST, S: SOUTH, W: WEST };

exports.directions = directions;