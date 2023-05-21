const { directions } = require('./direction.js');

class Rover {
  #x
  #y
  #direction
  #previousOrientation
  #isActive
  #plateau

  constructor(x, y, direction, plateau) {
    this.#x = x;
    this.#y = y;
    this.#isActive = true;
    this.#direction = directions[direction];
    this.#plateau = plateau;
    this.#previousOrientation = { position: { x: this.#x, y: this.#y }, direction: this.direction };
  };

  get position() {
    return { x: this.#x, y: this.#y };
  };

  get previousOrientation() {
    return this.#previousOrientation;
  };

  get direction() {
    return this.#direction.name;
  };

  get orientation() {
    return { position: this.position, direction: this.direction };
  };

  get isActive() {
    return this.#isActive;
  };

  #updatePosition(x, y) {
    this.#x = x;
    this.#y = y;
  };

  #hasCrossedAbscissa() {
    return this.#x < 0 || this.#plateau.x < this.#x;
  };

  #hasCrossedOrdinate() {
    return this.#y < 0 || this.#plateau.y < this.#y;
  };

  #updateActivityFlag() {
    if (this.#hasCrossedAbscissa() || this.#hasCrossedOrdinate()) {
      this.#isActive = false;
    }
  };

  #updateState(x, y) {
    this.#updatePosition(x, y);
    this.#updateActivityFlag();
  };

  rotateRight() {
    this.#direction = directions[this.#direction.right];
  };

  rotateLeft() {
    this.#direction = directions[this.#direction.left];
  };

  #setPreviousOrientation() {
    this.#previousOrientation.position = { x: this.#x, y: this.#y };
  };

  moveForward() {
    const { x, y } = this.#direction.forward(this.position);
    this.#setPreviousOrientation();
    this.#updateState(x, y);
  };

  get dataFrame() {
    const position = (this.#isActive) ? this.orientation.position : this.#previousOrientation.position;
    return {
      position,
      direction: this.#direction.name,
      isActive: this.#isActive,
    };
  };

  toString() {
    return `${this.#x} ${this.#y} ${this.#direction.name} ${this.#isActive}`;
  };
}

exports.Rover = Rover;
