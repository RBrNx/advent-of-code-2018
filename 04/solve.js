const inputRegex = new RegExp(/\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] ([\d\w\s#]+)/);
const guardIdRegex = new RegExp(/(?:#)(\d+)/);

const calculateTimeline = input => {
  const timeline = input
    .map(line => {
      const [, timestamp, action] = inputRegex.exec(line);
      const [date, time] = timestamp.replace(/[[\]]+/g, '').split(' ');

      return { date, time, timestamp, action };
    })
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return timeline;
};

const partOne = input => {
  const timeline = calculateTimeline(input);
  const guards = {};
  let currentGuard = null;
  let lastEventMinute = null;

  while (timeline.length) {
    const entry = timeline.shift();
    const { date, time, action } = entry;

    if (action.includes('begins shift')) {
      const [, guardId] = guardIdRegex.exec(action);
      currentGuard = guardId;
      lastEventMinute = null;

      if (!guards[guardId]) {
        guards[guardId] = {
          id: guardId,
          totalMinutesAsleep: 0,
          shiftEvents: {},
        };
      }
    } else if (action.includes('falls asleep')) {
      const [, minute] = time.split(':');

      if (!guards[currentGuard].shiftEvents[date]) {
        guards[currentGuard].shiftEvents[date] = Object.fromEntries(
          new Array(60).fill(null).map((x, i) => [`${i}`.padStart(2, '0'), null]),
        );
      }

      guards[currentGuard].shiftEvents[date][minute] = true;
      lastEventMinute = minute;
    } else if (action.includes('wakes up')) {
      const [, minute] = time.split(':');
      const timeDifference = Number(minute - lastEventMinute);

      for (let currMinute = Number(lastEventMinute); currMinute < Number(minute); currMinute += 1) {
        const currMinuteString = `${currMinute}`.padStart(2, '0');
        guards[currentGuard].shiftEvents[date][currMinuteString] = true;
      }
      guards[currentGuard].shiftEvents[date][minute] = false;
      guards[currentGuard].totalMinutesAsleep += timeDifference;
    }
  }

  const sleepiestGuard = Object.values(guards).reduce((acc, curr) => {
    if (curr.totalMinutesAsleep > acc?.totalMinutesAsleep) {
      return curr;
    }

    return acc;
  });

  const minutesAsleep = Object.values(sleepiestGuard.shiftEvents).reduce((acc, curr) => {
    Object.entries(curr).map(([minute, isSleeping]) => {
      if (isSleeping) acc[minute] += 1;
    });

    return acc;
  }, Object.fromEntries(new Array(60).fill(null).map((x, i) => [`${i}`.padStart(2, '0'), 0])));

  const { minute: sleepiestMinute } = Object.entries(minutesAsleep).reduce(
    (acc, [minute, sleepCount]) => {
      if (Number(sleepCount) > acc.sleepCount) return { minute, sleepCount };

      return acc;
    },
    { minute: null, sleepCount: 0 },
  );

  console.log({ sleepiestMinute, sleepiestGuard: parseInt(sleepiestGuard.id) });

  return parseInt(sleepiestGuard.id) * sleepiestMinute;
};

const partTwo = input => {};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 0 : 0);

module.exports = { solve, expected };
