import path from "path";
import fs from "fs";

// https://adventofcode.com/2023/day/7
export let input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n");

export type Hand = {
    cards: string
    bid: number
}

// Parse
const hands: Hand[] = input.map(line => {
    const [cards, bid] = line.split(' ')
    return { cards, bid: parseInt(bid) }
})

const facesToNumber: {[key: string]: number} = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10,
}

export const toNumber = (card: string) => {
    const v = parseInt(card)
    return isNaN(v) ? facesToNumber[card] : v
}

// Sort by increasing value
export const sortHands = (h: Hand[]) => h.sort((a: Hand, b: Hand) => {
    const splittedA = a.cards.split('')
    const splittedB = b.cards.split('')
    const setA = new Set(splittedA)
    const setB = new Set(splittedB)

    // Number of uniqueness => bigger first
    // Ex: AAAAA => 1 unique card, AA8AA, two unique cards
    if(setA.size !== setB.size) {
        return setB.size - setA.size
    } 

    // Count number of same cards => Min first
    // Ex: AA8AA => 4 same cards, 23332 => 3 same cards
    const maxA = Math.max(...[...setA].map(c => splittedA.filter(s => s === c).length).sort((a, b) => a - b))
    const maxB = Math.max(...[...setB].map(c => splittedB.filter(s => s === c).length).sort((a, b) => a - b))
    if (maxA !== maxB) {
        return maxA - maxB
    }
    
    // High card => First highest card win
    for(let i = 0; i < splittedA.length; i++) {
        if(splittedA[i] !== splittedB[i]) {
            return toNumber(splittedA[i]) - toNumber(splittedB[i])
        }
    }

    return 0
})

// Sort and compute result
const result = sortHands(hands).map(h => h.bid).reduce((acc, bid, rank) => acc + bid * (rank + 1) )
console.log(result)