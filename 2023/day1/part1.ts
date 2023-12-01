import path from "path";
import fs from "fs";

const __dirname = new URL('.', import.meta.url).pathname.slice(1);
export const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

const total = input.map(str => {
    let m = str.match("(\\d).*(\\d)")
    if(m) {
        return parseInt(m[1] + m[2])
    }
    // Just one digit
    m = str.match("(\\d)")
    return parseInt(m[1] + m[1])
}).reduce((acc, value) => acc + value)

console.log(total)