const { describe, it } = require('node:test');
const { deepStrictEqual, strictEqual } = require('assert');
const { Rover } = require('../src/rover.js');

describe('Rover', () => {

  describe('rotateLeft', () => {

    it('should rotate an east-facing Rover, in the north direction', () => {
      const rover = new Rover(0, 0, 'E');
      rover.rotateLeft();

      const actual = rover.direction;
      const expected = 'N';

      strictEqual(actual, expected);
    });

    it('should rotate an west-facing Rover, in the south direction', () => {
      const rover = new Rover(0, 0, 'W');
      rover.rotateLeft();

      const actual = rover.direction;
      const expected = 'S';

      strictEqual(actual, expected);
    });

    it('should rotate an nortOBOBh-facing Rover, in the west direction', () => {
      const rover = new Rover(0, 0, 'N');
      rover.rotateLeft();

      const actual = rover.direction;
      const expected = 'W';

      strictEqual(actual, expected);
    });

    it('should rotate an south-facing Rover, in the east direction', () => {
      const rover = new Rover(0, 0, 'S');
      rover.rotateLeft();

      const actual = rover.direction;
      const expected = 'E';

      strictEqual(actual, expected);
    });

    it('should rotate a west-facing Rover in the north direction.', () => {
      const rover = new Rover(0, 0, 'W');
      rover.rotateLeft();

      const actual = rover.direction;
      const expected = 'S';

      strictEqual(actual, expected);
    });

  });


  describe('rotateRight', () => {

    it('should rotate an east-facing Rover, in the south direction', () => {
      const rover = new Rover(0, 0, 'E');
      rover.rotateRight();

      const actual = rover.direction;
      const expected = 'S';

      strictEqual(actual, expected);
    });

    it('should rotate an west-facing Rover, in the north direction', () => {
      const rover = new Rover(0, 0, 'W');
      rover.rotateRight();

      const actual = rover.direction;
      const expected = 'N';

      strictEqual(actual, expected);
    });

    it('should rotate an north-facing Rover, in the east direction', () => {
      const rover = new Rover(0, 0, 'N');
      rover.rotateRight();

      const actual = rover.direction;
      const expected = 'E';

      strictEqual(actual, expected);
    });

    it('should rotate an south-facing Rover, in the west direction', () => {
      const rover = new Rover(0, 0, 'S');
      rover.rotateRight();

      const actual = rover.direction;
      const expected = 'W';

      strictEqual(actual, expected);
    });

    it('should rotate a left-facing Rover, in the west direction.', () => {
      const rover = new Rover(0, 0, 'N');
      rover.rotateRight();

      const actual = rover.direction;
      const expected = 'E';

      strictEqual(actual, expected);
    });

  });

  describe('moveForward', () => {
    it('should move the rover in a forward direction by unit distance.', () => {
      const rover = new Rover(0, 0, 'N', { x: 5, y: 5 });
      rover.moveForward();
      rover.moveForward();

      const actual = rover.position;
      const expected = { x: 0, y: 2 };

      deepStrictEqual(actual, expected);
    });

    it('should direct the rover using all the instructions.', () => {
      const rover = new Rover(0, 0, 'N', { x: 5, y: 5 });
      rover.moveForward();
      rover.moveForward();
      rover.rotateLeft();
      rover.moveForward();
      rover.moveForward();
      rover.rotateRight();

      const actual = rover.orientation;
      const expected = { position: { x: -2, y: 2 }, direction: 'N' };

      deepStrictEqual(actual, expected);
    });
  });

});
