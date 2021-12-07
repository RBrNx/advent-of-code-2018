const reactPolymer = polymer => {
  let polymerArray = polymer.split('');

  for (let i = 0; i < polymerArray.length; i += 1) {
    const [currUnit, nextUnit] = [polymerArray[i], polymerArray[i + 1]];
    if (
      currUnit.charCodeAt() + 32 === nextUnit?.charCodeAt() ||
      nextUnit?.charCodeAt() + 32 === currUnit.charCodeAt()
    ) {
      polymerArray = polymerArray.filter((u, index) => ![i, i + 1].includes(index));
      i = -1;
    }
  }

  return polymerArray;
};

const partOne = input => reactPolymer(input[0]).length;

const partTwo = input => {
  const shortestPolymer = new Array(26).fill(null).reduce((acc, curr, i) => {
    const unitsToRemove = [String.fromCodePoint(65 + i), String.fromCodePoint(97 + i)];
    console.log(`Processing ${unitsToRemove}`);
    const newPolymer = input[0]
      .split('')
      .filter(s => !unitsToRemove.includes(s))
      .join('');
    const condensedPolymer = reactPolymer(newPolymer);

    console.log(`Length is ${condensedPolymer.length}, Current Length is ${acc?.length}`);

    if (condensedPolymer.length < acc?.length) return condensedPolymer;

    return acc;
  }, input[0].split(''));

  return shortestPolymer.length;
};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 9390 : 5898);

module.exports = { solve, expected };
