import path from "path";
import fs from "fs";

export const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

/**
                    [Q]     [P] [P]
                [G] [V] [S] [Z] [F]
            [W] [V] [F] [Z] [W] [Q]
        [V] [T] [N] [J] [W] [B] [W]
    [Z] [L] [V] [B] [C] [R] [N] [M]
[C] [W] [R] [H] [H] [P] [T] [M] [B]
[Q] [Q] [M] [Z] [Z] [N] [G] [G] [J]
[B] [R] [B] [C] [D] [H] [D] [C] [N]
 1   2   3   4   5   6   7   8   9 
 */

var b = new buckets.Set();

let count = 0;
console.log(input.length);
input.forEach((i) => {
  const [first, second] = i.split(",");

  const [f1, f2] = first.split("-");
  const [s1, s2] = second.split("-");

  if ((+f1 <= +s1 && +f2 >= +s2) || (+f1 >= +s1 && +f2 <= +s2)) {
    count++;
    console.log(i);
  }
});
console.log(count);
