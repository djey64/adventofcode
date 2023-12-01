import path from "path";
import fs from "fs";

const __dirname = new URL('.', import.meta.url).pathname.slice(1);
export const input = fs
    .readFileSync(path.join(__dirname, "input2.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");
