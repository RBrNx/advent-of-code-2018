const manhattanDist = (c1, c2) => Math.abs(c2.x - c1.x) + Math.abs(c2.y - c1.y);

const findClosestLocations = (origin, locations) =>
  locations.reduce(
    (acc, curr, index) => {
      const dist = manhattanDist(origin, curr);

      if (dist < acc[0].dist) return [{ dist, index }];
      if (dist === acc[0].dist) return [...acc, { dist, index }];

      return acc;
    },
    [{ dist: Number.MAX_SAFE_INTEGER }],
  );

const deepCopy = arr => {
  const copy = [];
  arr.forEach(elem => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem));
    } else {
      copy.push(elem);
    }
  });
  return copy;
};

const count = (map, { x, y }, locationSymbol) => {
  let total = 0;
  let borderLocations = 0;

  if (y >= 0 && y < map.length && x >= 0 && x < map[0].length) {
    if (map[y][x] === 'X' || map[y][x] !== locationSymbol) return { total, borderLocations };

    if (y === 0 || y === map.length - 1 || x === 0 || x === map[0].length - 1) borderLocations += 1;
    total += 1;

    // eslint-disable-next-line no-param-reassign
    map[y][x] = 'X';

    const down = count(map, { x, y: y + 1 }, locationSymbol);
    const up = count(map, { x, y: y - 1 }, locationSymbol);
    const left = count(map, { x: x - 1, y }, locationSymbol);
    const right = count(map, { x: x + 1, y }, locationSymbol);

    total += down.total + up.total + left.total + right.total;
    borderLocations += down.borderLocations + up.borderLocations + left.borderLocations + right.borderLocations;
  }

  return { total, borderLocations };
};

const calculateLocationArea = (map, coordinate) => {
  const mapCopy = deepCopy(map);
  const symbol = mapCopy[coordinate.y][coordinate.x];
  const totalCount = count(mapCopy, coordinate, symbol);

  return totalCount;
};

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
