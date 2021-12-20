const { playMarbleGame } = require('./helpers');

const partOne = input => {
  const [NUM_PLAYERS, HIGHEST_MARBLE_VALUE] = input[0].match(/\d+/g).map(Number);
  const highestScore = playMarbleGame(NUM_PLAYERS, HIGHEST_MARBLE_VALUE);

  return highestScore;
};

const partTwo = input => {
  const [NUM_PLAYERS, HIGHEST_MARBLE_VALUE] = input[0].match(/\d+/g).map(Number);
  const highestScore = playMarbleGame(NUM_PLAYERS, HIGHEST_MARBLE_VALUE * 100);
  return highestScore;
};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 410375 : '');

module.exports = { solve, expected };
