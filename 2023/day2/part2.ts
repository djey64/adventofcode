import path from "path";
import fs from "fs";

export const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

let count = 0
input.forEach(line => {
    const sets = line.split(';')
    const fewest: {[key: string]: number} = {red: 0, green: 0, blue: 0}
    sets.forEach(set => {
        const cubes = set.split(',')
        cubes.forEach(cube => {
            const [_, n, color] = cube.match('(\\d+) (blue|green|red)')
            fewest[color] = Math.max(parseInt(n), fewest[color])
        })
    })
    count += fewest.red * fewest.green * fewest.blue
})
console.log(count)