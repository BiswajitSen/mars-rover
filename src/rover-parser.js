const { Rover } = require('./rover.js');

const positionalInstruction = (instructions, noOfRovers) => {
  return instructions.slice(0, noOfRovers);
};

const parseCommands = (instructions) => {
  return instructions.map((instruction) => {
    const [roverNumber, commands] = instruction.split(':');

    return { roverNumber: +roverNumber, commands: commands.trim().split('') };
  });
};

const createRovers = (positions, plateau) => {
  return positions.map((position) => {
    const [x, y, direction] = position.split(' ');

    return new Rover(+x, +y, direction, plateau)
  });
};

const createPlateau = (area) => {
  const [x, y] = area.split(' ');

  return { x: +x, y: +y };
};

const parseRover = (raw) => {
  const [area, noOfRovers, ...rawInstructions] = raw.trim().split('\n').slice(0);
  const roverPositions = positionalInstruction(rawInstructions, noOfRovers);
  const instructions = rawInstructions.slice(noOfRovers);
  const plateau = createPlateau(area);

  const rovers = createRovers(roverPositions, plateau);
  const commands = parseCommands(instructions);

  return { plateau, rovers, commands };
};

exports.parseRover = parseRover;
exports.createRovers = createRovers;
exports.parseCommands = parseCommands;
exports.createPlateau = createPlateau;
exports.positionalInstruction = positionalInstruction;
