const fs = require('fs');

const renderFrame = (rover) => {
  let message = '';
  if (!rover.isActive) {
    message = 'RIP';
  }
  console.log(rover.position.x, rover.position.y, rover.direction, message);
};

const display = (frame) => frame.forEach(renderFrame);

const isEostdin = (eof, token) => token.trim() === eof;

const readFromFile = (filePath, onEnd) => {
  const rawData = fs.readFileSync(filePath, 'utf8');
  onEnd(rawData);
};

const readFromStdIn = (eof, onEnd) => {
  process.stdin.setEncoding('utf-8');
  let rawData = '';

  const watcherId = setInterval(() => {
    const token = process.stdin.read();
    if (token) {
      if (isEostdin(eof, token)) {
        clearInterval(watcherId);
        onEnd(rawData);

        return;
      }
      rawData += token;
    }
  }, 300);
};

exports.display = display;
exports.readFromFile = readFromFile;
exports.readFromStdIn = readFromStdIn;
