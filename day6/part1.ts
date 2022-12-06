import path from "path";
import fs from "fs";

export const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString();

for (let i = 3; i < input.length; i++) {
  let set = new Set();
  set.add(input[i - 3]);
  set.add(input[i - 2]);
  set.add(input[i - 1]);
  set.add(input[i]);
  if (set.size === 4) {
    console.log(i + 1);
    break;
  }
}
