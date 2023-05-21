const { describe, it } = require('node:test');
const { deepStrictEqual } = require('assert');
const {
  positionalInstruction,
  parseCommands,
  createRovers, createPlateau
} = require('../src/rover-parser.js');

describe('parseRover', () => {

  describe('parsePositionalInstruction', () => {
    it('should parse a valid position', () => {
      const positionData = ['0 0 N', '0 1 E', '1: MMRL'];

      const actual = positionalInstruction(positionData, 2);
      const expected = ['0 0 N', '0 1 E'];

      deepStrictEqual(actual, expected);
    });
  });

  describe('parseCommands', () => {
    it('Should parse commands from instructions', () => {
      const instruction = ['1:MMMRMML'];

      const actual = parseCommands(instruction);
      const expected = [{
        roverNumber: 1,
        commands: ['M', 'M', 'M',
          'R', 'M', 'M', 'L']
      }];

      deepStrictEqual(actual, expected);
    });

  });

  describe('createRovers', () => {
    it('Should create a rover with specified attributes.', () => {
      const roverData = ['2 1 W'];
      const rovers = createRovers(roverData);

      const actual = rovers[0].position;
      const expected = { x: 2, y: 1 };

      deepStrictEqual(actual, expected);

    });

  });

  describe('createPlateau', () => {
    it('Should create a plateau of the specified area.', () => {
      const plateauArea = '5 5';

      const actual = createPlateau(plateauArea);
      const expected = { x: 5, y: 5 };

      deepStrictEqual(actual, expected);
    })
  });

});
