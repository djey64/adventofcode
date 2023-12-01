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

const stacks = [
  ["B", "Q", "C"],
  ["R", "Q", "W", "Z"],
  ["B", "M", "R", "L", "V"],
  ["C", "Z", "H", "V", "T", "W"],
  ["D", "Z", "H", "B", "N", "V", "G"],
  ["H", "N", "P", "C", "J", "F", "V", "Q"],
  ["D", "G", "T", "R", "W", "Z", "S"],
  ["C", "G", "M", "N", "B", "W", "Z", "P"],
  ["N", "J", "B", "M", "W", "Q", "F", "P"],
];

input.forEach((str) => {
  const [quantity, from, to] = str.match(/\d+/g).map((e) => parseInt(e));

  for (let i = 0; i < quantity; i++) {
    if (stacks[from - 1].length > 0)
      stacks[to - 1].push(stacks[from - 1].pop());
  }
});
console.log(stacks.map((stack) => stack.pop()).join(""));
