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

const floodFillCount = (map, { x, y }, locationSymbol) => {
  let total = 0;
  let borderLocations = 0;

  if (y >= 0 && y < map.length && x >= 0 && x < map[0].length) {
    if (map[y][x] === 'X' || map[y][x] !== locationSymbol) return { total, borderLocations };

    if (y === 0 || y === map.length - 1 || x === 0 || x === map[0].length - 1) borderLocations += 1;
    total += 1;

    // eslint-disable-next-line no-param-reassign
    map[y][x] = 'X';

    const down = floodFillCount(map, { x, y: y + 1 }, locationSymbol);
    const up = floodFillCount(map, { x, y: y - 1 }, locationSymbol);
    const left = floodFillCount(map, { x: x - 1, y }, locationSymbol);
    const right = floodFillCount(map, { x: x + 1, y }, locationSymbol);

    total += down.total + up.total + left.total + right.total;
    borderLocations += down.borderLocations + up.borderLocations + left.borderLocations + right.borderLocations;
  }

  return { total, borderLocations };
};

const calculateLocationArea = (map, coordinate) => {
  const mapCopy = deepCopy(map);
  const symbol = mapCopy[coordinate.y][coordinate.x];
  const totalCount = floodFillCount(mapCopy, coordinate, symbol);

  return totalCount;
};

module.exports = { findClosestLocations, calculateLocationArea };
