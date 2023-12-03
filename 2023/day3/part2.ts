import path from "path";
import fs from "fs";

// https://adventofcode.com/2023/day/3
export const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

const getAdjNumbers = (r: RegExpMatchArray[], x: number): number[] => {
    const numbers: number[] = []
    r.forEach(match => {
        const [ number ] = match
        const { index: start } = match
        const end = start + number.length - 1
        if(Math.abs(x - start) <= 1 || Math.abs(x - end) <= 1 || (start < x && end > x)) {
            numbers.push(parseInt(number))
        }
    })
    return numbers
}

const getGearRatio = (x: number, y: number, input: string[]): number => {
    // Check line above
    let count = 0
    const maxX = input[0].length - 1
    const maxY = input.length - 1
    const numbers: number[] = []
    if(y > 0) {
        const r = [...input[y - 1].matchAll(/\d+/g)]
        numbers.push(...getAdjNumbers(r, x))
    }
    // Check current line
    const r = [...input[y].matchAll(/\d+/g)]
    numbers.push(...getAdjNumbers(r, x))
    // Check line below
    if(y < maxY) {
        const r = [...input[y + 1].matchAll(/\d+/g)]
        numbers.push(...getAdjNumbers(r, x))
    }

    return numbers.length == 2 ? numbers[0] * numbers[1] : 0
}

let ratio = 0
input.forEach((line, y) => {
    const r = [...line.matchAll(/\*/g)]
    r.forEach(match => {
        const { index: x } = match
        ratio += getGearRatio(x, y, input)
    })
})
console.log(ratio)