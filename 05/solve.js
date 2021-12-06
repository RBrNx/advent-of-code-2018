const partOne = input => {
  let polymerArray = input[0].split('');

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

  return polymerArray.length;
};

const partTwo = input => {};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 'dabCBAcaDA' : 141071);

module.exports = { solve, expected };
