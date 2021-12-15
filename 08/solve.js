const { parseLicenceIntoNodes } = require('./helpers');

const partOne = input => {
  const licenceBytes = input[0].split(' ').map(Number);

  const outerNode = parseLicenceIntoNodes(licenceBytes);

  return outerNode.calculateMetadataTotal();
};

const partTwo = input => {};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 37439 : '');

module.exports = { solve, expected };
