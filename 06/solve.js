const { parseCoordinates, findClosestLocations, totalManhattanDist, calculateLocationArea } = require('./helpers');

const partOne = input => {
  const { coordinates, mapWidth, mapHeight } = parseCoordinates(input);

  const twoDimensionalMap = Array(mapHeight)
    .fill(null)
    .map(() => Array(mapWidth).fill('.'));

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

const partTwo = input => {
  const maximumDistance = 10000;
  const { coordinates, mapWidth, mapHeight } = parseCoordinates(input);

  const twoDimensionalMap = Array(mapHeight)
    .fill(null)
    .map(() => Array(mapWidth).fill('.'));

  for (let y = 0; y < mapHeight; y += 1) {
    for (let x = 0; x < mapWidth; x += 1) {
      const totalDist = totalManhattanDist({ x, y }, coordinates);

      if (totalDist < maximumDistance) twoDimensionalMap[y][x] = '#';
    }
  }

  const totalArea = twoDimensionalMap.reduce((acc, curr) => acc + curr.filter(x => x === '#').length, 0);

  console.log(`Largest Area is ${totalArea}`);

  return totalArea;
};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 5035 : 35294);

module.exports = { solve, expected };
