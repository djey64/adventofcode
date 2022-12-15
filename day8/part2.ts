import path from "path";
import fs from "fs";

const computeScenicScore = (m: number[][], i: number, j: number): number => {
  if (i === 0 || i === m.length - 1 || j === 0 || j === m[0].length - 1)
    return 0;

  let count = 0;
  // check to the top
  for (let k = i - 1; k >= 0; k--) {
    count++;
    if (m[k][j] >= m[i][j]) break;
  }
  let score = count;
  count = 0;
  // Check bottom
  for (let k = i + 1; k < m.length; k++) {
    count++;
    if (m[k][j] >= m[i][j]) break;
  }
  score *= count;
  count = 0;
  // Check Left
  for (let k = j - 1; k >= 0; k--) {
    count++;
    if (m[i][k] >= m[i][j]) break;
  }
  score *= count;
  count = 0;
  // Check right
  for (let k = j + 1; k < m[0].length; k++) {
    count++;
    if (m[i][k] >= m[i][j]) break;
  }
  score *= count;

  return score;
};

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split("").map((i) => +i));

const matrix = input.map((i) => i.map(() => 0));

let max = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    matrix[i][j] = computeScenicScore(input, i, j);
    max = Math.max(max, computeScenicScore(input, i, j));
  }
}

console.log(max);
