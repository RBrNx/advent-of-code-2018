function solve(input, part) {
    return part === 1 ? partOne(input) : partTwo(input)
}

function partOne(input) {
    let resultFreq = [0]

    computeFrequencyChanges(resultFreq, input)

    return resultFreq.slice(-1)[0]
}

function partTwo(input) {
    let resultFreq = [0]
    let firstDuplicate = null

    while (!firstDuplicate) {
        firstDuplicate = computeFrequencyChanges(resultFreq, input)
    }

    return firstDuplicate
}

function computeFrequencyChanges(freqArray, input) {
    for (let i = 0; i < input.length; i++) {
        let symbol = input[i].slice(0, 1)
        let number = Number(input[i].slice(1))
        let prevValue = freqArray.slice(-1)[0] || 0
        let newValue = 0

        if (symbol === '+') newValue = prevValue + number
        else if (symbol === '-') newValue = prevValue - number

        if (freqArray.includes(newValue)) {
            return newValue
        }

        freqArray.push(newValue)
    }
}

const expected = part => (part === 1 ? 547 : 76414)

module.exports = { solve, expected }
