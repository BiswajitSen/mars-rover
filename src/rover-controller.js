const navigation = {
  'M': (rover) => rover.moveForward(),
  'R': (rover) => rover.rotateRight(),
  'L': (rover) => rover.rotateLeft(),
}

class RoverController {
  #rovers
  #executionLog

  constructor(rovers) {
    this.#rovers = rovers;
  };

  get executionLog() {
    return [...this.#executionLog];
  };

  get roversOrientation() {
    return this.#rovers.reduce((dataFrame, rover) => {
      return dataFrame.concat([rover.dataFrame]);
    }, []);
  };

  #maneuver(rover, commands) {
    let cmdId = 0;

    while (rover.isActive && cmdId < commands.length) {
      const command = commands[cmdId];
      const movement = navigation[command];
      movement(rover);
      cmdId++;
    }
  };

  execute(instructions) {
    this.#executionLog = instructions.map((instruction) => {
      const { roverNumber, commands } = instruction;
      const roverId = roverNumber - 1;
      const rover = this.#rovers[roverId];

      this.#maneuver(rover, commands);

      return rover.orientation;
    });

    return this.dataFrame;
  };

  get dataFrame() {
    return this.#rovers.map((rover) => rover.dataFrame);
  };

  toString() {
    return this.#rovers.map((rover) => rover.toString()).join('\n');
  };
}

exports.RoverController = RoverController;
