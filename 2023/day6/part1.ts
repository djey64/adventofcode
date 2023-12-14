import path from "path";
import fs from "fs";

// https://adventofcode.com/2023/day/6
export let input = fs
    .readFileSync(path.join(__dirname, "exemple.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

/* Parsing */
const [timeLine, distanceLine] = input
const time = timeLine.match(/\d+/g).map(d => parseInt(d))
const distance = distanceLine.match(/\d+/g).map(d => parseInt(d))