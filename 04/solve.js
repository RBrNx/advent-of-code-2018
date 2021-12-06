const { calculateTimeline, calculateGuardShifts, findSleepiestMinute } = require('./helpers');

const partOne = input => {
  const timeline = calculateTimeline(input);
  const guards = calculateGuardShifts(timeline);

  const sleepiestGuard = Object.values(guards).reduce((acc, curr) => {
    if (curr.totalMinutesAsleep > acc?.totalMinutesAsleep) {
      return curr;
    }

    return acc;
  });

  const { minute: sleepiestMinute } = findSleepiestMinute(sleepiestGuard);

  return parseInt(sleepiestGuard.id) * sleepiestMinute;
};

const partTwo = input => {};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 0 : 0);

module.exports = { solve, expected };
