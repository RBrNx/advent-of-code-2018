/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
function solve(input, part) {
  return part === 1 ? partOne(input) : partTwo(input);
}

function countDuplicates(inputString) {
  const charCount = {};

  for (const char of inputString) {
    // eslint-disable-next-line no-prototype-builtins
    if (charCount.hasOwnProperty(char)) {
      charCount[char] += 1;
    } else {
      charCount[char] = 1;
    }
  }

  return {
    two: Object.values(charCount).indexOf(2) > -1,
    three: Object.values(charCount).indexOf(3) > -1,
  };
}

function doBoxIDsDifferEnough(firstID, secondID, limit) {
  let differCount = 0;
  let matchingString = '';

  for (let i = 0; i < firstID.length; i += 1) {
    if (firstID[i] !== secondID[i]) differCount += 1;
    else matchingString += firstID[i];

    if (differCount > limit) return false;
  }

  if (differCount > 0) return matchingString;
}

function partOne(input) {
  let threeLetterCount = 0;
  let twoLetterCount = 0;

  for (const boxID of input) {
    const letterCount = countDuplicates(boxID);
    if (letterCount.two) twoLetterCount += 1;
    if (letterCount.three) threeLetterCount += 1;
  }

  return threeLetterCount * twoLetterCount;
}

function partTwo(input) {
  for (const aID of input) {
    for (const bID of input) {
      const ret = doBoxIDsDifferEnough(aID, bID, 1);
      if (ret) return ret;
    }
  }
}

const expected = part => (part === 1 ? 8118 : 'jbbenqtlaxhivmwyscjukztdp');

module.exports = { solve, expected };
