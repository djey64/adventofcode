import path from "path";
import fs from "fs";

const __dirname = new URL('.', import.meta.url).pathname.slice(1);
export const input = fs
    .readFileSync(path.join(__dirname, "input2.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

const numbers: {[index: string]: string} = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}

const toDigit = (s: string): string => numbers[s] ?? s

const numberRegex = "(\\d|one|two|three|four|five|six|seven|eight|nine)"

const total = input.map(str => {
    let m = str.match(numberRegex+".*"+numberRegex)
    if(m) return parseInt(toDigit(m[1]) + toDigit(m[2]))
    // Just one digit
    m = str.match(numberRegex)
    return parseInt(toDigit(m[1]) + toDigit(m[1]))
}).reduce((acc, value) => acc + value)

console.log(total)