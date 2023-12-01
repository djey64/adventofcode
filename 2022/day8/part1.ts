import path from "path";
import fs from "fs";

const isVisible = (m: number[][], i: number, j: number) => {
  if (i === 0 || i === m.length - 1 || j === 0 || j === m[0].length - 1)
    return true;

  // check to the top if all trees are smaller (visible true)
  for (let k = i - 1; k >= 0; k--) {
    if (m[k][j] >= m[i][j]) break;
    if (k === 0) return true;
  }
  // Check bottom
  for (let k = i + 1; k < m.length; k++) {
    if (m[k][j] >= m[i][j]) break;
    if (k === m.length - 1) return true;
  }
  // Check Left
  for (let k = j - 1; k >= 0; k--) {
    if (m[i][k] >= m[i][j]) break;
    if (k === 0) return true;
  }
  // Check right
  for (let k = j + 1; k < m[0].length; k++) {
    if (m[i][k] >= m[i][j]) break;
    if (k === m[0].length - 1) return true;
  }

  return false;
};

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split("").map((i) => +i));

let count = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (isVisible(input, i, j)) count++;
  }
}

console.log(count);
