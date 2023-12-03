// https://adventofcode.com/2023/day/3
// Remark: I think this solution is not compatible to part 2 of this task
//         It's a little dirty solution =(

// part of my input as example
let input = `...766.......821.547.....577......................................387.....................56..........446.793..........292..................
...........................%...../.....981..........627..../..........-.....623......610..-..............*..................16......891.....
...$...........716..&336.......470.325.................*.84........$..34....*.....+.....#.....*76....#.........303.433........-........&....
.117../359.#...............595............129..963#..722..........128........192.313........31........887...............234.......-.........
............298.....922...*.......482.......*..................*......./.........................395................264..../.......166......
.732..................*..815..920*......113.827.........453.571.356..902......693...147............*.....128................................
...*..........451-.442..................*...................................+....*....*.......918...680...........................529+......
....844.587.....................347...425.....974......348.........$615....174.330..............*..................556.......972*...........
..........&...676.........947..%.................*976.*.................45..........192........272.131..............-..977*......85.........
.588..........*........$.$.......515...493.............73.....%...........*.....428.*....................*968..............964.......153*274`;

let inputArray = input.split('\n');

let height = inputArray.length;
let width = inputArray[0].length;

// Function to check surroundings of number
function checkNeighbours(startIndex: number, endIndex: number, row: number): boolean {
    // bounds
    let startIndexTopBottom = startIndex < 0 ? 0 : startIndex;
    let endIndexTopBottom = endIndex >= width ? endIndex - 1 : endIndex;

    // top row
    if (row - 1 < height && row - 1 >=0 && startIndex < width) {
        for(let i = startIndexTopBottom; i <= endIndexTopBottom; ++i) {
            if (inputArray[row-1][i] !== '.' && Number.isNaN(parseInt(inputArray[row-1][i]))) {
                return true;
            }
        }        
    }

    // bottom row
    if (row + 1 < height && startIndex < width) {
        for(let i = startIndexTopBottom; i <= endIndexTopBottom; ++i) {
            if (inputArray[row+1][i] !== '.' && Number.isNaN(parseInt(inputArray[row+1][i]))) {
                return true;
            }
        }        
    }

    // left boundary
    if (startIndex < width && startIndex >=0 && (inputArray[row][startIndex] !== '.' && Number.isNaN(parseInt(inputArray[row][startIndex])))) {
        return true;
    }

    // right boundary
    if (endIndex < width && (inputArray[row][endIndex] !== '.' && Number.isNaN(parseInt(inputArray[row][endIndex])))) {
        return true;
    }

    return false;
}

let resultArray: number[] = [];
let partNumber = '';
let jStart = 0;

for (let i = 0; i < inputArray.length; ++i) {

    partNumber = '';

    jStart = 0;
    for (let j = 0; j < inputArray[i].length; ++j) {
        let char = inputArray[i][j];
        if (char >= '0' && char <= '9') {
            if (!partNumber.length) {
                jStart = j;
            }
            partNumber+=char;
        } else if(partNumber.length && !(char >= '0' && char <= '9')) {
            let isPartNumber = checkNeighbours(jStart - 1, jStart + partNumber.length, i);
            if (isPartNumber) {
                resultArray.push(parseInt(partNumber));
            }
            partNumber = '';
            jStart = 0;
        }

        if (j === inputArray[i].length - 1 && partNumber.length) {
            let isPartNumber = checkNeighbours(jStart - 1, jStart + partNumber.length, i);
            if (isPartNumber) {
                resultArray.push(parseInt(partNumber));
            }
            partNumber = '';
            jStart = 0;
        } 
    }
}

let result = resultArray.reduce((prev, curr) => prev + curr, 0);
console.log(result);