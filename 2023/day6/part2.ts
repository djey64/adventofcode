import path from "path";
import fs from "fs";

// https://adventofcode.com/2023/day/6
export let input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

/* Parsing */
const [timeLine, distanceLine] = input
const time = timeLine.match(/\d+/g).reduce((acc, s) => acc+s)
const distance = distanceLine.match(/\d+/g).reduce((acc, s) => acc+s)

const b = parseInt(time)
const c = parseInt(distance)
const a = -1

// Formule quadratique (-b +- √(b^2 - 4ac)) / 2a
let x1 = (-b + Math.sqrt(b * b - 4 * a * (-c))) / 2 * a
let x2 = (-b - Math.sqrt(b * b - 4 * a * (-c))) / 2 * a
if(x1 % 1 == 0) x1 += 1
if(x2 % 1 == 0) x2 -= 1

console.log(Math.floor(x2) - Math.ceil(x1) + 1)