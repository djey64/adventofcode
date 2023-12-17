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
const time = timeLine.match(/\d+/g).map(d => parseInt(d))
const distance = distanceLine.match(/\d+/g).map(d => parseInt(d))

/*
Analyse: 

We look for values that satisfy this equation:

f(x, y, z) = x.(y - x) > z
=> -x² + xy -z > 0
where y is the time and z the distance

ax² + bx + c => 
a = -1
b = y
c = -z

using x = (−b ± √(b² - 4ac)) / 2a  

we'll found the two points where the function is 0
since we just consider integer values, 
we just have to compute number interval between x2 and x1
(we don't want to consider integer result because we want to beat the distance (>))
*/

const result = time.map((b, i) => {
    const a = -1
    const c = -distance[i]
    // Formule quadratique (-b +- √(b² - 4ac)) / 2a
    let x1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 * a
    let x2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 * a
    if(x1 % 1 == 0) x1 += 1
    if(x2 % 1 == 0) x2 -= 1
    return Math.floor(x2) - Math.ceil(x1) + 1
}).reduce((acc, n) => acc * n)

console.log(result)