function solve(input, part) {
    return part === 1 ? partOne(input) : partTwo(input)
}

function countDuplicates(inputString) {
    let charCount = {}

    for (let char of inputString) {
        if (charCount.hasOwnProperty(char)) {
            charCount[char]++
        } else {
            charCount[char] = 1
        }
    }

    return {
        two: Object.values(charCount).indexOf(2) > -1,
        three: Object.values(charCount).indexOf(3) > -1,
    }
}

function doBoxIDsDifferEnough(firstID, secondID, limit) {
    let differCount = 0
    let matchingString = ''

    for (let i = 0; i < firstID.length; i++) {
        if (firstID[i] !== secondID[i]) differCount++
        else matchingString += firstID[i]

        if (differCount > limit) return false
    }

    if (differCount > 0) return matchingString
}

function partOne(input) {
    let threeLetterCount = 0
    let twoLetterCount = 0

    for (let boxID of input) {
        var letterCount = countDuplicates(boxID)
        if (letterCount.two) twoLetterCount++
        if (letterCount.three) threeLetterCount++
    }

    return threeLetterCount * twoLetterCount
}

function partTwo(input) {
    const length = input[0].length

    for (let aID of input) {
        for (let bID of input) {
            let ret = doBoxIDsDifferEnough(aID, bID, 1)
            if (ret) return ret
        }
    }
}

const expected = part => (part === 1 ? 8118 : 'jbbenqtlaxhivmwyscjukztdp')

module.exports = { solve, expected }
