import path from "path";
import fs from "fs";
import { buildTree, displayTree, Node, NodeType } from "./common";

const findDirectoryBellow100ko = (current: Node): Node[] => {
  let dirs = current.size <= 100_000 ? [current] : [];
  current.childs
    .filter((c) => c.type === NodeType.Directory)
    .forEach((child) => {
      dirs.push(...findDirectoryBellow100ko(child));
    });

  return dirs;
};

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const tree = buildTree(input);

displayTree(tree);
console.log(
  findDirectoryBellow100ko(tree)
    .map((dir) => dir.size)
    .reduce((acc, current) => acc + current)
);
