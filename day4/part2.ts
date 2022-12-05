import path from "path";
import fs from "fs";

export const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

let count = input.length;
console.log(input.length);
input.forEach((i) => {
  const [first, second] = i.split(",");

  const [f1, f2] = first.split("-");
  const [s1, s2] = second.split("-");

  if (+f2 < +s1 || +f1 > +s2) {
    count--;
    console.log(i);
  }
});
console.log(count);
