import path from "path";
import fs from "fs";

// https://adventofcode.com/2023/day/3
export const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

const isPartNumber = (number: number, x: number, y: number, input: string[]) => {
    // console.log('isPartNumber: '+ number + ' x: '+ x +' y : '+ y)
    const maxX = input[0].length - 1
    const maxY = input.length - 1
    const nLength = number.toString().length
    // Check left
    if(y > 0 && x > 0 && input[y - 1][x - 1] !== '.') return true
    if(x > 0 && input[y][x - 1] !== '.') return true
    if(y < maxY && x > 0 && input[y + 1][x - 1] !== '.') return true
    // Check above and below
    for(let i = 0; i < nLength; i++) {
        if(y > 0 && input[y - 1][x + i] !== '.') return true
        if(y < maxY && input[y + 1][x + i] !== '.') return true
    }
    // Check right
    if(y > 0 && x < maxX - nLength && input[y - 1][x + nLength] !== '.') return true
    if(x < maxX - nLength && input[y][x + nLength] !== '.') return true
    if(y < maxY && x < maxX - nLength && input[y + 1][x + nLength] !== '.') return true
    return false
}
let count = 0
input.forEach((line, y) => {
    const r = [...line.matchAll(/\d+/g)]
    r.forEach(match => {
        const [ number ] = match
        const { index } = match
        if(isPartNumber(parseInt(number), index, y, input)) {
            count += parseInt(number)
        }
    })
})
console.log(count)