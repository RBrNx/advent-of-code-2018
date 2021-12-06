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

const partTwo = input => {
  const timeline = calculateTimeline(input);
  const guards = calculateGuardShifts(timeline);

  const mostFrequentlyAsleep = Object.values(guards).reduce(
    (acc, curr) => {
      const guardShiftTotals = findSleepiestMinute(curr);

      if (guardShiftTotals.sleepCount > acc.sleepCount) return { ...guardShiftTotals, id: curr.id };

      return acc;
    },
    { minute: 0, sleepCount: 0, id: null },
  );

  return parseInt(mostFrequentlyAsleep.id) * mostFrequentlyAsleep.minute;
};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 38813 : 141071);

module.exports = { solve, expected };
