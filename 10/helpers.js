const { createCanvas } = require('canvas');
const fs = require('fs');

const areNeighbours = (c1, c2) => {
  const [x1, y1] = c1.position;
  const [x2, y2] = c2.position;

  if (x1 + 1 === x2 && y1 === y2) return true;
  if (y1 + 1 === y2 && x1 === x2) return true;

  return false;
};

const drawPoints = points => {
  const xCoords = points.map(p => p.position[0]);
  const yCoords = points.map(p => p.position[1]);

  const maxCoords = {
    x: Math.max.apply(null, xCoords),
    y: Math.max.apply(null, yCoords),
  };

  const canvas = createCanvas(maxCoords.x + 1, maxCoords.y + 1);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FF0000';

  points.map(({ position }) => ctx.fillRect(position[0], position[1], 1, 1));

  const out = fs.createWriteStream(`${__dirname}/part1.png`);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('The PNG file was created.'));
};

module.exports = { areNeighbours, drawPoints };
