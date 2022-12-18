import path from "path";
import fs from "fs";

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const cycles: Array<() => void> = [];
let x = 1;
let signals = 0;

input.forEach((str) => {
  if (str.startsWith("noop")) {
    cycles.push(() => {});
  } else {
    const [_, amount] = str.split(" ");
    cycles.push(() => {});
    cycles.push(() => {
      x += parseInt(amount);
    });
  }
});

let cycle = 1;
while (cycles.length > 0) {
  if (
    cycle === 20 ||
    cycle === 60 ||
    cycle === 100 ||
    cycle === 140 ||
    cycle === 180 ||
    cycle === 220
  ) {
    signals += cycle * x;
  }
  cycles.shift().call("");

  cycle++;
}
console.log(signals);
