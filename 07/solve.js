const {
  parseInstructions,
  calculatePossibleSteps,
  calculateNextStep,
  calculateLastStep,
  processStep,
} = require('./helpers');

const partOne = input => {
  let instructionOrder = '';
  let instructions = parseInstructions(input);
  const lastStep = calculateLastStep(instructions);

  while (instructions.length) {
    const nextStep = calculateNextStep(instructions);
    ({ instructionOrder, instructions } = processStep(nextStep, instructionOrder, instructions));
  }

  ({ instructionOrder, instructions } = processStep(lastStep, instructionOrder, instructions));

  return instructionOrder;
};

const partTwo = input => {
  const [NUM_WORKERS, TIME_PENALTY] = [5, 60];
  let instructionOrder = '';
  let seconds = 0;
  let instructions = parseInstructions(input);
  let lastStep = calculateLastStep(instructions);
  const workers = new Array(NUM_WORKERS).fill(null).map(() => ({ currentStep: null, timeToFinish: 0 }));

  while (instructions.length || workers.some(worker => worker.timeToFinish > 0)) {
    const possibleSteps = calculatePossibleSteps(instructions).filter(
      step => !workers.some(worker => worker.currentStep === step),
    );
    let workerIsFinished = false;

    // Assign steps to workers
    for (let j = 0; j < workers.length; j += 1) {
      const worker = workers[j];

      if (!possibleSteps.length) {
        break;
      }

      if (!worker.currentStep) {
        const step = possibleSteps.shift();
        worker.currentStep = step;
        worker.timeToFinish = step.charCodeAt(0) - 64 + TIME_PENALTY; // A=1, B=2, etc
      }
    }

    while (!workerIsFinished) {
      // Process in progress steps
      for (let j = 0; j < workers.length; j += 1) {
        const worker = workers[j];

        if (worker.timeToFinish > 0) {
          worker.timeToFinish -= 1;

          if (worker.timeToFinish === 0) {
            ({ instructionOrder, instructions } = processStep(worker.currentStep, instructionOrder, instructions));
            worker.currentStep = null;
            workerIsFinished = true;
          }
        }
      }

      seconds += 1;

      if (!instructions.length && lastStep && workers.every(w => !w.currentStep)) {
        workers[0].currentStep = lastStep;
        workers[0].timeToFinish = lastStep.charCodeAt(0) - 64 + TIME_PENALTY; // A=1, B=2, etc
        lastStep = null;
      }
    }
  }

  return seconds;
};

const solve = (input, part) => (part === 1 ? partOne(input) : partTwo(input));

const expected = part => (part === 1 ? 'FDSEGJLPKNRYOAMQIUHTCVWZXB' : 1000);

module.exports = { solve, expected };
