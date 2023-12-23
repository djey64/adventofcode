import path from "path";
import fs from "fs";

// https://adventofcode.com/2023/day/6
export let input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

