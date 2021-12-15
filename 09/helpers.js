const findRelativeMarbleIndex = (currIndex, position, circleSize, { counterClockwise = false } = {}) => {
  if (circleSize === 1) return 1;

  let nextIndex = currIndex;

  if (counterClockwise) {
    for (let counter = 0; counter < position; counter += 1) {
      if (nextIndex - 1 >= 0) nextIndex -= 1;
      else nextIndex = circleSize - 1;
    }
  } else {
    for (let counter = 0; counter < position; counter += 1) {
      if (nextIndex + 1 < circleSize) nextIndex += 1;
      else nextIndex = 0;
    }
  }

  return nextIndex;
};

const playMarbleGame = (numPlayers, highestMarbleValue) => {
  let finished = false;
  let lastMarblePlayed = 0;
  let currentMarble = 0;
  const circle = [0];
  const scores = new Array(numPlayers).fill(0);

  while (!finished) {
    for (let player = 0; player < numPlayers; player += 1) {
      const nextMarble = lastMarblePlayed + 1;
      // eslint-disable-next-line no-loop-func
      const currentMarbleIndex = circle.findIndex(m => m === currentMarble);

      if (nextMarble > highestMarbleValue) {
        finished = true;
        break;
      }

      if (nextMarble % 23 === 0) {
        scores[player] += nextMarble;
        const removeMarbleIndex = findRelativeMarbleIndex(currentMarbleIndex, 7, circle.length, {
          counterClockwise: true,
        });
        const [removedPoints] = circle.splice(removeMarbleIndex, 1);
        scores[player] += removedPoints;
        currentMarble = circle[removeMarbleIndex];
      } else {
        const nextMarbleIndex = findRelativeMarbleIndex(currentMarbleIndex, 2, circle.length);
        circle.splice(nextMarbleIndex, 0, nextMarble);
        currentMarble = nextMarble;
      }

      lastMarblePlayed += 1;
    }
  }

  const highestScore = scores.sort().pop();

  return highestScore;
};

module.exports = { findRelativeMarbleIndex, playMarbleGame };
