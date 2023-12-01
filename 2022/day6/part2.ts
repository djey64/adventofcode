import path from "path";
import fs from "fs";

export const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString();

for (let i = 13; i < input.length; i++) {
  let set = new Set();
  for (let j = i - 13; j <= i; j++) {
    set.add(input[j]);
  }
  if (set.size === 14) {
    console.log(i + 1);
    break;
  }
}
