const { findClosestLocations, calculateLocationArea } = require('./helpers');

const partOne = input => {
  let [mapWidth, mapHeight] = [0, 0];
  const coordinates = input.map(line => {
    const [x, y] = line.split(', ').map(Number);

    if (x >= mapWidth) mapWidth = x + 1;
    if (y >= mapHeight) mapHeight = y + 1;

    return { x, y };
  });

  const twoDimensionalMap = Array(mapHeight)
    .fill(null)
    .map(() => Array(mapWidth).fill('.'));

  // eslint-disable-next-line array-callback-return
  coordinates.map(({ x, y }, index) => {
    twoDimensionalMap[y][x] = index;
  });

  for (let y = 0; y < mapHeight; y += 1) {
    for (let x = 0; x < mapWidth; x += 1) {
      const closestPoints = findClosestLocations({ x, y }, coordinates);

      if (closestPoints.length === 1) twoDimensionalMap[y][x] = closestPoints[0].index;
      else if (closestPoints.length > 1) twoDimensionalMap[y][x] = '#';
    }
  }

  const { area, symbol } = coordinates.reduce(
    (acc, curr) => {
      const { total, borderLocations } = calculateLocationArea(twoDimensionalMap, curr);
      const mapSymbol = twoDimensionalMap[curr.y][curr.x];

      console.log(`Found ${borderLocations} border locations for symbol ${mapSymbol}`);

      if (borderLocations > 10) return acc;
      if (total > acc.area) return { area: total, symbol: mapSymbol };

      return acc;
    },
    { area: 0, symbol: null },
  );

  console.log(`Largest Area is ${area} for location ${symbol}`);

  return area;
};

const partTwo = input => {};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 5035 : 141071);

module.exports = { solve, expected };
