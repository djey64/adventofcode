import path from "path";
import fs from "fs";

enum NodeType {
  Directory,
  File,
}

type Node = {
  parent?: Node;
  type: NodeType;
  childs: Node[];
  size: number;
  name: string;
};

export const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const createDir = (parent: Node, dirName: string) =>
  parent.childs.push({
    parent,
    type: NodeType.Directory,
    childs: [],
    size: 0,
    name: dirName,
  });

const updateDirSize = (dir: Node, size: number) => {
  dir.size += size;
  if (dir.parent) updateDirSize(dir.parent, size);
};

const createFile = (dir: Node, fileName: string, size: number) => {
  dir.childs.push({
    parent: dir,
    type: NodeType.File,
    childs: [],
    size,
    name: fileName,
  });
  updateDirSize(dir, size);
};

const displayTree = (current: Node, level = 0) => {
  const indent = new Array(level + 1).join("--");
  const size =
    current.type === NodeType.Directory ? " (" + current.size + ")" : "";
  console.log(indent + current.name + size);

  current.childs.forEach((c) => displayTree(c, level + 1));
};

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

const tree: Node = {
  type: NodeType.Directory,
  childs: [],
  size: 0,
  name: "/",
};

let current = tree;

const changeDirRegex = "^\\$ cd (\\S+)";
const createDirRegex = "^dir (\\S+)";
const createFileRegex = "^(\\d+) (\\S+)";

input.forEach((str) => {
  if (str.match(changeDirRegex)) {
    const [_, dirName] = str.match(changeDirRegex);
    if (dirName === "..") current = current.parent;
    else if (dirName !== "/")
      current = current.childs.find((c) => c.name === dirName);
  } else if (str.match(createDirRegex)) {
    const [_, dirName] = str.match(createDirRegex);
    createDir(current, dirName);
  } else if (str.match(createFileRegex)) {
    const [_, fileSize, fileName] = str.match(createFileRegex);
    createFile(current, fileName, +fileSize);
  }
});

const freeSpace = 70_000_000 - tree.size;
const minSpaceRequired = 30_000_000 - freeSpace;

displayTree(tree);
console.log(
  findCandidatesDirectoryToDelete(tree, minSpaceRequired).sort(
    (a, b) => a.size - b.size
  )[0].size
);
