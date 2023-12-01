// https://adventofcode.com/2023/day/1 some input from this task
const input = `shrzvdcghblt21
sixdddkcqjdnzzrgfourxjtwosevenhg9
threevt1onegxgvc9flk
7dmqzksnlcpbsqkzqlfour1four
4seven9gdlnhqxfseven94five
nldeightwoshgnsjnzmbkbxcxltsqtstrgdmvqvxbfour6six
87mmlvfr4
six1vvrlxx8two
znmfvdlhvjtwo9three4tzjqcfcgnsevenccvnsjczlpm
`;

// Object of words-to-number and some extra cases (like merging numbers) to work with
let numberNamesObject: { [key: string]: string; } = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
    'twone': '21',
    'sevenine': '79',
    'oneight': '18',
    'threeight': '38',
    'nineight': '98',
    'fiveight': '58',
    'eighthree': '83',
    'eightwo': '82',
};

// regexp for replacing words to digits
let numberRegexp = /(twone)|(sevenine)|(oneight)|(threeight)|(nineight)|(fiveight)|(eighthree)|(eightwo)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g

function getCalNumber(str: string): number {
    let strToList = str.split('');
    return parseInt(strToList[0] + strToList[strToList.length - 1]);
}

function getNumberStringFromWordsAndDigits(str: string): string {
    let isMatch = str.match(numberRegexp);
    if (isMatch) {
        str = str.replace(isMatch[0], numberNamesObject[isMatch[0]]);
        return getNumberStringFromWordsAndDigits(str);
    } else {
        return str.replace(/\D+/g, '');
    }
}

// main work starts here
let inputArray = input.split('\n');
inputArray = inputArray.map(element => getNumberStringFromWordsAndDigits(element));

let calArray = inputArray.map(element => getCalNumber(element));

let finalResult = calArray.reduce((prev, curr) => prev + curr, 0);
console.log(finalResult)