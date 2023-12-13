import path from "path";
import fs from "fs";

// https://adventofcode.com/2023/day/5
export let input = fs
    .readFileSync(path.join(__dirname, "exemple.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

type ConversionProperties = {
    source: number
    destination: number
    number: number
}

type Map = {
    properties: ConversionProperties[]
    next?: Map
}

const fillMaps = (input: string[], map: Map) => {
    // remove first map line, (ex: seed-to-soil map:)
    input.shift()
    while (input.length > 0 && input[0].length > 1) {
        const line: string = input.shift()
        const [destination, source, number] = line.split(' ').map(n => parseInt(n))
        map.properties.push({ source, destination, number })
    }
    if (input.length > 0) {
        // remove empty line between maps
        input.shift()
        fillMaps(input, map.next)
    }
}

const humidityToLocation: Map = { properties: [] }
const temperatureToHumidity: Map = { properties: [], next: humidityToLocation }
const lightToTemperature: Map = { properties: [], next: temperatureToHumidity }
const waterToLight: Map = { properties: [], next: lightToTemperature }
const fertilizerToWater: Map = { properties: [], next: waterToLight }
const soilToFertilizer: Map = { properties: [], next: fertilizerToWater }
const seedToSoil: Map = { properties: [], next: soilToFertilizer }
const seeds = input[0].substring(7).split(' ')
input = input.slice(2)

fillMaps(input, seedToSoil)
