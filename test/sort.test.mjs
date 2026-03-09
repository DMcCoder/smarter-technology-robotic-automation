import { describe, expect, it } from "vitest";

import sortingModule from "../index.js";

const { sort } = sortingModule;

describe("sort", () => {
  it("returns STANDARD for packages that are neither bulky nor heavy", () => {
    expect(sort(10, 20, 30, 5)).toBe("STANDARD");
  });

  it("returns SPECIAL when package is heavy only", () => {
    expect(sort(10, 20, 30, 20)).toBe("SPECIAL");
  });

  it("returns SPECIAL when package is bulky by volume only", () => {
    expect(sort(100, 100, 100, 19.9)).toBe("SPECIAL");
  });

  it("returns SPECIAL when package is bulky by a single dimension", () => {
    expect(sort(150, 10, 10, 5)).toBe("SPECIAL");
  });

  it("returns REJECTED when package is both bulky and heavy", () => {
    expect(sort(100, 100, 100, 20)).toBe("REJECTED");
  });

  it("uses inclusive threshold checks", () => {
    expect(sort(100, 100, 100, 19)).toBe("SPECIAL");
    expect(sort(100, 100, 99, 20)).toBe("SPECIAL");
    expect(sort(150, 149, 149, 20)).toBe("REJECTED");
  });
});
