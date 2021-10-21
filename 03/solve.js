const claimRegex = new RegExp(/(#\d+) @ (\d+,\d+): (\d+x\d+)/);

const calculateAreaCoordinates = (startCoordinates, dimensions) => {
  const coordinates = [];
  const [x, y] = startCoordinates.split(',').map(v => parseInt(v));
  const [width, height] = dimensions.split('x').map(v => parseInt(v));

  for (let loopX = x; loopX < x + width; loopX += 1) {
    for (let loopY = y; loopY < y + height; loopY += 1) {
      coordinates.push(`${loopX},${loopY}`);
    }
  }

  return coordinates;
};

const createCoordinateMap = claims => {
  const coordinateMap = new Map();
  const claimIds = new Set();

  claims.forEach(claim => {
    const [_, id, coordinates, dimensions] = claimRegex.exec(claim);
    const areaCoordinates = calculateAreaCoordinates(coordinates, dimensions);

    claimIds.add(id);

    areaCoordinates.forEach(areaCoord => {
      const currValue = coordinateMap.get(areaCoord);
      const newValue = currValue ? currValue.add(id) : new Set([id]);

      coordinateMap.set(areaCoord, newValue);
    });
  });

  return { coordinateMap, claimIds };
};

const partOne = input => {
  const { coordinateMap } = createCoordinateMap(input);
  let overlaps = 0;

  coordinateMap.forEach(set => {
    if (set.size > 1) overlaps += 1;
  });

  return overlaps;
};

const partTwo = input => {
  const { coordinateMap, claimIds } = createCoordinateMap(input);
  let intactClaimIds = [...claimIds];

  coordinateMap.forEach(set => {
    if (set.size > 1) {
      intactClaimIds = intactClaimIds.filter(claimId => !set.has(claimId));
    }
  });

  return intactClaimIds[0];
};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 107043 : '#346');

module.exports = { solve, expected };
