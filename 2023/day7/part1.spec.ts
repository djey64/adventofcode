import { describe, expect, it } from "@jest/globals";
import { Hand, sortHands, toNumber } from "./part1";

describe('2023 Day 7', () => {
    describe('Sort cards', () => {
        it('should sort according uniqueness properly', () => {
            const a: Hand = { cards: "AAAAA", bid: 0 } // Five of a kind
            const b: Hand = { cards: "AA8AA", bid: 0 } // Four of a kind
            const e: Hand = { cards: "23432", bid: 0 } // Two pair
            const f: Hand = { cards: "A23A4", bid: 0 } // One pair
            const g: Hand = { cards: "23456", bid: 0 } // High card

            let sorted = sortHands([f, e, a, g, b])
            expect(sorted[0]).toEqual(g)
            expect(sorted[1]).toEqual(f)
            expect(sorted[2]).toEqual(e)
            expect(sorted[3]).toEqual(b)
            expect(sorted[4]).toEqual(a)
        })

        it('should sort AA8AA and 23332 properly', () => {
            const b: Hand = { cards: "AA8AA", bid: 0 } // Four of a kind
            const c: Hand = { cards: "23332", bid: 0 } // Full house

            let sorted = sortHands([b, c])
            expect(sorted[0]).toEqual(c)
            expect(sorted[1]).toEqual(b)

            sorted = sortHands([c, b])
            expect(sorted[0]).toEqual(c)
            expect(sorted[1]).toEqual(b)
        })

        it('should sort KK677 and KTJJT properly', () => {
            const a: Hand = { cards: "KK677", bid: 0 } // Two pair
            const b: Hand = { cards: "KTJJT", bid: 0 } // Two pair

            let sorted = sortHands([a, b])
            expect(sorted[0]).toEqual(b)
            expect(sorted[1]).toEqual(a)

            sorted = sortHands([b, a])
            expect(sorted[0]).toEqual(b)
            expect(sorted[1]).toEqual(a)
        })

        it('should sort a full set of cards property', () => {
            const a: Hand = { cards: "AAAAA", bid: 0 } // Five of a kind
            const b: Hand = { cards: "AA8AA", bid: 0 } // Four of a kind
            const c: Hand = { cards: "23332", bid: 0 } // Full house
            const d: Hand = { cards: "TTT98", bid: 0 } // Three of a kind
            const e: Hand = { cards: "23432", bid: 0 } // Two pair
            const f: Hand = { cards: "A23A4", bid: 0 } // One pair
            const g: Hand = { cards: "23456", bid: 0 } // High card

            let sorted = sortHands([e, d, a, f, c, b, g])
            expect(sorted[0]).toEqual(g)
            expect(sorted[1]).toEqual(f)
            expect(sorted[2]).toEqual(e)
            expect(sorted[3]).toEqual(d)
            expect(sorted[4]).toEqual(c)
            expect(sorted[5]).toEqual(b)
            expect(sorted[6]).toEqual(a)
        })
    })

    describe('toNumber', () => {
        it('Should works fine', () => {
            expect(toNumber('2')).toEqual(2)
            expect(toNumber('5')).toEqual(5)
            expect(toNumber('8')).toEqual(8)
            expect(toNumber('T')).toEqual(10)
            expect(toNumber('J')).toEqual(11)
            expect(toNumber('Q')).toEqual(12)
            expect(toNumber('K')).toEqual(13)
            expect(toNumber('A')).toEqual(14)
        })
    })
})