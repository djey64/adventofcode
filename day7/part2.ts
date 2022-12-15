import path from "path";
import fs from "fs";
import { buildTree, displayTree, Node, NodeType } from "./common";

const findCandidatesDirectoryToDelete = (
  current: Node,
  minSpace: number
): Node[] => {
  let dirs = current.size >= minSpace ? [current] : [];
  current.childs
    .filter((c) => c.type === NodeType.Directory)
    .forEach((child) => {
      dirs.push(...findCandidatesDirectoryToDelete(child, minSpace));
    });

  return dirs;
};

export const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const tree: Node = buildTree(input);
const freeSpace = 70_000_000 - tree.size;
const minSpaceRequired = 30_000_000 - freeSpace;

displayTree(tree);
console.log(
  findCandidatesDirectoryToDelete(tree, minSpaceRequired).sort(
    (a, b) => a.size - b.size
  )[0].size
);
