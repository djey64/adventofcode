export enum NodeType {
  Directory,
  File,
}

export type Node = {
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

export const displayTree = (current: Node, level = 0) => {
  const indent = new Array(level + 1).join("--");
  const size =
    current.type === NodeType.Directory ? " (" + current.size + ")" : "";
  console.log(indent + current.name + size);

  current.childs.forEach((c) => displayTree(c, level + 1));
};

export const buildTree = (input): Node => {
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

  return tree;
};
