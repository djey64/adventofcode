import path from "path";
import fs from "fs";
import { assert } from "console";

const test = () => {
  assert(isTooFar({ x: 0, y: 0 }, { x: 1, y: 0 }) === false, "1");
  assert(isTooFar({ x: 0, y: 0 }, { x: 1, y: 1 }) === false, "2");
  assert(isTooFar({ x: 0, y: 0 }, { x: 0, y: 1 }) === false, "3");
  assert(isTooFar({ x: 0, y: 0 }, { x: -1, y: 1 }) === false, "4");
  assert(isTooFar({ x: 0, y: 0 }, { x: -1, y: -1 }) === false, "5");
  assert(isTooFar({ x: -1, y: -1 }, { x: 0, y: 0 }) === false, "6");
  assert(isTooFar({ x: 0, y: 0 }, { x: -2, y: 1 }) === true, "7");
  assert(isTooFar({ x: 0, y: 0 }, { x: 2, y: 1 }) === true, "8");
};

type Point = {
  x: number;
  y: number;
};

const isTooFar = (H: Point, T: Point): boolean => {
  return Math.abs(H.x - T.x) > 1 || Math.abs(H.y - T.y) > 1;
};

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const T: Point = { x: 0, y: 0 };
const H: Point = { x: 0, y: 0 };

const history = new Set();
history.add(JSON.stringify(T));

input.forEach((line) => {
  const [_, direction, count] = line.match("(.) (\\d+)");
  for (let i = 0; i < +count; i++) {
    const lastHeadPosition = { ...H };
    // Update H
    H.x = direction === "L" ? H.x - 1 : direction === "R" ? H.x + 1 : H.x;
    H.y = direction === "D" ? H.y - 1 : direction === "U" ? H.y + 1 : H.y;
    if (isTooFar(H, T)) {
      T.x = lastHeadPosition.x;
      T.y = lastHeadPosition.y;
      history.add(JSON.stringify(T));
    }
  }
});

test();
console.log(history.size);
