import path from "path";
import fs from "fs";

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const cycles: Array<() => void> = [];
let x = 1;

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

let cycle = 0;
let CRT = "";
const screen: string[] = [];
while (cycles.length > 0) {
  if (cycle !== 0 && cycle % 40 === 0) {
    screen.push(CRT);
    CRT = "";
  }
  CRT += cycle % 40 >= x - 1 && cycle % 40 <= x + 1 ? "#" : ".";
  cycles.shift().call("");
  cycle++;
}
screen.push(CRT);
console.log(screen);
