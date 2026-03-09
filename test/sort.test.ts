import { describe, expect, it } from "vitest";

import { sort } from "../index";

type SortCase = {
  name: string;
  input: {
    width: number;
    height: number;
    length: number;
    mass: number;
  };
  expected: "STANDARD" | "SPECIAL" | "REJECTED";
};

const CASES: SortCase[] = [
  {
    name: "returns STANDARD for a package below all thresholds",
    input: { width: 10, height: 20, length: 30, mass: 5 },
    expected: "STANDARD",
  },
  {
    name: "returns SPECIAL for a heavy package below bulky thresholds",
    input: { width: 10, height: 20, length: 30, mass: 20 },
    expected: "SPECIAL",
  },
  {
    name: "returns SPECIAL for a package bulky by volume only",
    input: { width: 100, height: 100, length: 100, mass: 19.9 },
    expected: "SPECIAL",
  },
  {
    name: "returns SPECIAL for a package bulky by a single dimension only",
    input: { width: 150, height: 10, length: 10, mass: 5 },
    expected: "SPECIAL",
  },
  {
    name: "returns REJECTED for a package that is both bulky and heavy",
    input: { width: 100, height: 100, length: 100, mass: 20 },
    expected: "REJECTED",
  },
  {
    name: "treats the volume threshold as inclusive",
    input: { width: 100, height: 100, length: 100, mass: 19 },
    expected: "SPECIAL",
  },
  {
    name: "treats the mass threshold as inclusive",
    input: { width: 100, height: 100, length: 99, mass: 20 },
    expected: "SPECIAL",
  },
  {
    name: "treats the dimension threshold as inclusive",
    input: { width: 150, height: 149, length: 149, mass: 20 },
    expected: "REJECTED",
  },
];

describe("sort", () => {
  it.each(CASES)("$name", ({ input, expected }) => {
    expect(sort(input.width, input.height, input.length, input.mass)).toBe(expected);
  });
});
