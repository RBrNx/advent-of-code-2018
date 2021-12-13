const { parseInstructions, calculateNextStep, processStep } = require('./helpers');

const partOne = input => {
  let instructionOrder = '';
  let instructions = parseInstructions(input);

  while (instructions.length) {
    const nextStep = calculateNextStep(instructions);
    ({ instructionOrder, instructions } = processStep(nextStep, instructionOrder, instructions));
  }

  return instructionOrder;
};

const partTwo = input => {};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 'FDSEGJLPKNRYOAMQIUHTCVWZXB' : 35294);

module.exports = { solve, expected };
