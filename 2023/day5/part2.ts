import path from "path";
import fs from "fs";

// https://adventofcode.com/2023/day/5
export let input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

type ConversionProperties = {
    source: number
    destination: number
    number: number
}

type Map = {
    ranges: ConversionProperties[]
    next?: Map
}

const fillMaps = (input: string[], map: Map) => {
    // remove first map line, (ex: seed-to-soil map:)
    input.shift()
    while (input.length > 0 && input[0].length > 1) {
        const line: string = input.shift()
        const [destination, source, number] = line.split(' ').map(n => parseInt(n))
        map.ranges.push({ source, destination, number })
    }
    if (input.length > 0) {
        // remove empty line between maps
        input.shift()
        fillMaps(input, map.next)
    }
}

const findLocation = (n: number, map: Map): number => {
    let destinationNumber = n

    map.ranges.forEach(range => {
        if(n >= range.source && n <= range.source + (range.number - 1)) {
            destinationNumber = destinationNumber + (range.destination - range.source)
        }
    })

    if (map.next) {
        return findLocation(destinationNumber, map.next)
    }

    return destinationNumber;
}

const humidityToLocation: Map = { ranges: [] }
const temperatureToHumidity: Map = { ranges: [], next: humidityToLocation }
const lightToTemperature: Map = { ranges: [], next: temperatureToHumidity }
const waterToLight: Map = { ranges: [], next: lightToTemperature }
const fertilizerToWater: Map = { ranges: [], next: waterToLight }
const soilToFertilizer: Map = { ranges: [], next: fertilizerToWater }
const seedToSoil: Map = { ranges: [], next: soilToFertilizer }
const seeds = input[0].substring(7).split(' ').map(s => parseInt(s))
input = input.slice(2)

fillMaps(input, seedToSoil)

let minLocation = Number.MAX_VALUE

// Bruteforce... to be optimized !
for(let i = 0; i < seeds.length; i += 2) {
    for(let k = seeds[i]; k < seeds[i] + seeds[i + 1]; k++) {
        minLocation = Math.min(minLocation, findLocation(k, seedToSoil))
    }
}
console.log(minLocation)