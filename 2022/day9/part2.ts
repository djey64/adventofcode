import path from "path";
import fs from "fs";

class LinkedNode {
  id: string;
  x: number;
  y: number;
  previous?: LinkedNode;
  next?: LinkedNode;

  constructor(
    id: string,
    x: number,
    y: number,
    previous?: LinkedNode,
    next?: LinkedNode
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.previous = previous;
    this.next = next;
  }

  hasNext = () => !!this.next;
  hasPrevious = () => !!this.previous;
  getCoords = () => JSON.stringify({ x: this.x, y: this.y });
}

const initLinkedList = () => {
  const H = new LinkedNode("H", 0, 0);
  let current = H;
  for (let i = 0; i < 9; i++) {
    current.next = new LinkedNode(i + 1 + "", 0, 0, current);
    current = current.next;
  }

  return [H, current];
};

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

// Init linked list
const [H, T] = initLinkedList();

const history = new Set();
history.add(T.getCoords());

input.forEach((line) => {
  const [direction, count] = line.split(" ");
  for (let i = 0; i < +count; i++) {
    // Update H
    H.x = direction === "L" ? H.x - 1 : direction === "R" ? H.x + 1 : H.x;
    H.y = direction === "D" ? H.y - 1 : direction === "U" ? H.y + 1 : H.y;
    let current = H;
    while (current.hasNext()) {
      const dx = current.x - current.next.x;
      const dy = current.y - current.next.y;
      if (Math.abs(dx) === 2 || Math.abs(dy) === 2) {
        current.next.x +=
          dx > 0 ? Math.min(1, dx) : dx < 0 ? Math.max(-1, dx) : 0;
        current.next.y +=
          dy > 0 ? Math.min(1, dy) : dy < 0 ? Math.max(-1, dy) : 0;
      }
      current = current.next;
    }
    history.add(T.getCoords());
  }
});

console.log(history.size);
