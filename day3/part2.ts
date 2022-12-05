import path from "path";
import fs from "fs";

export const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let sum = 0;

for (let i = 0; i < input.length; i += 3) {
  const first = input[i];
  const second = input[i + 1];
  const third = input[i + 2];

  const set = new Set();
  [...first].forEach((s) => set.add(s));
  const secondSet = new Set();
  [...second].forEach((s) => {
    if (set.has(s)) secondSet.add(s);
  });
  const commonLetter = [...third].find((s) => secondSet.has(s));
  sum += priority.indexOf(commonLetter) + 1;
}

console.log(sum);
