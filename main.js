const { parseRover } = require('./src/rover-parser.js');
const { RoverController } = require('./src/rover-controller.js');
const { display, readFromStdIn, readFromFile } = require('./src/rover-stdUtils.js');

const execute = (data) => {
  const { plateau, rovers, commands } = parseRover(data);

  const roverController = new RoverController(rovers, plateau);
  const roversStatus = roverController.execute(commands);

  display(roversStatus);
};

const main = () => {
  const filePath = process.argv[2];
  if (filePath === undefined) {
    const eof = 'END';
    readFromStdIn(eof, execute);
  } else {
    readFromFile(filePath, execute);
  }
};

main();