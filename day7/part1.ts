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

export const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const tree: Node = {
  type: NodeType.Directory,
  childs: [],
  size: 0,
  name: "Root",
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

const displayTree = (current: Node, level = 0) => {
  const indent = new Array(level + 1).join("--");
  current.childs.forEach((child) => {
    const size =
      child.type === NodeType.Directory ? " (" + child.size + ")" : "";
    console.log(indent + child.name + size);
    child.childs.forEach((c) => displayTree(c, level + 1));
  });
};

const findDirectoryAbove100ko = (current: Node): Node[] => {
  let dirs = current.size >= 100_000 ? [current] : [];
  current.childs
    .filter((c) => c.type === NodeType.Directory)
    .forEach((child) => {
      dirs.push(
        ...child.childs
          .filter((c) => c.type === NodeType.Directory)
          .flatMap((c) => findDirectoryAbove100ko(c))
      );
    });

  return dirs;
};

displayTree(tree);
console.log(findDirectoryAbove100ko(tree));
console.log(
  findDirectoryAbove100ko(tree)
    .map((dir) => dir.size)
    .reduce((acc, current) => acc + current)
);
