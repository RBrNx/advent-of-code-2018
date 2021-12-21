const { areNeighbours, drawPoints } = require('./helpers');

const inputRegex = new RegExp(/position=<(-?\s?\d+),\s+(-?\s?\d+)> velocity=<(-?\s?\d+),\s+(-?\s?\d+)>/);

const partOne = input => {
  let round = 0;
  let percentageConnected = 0;
  let points = input.map(line => {
    const [, x1, y1, vx, vy] = inputRegex.exec(line).map(Number);

    return { position: [x1, y1], velocity: [vx, vy] };
  });

  while (percentageConnected < 0.25) {
    points = points.map(({ position, velocity }) => ({
      position: [position[0] + velocity[0], position[1] + velocity[1]],
      velocity,
    }));

    const sortedPoints = [...points]
      .sort((a, b) => a.position[1] - b.position[1])
      .sort((a, b) => a.position[0] - b.position[0]);

    const connectedPoints = sortedPoints.reduce((acc, curr, index, array) => {
      const nextPoint = array[index + 1];

      if (nextPoint && areNeighbours(curr, nextPoint)) {
        return acc + 1;
      }

      return acc;
    }, 0);

    percentageConnected = connectedPoints / points.length;
    round += 1;
  }

  drawPoints(points);

  return round;
};

const solve = (input, part) => (part === 1 ? partOne(input) : partOne(input));

const expected = part => (part === 1 ? `XPFXXXKL (See 'Part1.png')` : 10521);

module.exports = { solve, expected };
