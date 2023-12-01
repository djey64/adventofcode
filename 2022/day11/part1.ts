import path from "path";
import fs from "fs";

type Monkey = {
  items: number[];
  op: (old: number) => number;
  div: number;
  trueTrowTo: number;
  falseTrowTo: number;
  inspectCount: number;
};

export const computeOperation = (old: number, op: string) => {
  // Operation: new = old * 19
  const [_, operator, operand] = op.match("old (.) (.+)");
  const intOperand = operand === "old" ? old : parseInt(operand);
  switch (operator) {
    case "+":
      return old + intOperand;
    case "-":
      return old - intOperand;
    case "*":
      return old * intOperand;
    case "/":
      return old / intOperand;
    default:
      return -1;
  }
};

const readMonkeys = (input: string[]): Monkey[] => {
  const monkeys: Monkey[] = [];
  for (let i = 0; i < input.length - 5; i += 7) {
    // Starting items: 84, 66, 62, 69, 88, 91, 91
    const items = input[i + 1].match(/\d+/g).map((e) => parseInt(e));
    //  Operation: new = old * 11
    const op = (old: number) => computeOperation(old, input[i + 2]);
    // Test: divisible by 2
    const div = parseInt(input[i + 3].match("(\\d+)")[0]);
    //   If true: throw to monkey 4
    const trueTrowTo = parseInt(input[i + 4].match("(\\d+)")[0]);
    //   If false: throw to monkey 7
    const falseTrowTo = parseInt(input[i + 5].match("(\\d+)")[0]);

    monkeys.push({ items, op, div, trueTrowTo, falseTrowTo, inspectCount: 0 });
  }
  return monkeys;
};

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const monkeys: Monkey[] = readMonkeys(input);

for (let i = 0; i < 20; i++) {
  monkeys.forEach((m) => {
    while (m.items.length > 0) {
      m.inspectCount++;
      const item = m.items.shift();
      const newWorry = m.op(item);
      monkeys[
        Math.floor(newWorry / 3) % m.div === 0 ? m.trueTrowTo : m.falseTrowTo
      ].items.push(Math.floor(newWorry / 3));
    }
  });
}

const sorted = monkeys.sort((a, b) => b.inspectCount - a.inspectCount);
console.log(sorted[0].inspectCount * sorted[1].inspectCount);
