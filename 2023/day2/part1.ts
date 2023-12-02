import path from "path";
import fs from "fs";

export const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

const MAX: {[key: string]: number} = {
    red: 12,
    green: 13,
    blue: 14
}

let count = 0
input.forEach(line => {
    const [_, gameIndex] = line.match('Game (\\d+)')
    const sets = line.split(';')
    let impossible = false
    sets.forEach(set => {
        const cubes = set.split(',')
        cubes.forEach(cube => {
            const [_, n, color] = cube.match('(\\d+) (blue|green|red)')
            if(parseInt(n) > MAX[color]) {
                impossible = true
                return
            }
        })
        if(impossible) return
    })
    if(!impossible) count += parseInt(gameIndex)
})
console.log(count)