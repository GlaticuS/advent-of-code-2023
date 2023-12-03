// https://adventofcode.com/2023/day/2 - part two

// part of my input as example
const input = `Game 1: 5 red, 1 green, 2 blue; 2 green, 8 blue, 6 red; 8 red, 3 blue, 2 green; 6 red, 1 green, 19 blue; 1 red, 17 blue
Game 2: 4 red, 5 green, 2 blue; 7 red, 14 green, 3 blue; 2 green, 5 blue, 11 red; 10 blue, 3 green; 9 green, 6 blue, 13 red; 7 red, 5 green, 9 blue
Game 3: 9 green, 18 blue, 1 red; 6 red, 10 blue, 5 green; 4 blue, 4 red, 15 green
Game 4: 1 red, 13 green; 10 green, 2 red; 3 red, 4 green, 2 blue
Game 5: 4 red, 2 green, 1 blue; 4 red, 9 blue; 4 green, 1 red, 6 blue; 3 blue, 2 green, 6 red; 5 red, 4 green, 1 blue
Game 6: 6 red, 3 green, 6 blue; 3 green, 5 blue, 12 red; 3 green, 9 blue, 3 red; 13 red, 8 blue
Game 7: 3 blue, 1 red; 3 blue, 10 green; 4 green, 5 blue`;

let inputArray = input.split('\n');

let resultArray: number[] = [];
for (let i = 0; i < inputArray.length; ++i) {
    let splittedGame = inputArray[i].split(':')[1].split(';');
    let maxCubesObject: { [key: string]: number; } = {
        red: 0,
        green: 0,
        blue: 0
    }
    for (let j = 0; j < splittedGame.length; ++j) {
        let splitToCubes = splittedGame[j].split(',');
        for (let k = 0; k < splitToCubes.length; ++k) {
            // [x, red] [y, blue] etc
            let numberColorPair = splitToCubes[k].trim().split(' ');

            if(maxCubesObject[numberColorPair[1]] < parseInt(numberColorPair[0])) {
                maxCubesObject[numberColorPair[1]] = parseInt(numberColorPair[0])
            }
        }
    }

    resultArray.push(Object.values(maxCubesObject).reduce((prev, curr) => prev*curr, 1));
}

let result = resultArray.reduce((prev, curr) => prev + curr, 0);
console.log(result);