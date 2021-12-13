const instructionRegex = new RegExp(/Step (\w) must be finished before step (\w) can begin/);

const parseInstructions = input =>
  input.reduce((acc, curr) => {
    const [, stepLetter, requiresStepLetter] = instructionRegex.exec(curr);

    return [...acc, [stepLetter, requiresStepLetter]];
  }, []);

const calculateNextStep = instructions => {
  const possibleSteps = new Set();
  const availableSteps = instructions.map(([step]) => step);
  const requirements = instructions.map(([_step, requirement]) => requirement);

  availableSteps.forEach(step => {
    if (!requirements.includes(step)) {
      possibleSteps.add(step);
    }
  });

  const [nextStep] = Array.from(possibleSteps).sort();

  return nextStep;
};

const processStep = (step, order, instructions) => {
  const updatedInstructions = instructions.reduce((acc, [currStep, currRequirement]) => {
    if (currStep !== step) {
      acc.push([currStep, currRequirement]);
    }

    return acc;
  }, []);

  let updatedOrder = order;
  if (instructions.length > 1) {
    updatedOrder += step;
  } else {
    const [penultimateStep, lastStep] = instructions[0];
    updatedOrder += penultimateStep + lastStep;
  }

  return { instructionOrder: updatedOrder, instructions: updatedInstructions };
};

module.exports = {
  parseInstructions,
  calculateNextStep,
  processStep,
};
