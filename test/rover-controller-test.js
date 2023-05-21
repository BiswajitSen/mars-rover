const { describe, it } = require('node:test');
const { deepStrictEqual } = require('assert');
const { Rover } = require('../src/rover.js');
const { RoverController } = require('../src/rover-controller.js');

describe('roverManager', () => {
  describe('execute', () => {

    describe('moveForward', () => {

      it('should move a east-facing rover 1 unit forward in the x-axis.', () => {
        const rover = new Rover(0, 0, 'E', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['M'] }];

        roverManager.execute(instructions);

        const actual = rover.position;
        const expected = { x: 1, y: 0 };

        deepStrictEqual(expected, actual);
      });

      it('should not move a west-facing rover 1 unit forward in the -ve x-axis should get the last location.', () => {
        const rover = new Rover(0, 0, 'W', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['M'] }];

        roverManager.execute(instructions);

        const actual = rover.position;
        const expected = { x: -1, y: 0 };

        deepStrictEqual(expected, actual);
      });
      it('should move a north-facing rover 1 unit forward in the y-axis.', () => {
        const rover = new Rover(0, 0, 'N', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['M'] }];

        roverManager.execute(instructions);

        const actual = rover.position;
        const expected = { x: 0, y: 1 };

        deepStrictEqual(expected, actual);
      });

      it('should not move a south-facing rover 1 unit forward in the -ve y-axis should get the last location.', () => {
        const rover = new Rover(0, 0, 'S', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['M'] }];

        roverManager.execute(instructions);

        const actual = rover.position;
        const expected = { x: 0, y: -1 };

        deepStrictEqual(expected, actual);
      });


    });

    describe('rotateRight', () => {

      it('should rotate a east-facing rover to south.', () => {
        const rover = new Rover(0, 0, 'E', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['R'] }];

        roverManager.execute(instructions);

        const actual = rover.direction;
        const expected = 'S';

        deepStrictEqual(expected, actual);
      });

      it('should rotate a west-facing rover to north.', () => {
        const rover = new Rover(0, 0, 'W', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['R'] }];

        roverManager.execute(instructions);

        const actual = rover.direction;
        const expected = 'N';

        deepStrictEqual(expected, actual);
      });

      it('should rotate a north-facing rover to east.', () => {
        const rover = new Rover(0, 0, 'N', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['R'] }];

        roverManager.execute(instructions);

        const actual = rover.direction;
        const expected = 'E';

        deepStrictEqual(expected, actual);
      });

      it('should rotate a south-facing rover to west.', () => {
        const rover = new Rover(0, 0, 'S', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['R'] }];

        roverManager.execute(instructions);

        const actual = rover.direction;
        const expected = 'W';

        deepStrictEqual(expected, actual);
      });


    });

    describe('rotateLeft', () => {
      it('should rotate a east-facing rover to north.', () => {
        const rover = new Rover(0, 0, 'E', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['L'] }];

        roverManager.execute(instructions);

        const actual = rover.direction;
        const expected = 'N';

        deepStrictEqual(expected, actual);
      });

      it('should rotate a west-facing rover to south.', () => {
        const rover = new Rover(0, 0, 'W', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['L'] }];

        roverManager.execute(instructions);

        const actual = rover.direction;
        const expected = 'S';

        deepStrictEqual(expected, actual);
      });

      it('should rotate a north-facing rover to west.', () => {
        const rover = new Rover(0, 0, 'N', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['L'] }];

        roverManager.execute(instructions);

        const actual = rover.direction;
        const expected = 'W';

        deepStrictEqual(expected, actual);
      });

      it('should rotate a south-facing rover to west.', () => {
        const rover = new Rover(0, 0, 'S', { x: 5, y: 5 });
        const roverManager = new RoverController([rover]);
        const instructions = [{ roverNumber: 1, commands: ['L'] }];

        roverManager.execute(instructions);

        const actual = rover.direction;
        const expected = 'E';

        deepStrictEqual(expected, actual);
      });

    });

    describe('execution log', () => {
      it('should execute the commands and return the resultant log', () => {
        const rover1 = new Rover(0, 0, 'E', { x: 5, y: 5 });
        const rover2 = new Rover(0, 1, 'S', { x: 5, y: 5 });

        const instructions = [
          { roverNumber: 1, commands: ['L'] },
          { roverNumber: 2, commands: ['M'] }
        ];
        const roverManager = new RoverController([rover1, rover2]);
        roverManager.execute(instructions);

        const actual = roverManager.dataFrame;
        const expected = [
          { position: { x: 0, y: 0 }, direction: 'N', isActive: true },
          { position: { x: 0, y: 0 }, direction: 'S', isActive: true }
        ];

        deepStrictEqual(actual, expected);
      });

      it("shouldn't execute the commands and if rover is already dead, and return the last orientataion.", () => {
        const rover1 = new Rover(0, 0, 'E', { x: 2, y: 2 });
        const rover2 = new Rover(0, 1, 'N', { x: 2, y: 2 });

        const instructions = [
          { roverNumber: 1, commands: ['L', 'L', 'M'] },
          { roverNumber: 2, commands: ['M'] }
        ];
        const roverManager = new RoverController([rover1, rover2]);
        roverManager.execute(instructions);

        const actual = roverManager.dataFrame;
        const expected = [
          { position: { x: 0, y: 0 }, direction: 'W', isActive: false },
          { position: { x: 0, y: 2 }, direction: 'N', isActive: true }
        ];

        deepStrictEqual(actual, expected);
      });

    });

  });

});

