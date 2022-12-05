import path from "path";
import fs from "fs";

export const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let sum = 0;

input.forEach((i) => {
  const first = i.substring(0, i.length / 2);
  const second = i.substring(i.length / 2, i.length);

  const set = new Set();
  [...second].forEach((s) => set.add(s));
  const commonLetter = [...first].find((s) => set.has(s));
  sum += priority.indexOf(commonLetter) + 1;
});

console.log(sum);
