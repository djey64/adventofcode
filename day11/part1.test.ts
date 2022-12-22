import { expect, describe, it, jest, test } from "@jest/globals";
import { computeOperation } from "./part1";

describe("computeOperation", () => {
  it("sould works fine", () => {
    expect(computeOperation(1, "  Operation: new = old + 11")).toEqual(12);
    expect(computeOperation(2, "  Operation: new = old - 2")).toEqual(0);
    expect(computeOperation(2, "  Operation: new = old * 2")).toEqual(4);
    expect(computeOperation(10, "  Operation: new = old / 2")).toEqual(5);
    expect(computeOperation(10, "  Operation: new = old * old")).toEqual(100);
  });
});
