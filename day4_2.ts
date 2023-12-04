// https://adventofcode.com/2023/day/4
// Part 2 of day 4 task

// example input
let input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

let inputArray = input.split('\n');
let resultMap = new Map();
let splittedInputArray = inputArray.map((element, index) => {
    resultMap.set(index, 1);
    return element.split(':')[1].split('|');
});
let resultArray: number[] = [];

function collectWinningCards(index: number) {
    if (index > resultMap.size) {
        return;
    }
    let winCount = 0;
    let winningSet = new Set<string>(splittedInputArray[index][0].trim().split(' '));
    let myCardSet = new Set<string>(splittedInputArray[index][1].trim().split(' '));

    myCardSet.forEach(element => {
        if (element && winningSet.has(element)) {
            winCount++;
        }
    })

    if (winCount > 0) {
        for (let i = index + 1; i < index + winCount + 1; ++i) {
            let winCard = resultMap.get(i);
            resultMap.set(i, winCard+1);
            collectWinningCards(i);
        }
    }
    return;
}

for (let i = 0; i < inputArray.length; ++i) {
    let winCount = 0;
    let winningSet = new Set<string>(splittedInputArray[i][0].trim().split(' '));
    let myCardSet = new Set<string>(splittedInputArray[i][1].trim().split(' '));

    myCardSet.forEach(element => {
        if (element && winningSet.has(element)) {
            winCount++;
        }
    })

    if (winCount > 0) {
        collectWinningCards(i);
    }
}

let result = 0;
resultMap.forEach((element) => {
  result += element;
});
console.log(result);