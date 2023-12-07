import path from "path";
import fs from "fs";

// https://adventofcode.com/2023/day/4
export const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

const total = input.map(line => {
    const [winnings, numbers] = line.substring(line.indexOf(':') + 2).split(' | ')
    const spaceRegex = /\s+/g
    const set: Set<number> = new Set(winnings.split(spaceRegex).map(s => parseInt(s)).filter(s => !isNaN(s)))
    const winningsCount = numbers.split(spaceRegex).map(s => parseInt(s)).filter(s => !isNaN(s) && set.has(s)).length
    return winningsCount > 0 ? Math.pow(2, winningsCount - 1) : 0
}).reduce((acc, value) => acc + value)
console.log(total)
