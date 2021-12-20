class Marble {
  constructor(value, next = null, prev = null) {
    this.value = value;
    this.clockwise = next;
    this.counterClockwise = prev;
  }

  insertMarble(value) {
    const clockwiseMarble = this.clockwise;
    const followingMarble = clockwiseMarble.clockwise;

    const newMarble = new Marble(value, followingMarble, clockwiseMarble);

    followingMarble.counterClockwise = newMarble;
    clockwiseMarble.clockwise = newMarble;

    return newMarble;
  }

  removeMarble(relativePosition, { counterClockwise = false } = {}) {
    let relativeMarble = this;
    const direction = counterClockwise ? 'counterClockwise' : 'clockwise';

    for (let counter = 0; counter < relativePosition; counter += 1) {
      relativeMarble = relativeMarble[direction];
    }

    const nextMarble = relativeMarble.clockwise;
    const previousMarble = relativeMarble.counterClockwise;

    nextMarble.counterClockwise = previousMarble;
    previousMarble.clockwise = nextMarble;

    return relativeMarble;
  }

  printCircle() {
    const startingValue = this.value;
    let marble = this.clockwise;
    const circleValues = [this.value];

    while (marble.value !== startingValue) {
      circleValues.push(marble.value);
      marble = marble.clockwise;
    }

    return circleValues;
  }
}

const playMarbleGame = (numPlayers, highestMarbleValue) => {
  let finished = false;
  let lastMarblePlayed = 0;
  let currentMarble = new Marble(0);
  currentMarble.clockwise = currentMarble;
  currentMarble.counterClockwise = currentMarble;
  const scores = new Array(numPlayers).fill(0);

  while (!finished) {
    for (let player = 0; player < numPlayers; player += 1) {
      const nextValue = lastMarblePlayed + 1;
      if (nextValue > highestMarbleValue) {
        finished = true;
        break;
      }

      if (nextValue % 23 === 0) {
        const removedMarble = currentMarble.removeMarble(7, { counterClockwise: true });
        scores[player] += nextValue + removedMarble.value;
        currentMarble = removedMarble.clockwise;
      } else {
        const newMarble = currentMarble.insertMarble(lastMarblePlayed + 1);
        currentMarble = newMarble;
      }

      lastMarblePlayed += 1;
    }
  }

  const highestScore = scores.sort().pop();

  return highestScore;
};

module.exports = { playMarbleGame };
