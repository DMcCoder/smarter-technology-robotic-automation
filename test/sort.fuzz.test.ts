import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

import { sort, type Stack } from "../index";

const BULKY_VOLUME_THRESHOLD = 1_000_000;
const BULKY_DIMENSION_THRESHOLD = 150;
const SAMPLE_SIZE = 25;

type Package = {
  width: number;
  height: number;
  length: number;
  mass: number;
};

function randomFloat(min: number, max: number, precision = 2): number {
  return faker.number.float({
    min,
    max,
    fractionDigits: precision,
  });
}

function randomDimension(max = 149): number {
  return faker.number.int({ min: 1, max });
}

function createStandardPackage(): Package {
  return {
    width: randomDimension(99),
    height: randomDimension(99),
    length: randomDimension(99),
    mass: randomFloat(0.1, 19.99),
  };
}

function createHeavyOnlyPackage(): Package {
  return {
    width: randomDimension(99),
    height: randomDimension(99),
    length: randomDimension(99),
    mass: randomFloat(20, 100),
  };
}

function createBulkyByVolumeOnlyPackage(): Package {
  const base = faker.number.int({ min: 100, max: 149 });

  return {
    width: base,
    height: base,
    length: faker.number.int({
      min: Math.ceil(BULKY_VOLUME_THRESHOLD / (base * base)),
      max: 149,
    }),
    mass: randomFloat(0.1, 19.99),
  };
}

function createBulkyByDimensionOnlyPackage(): Package {
  return {
    width: faker.number.int({ min: BULKY_DIMENSION_THRESHOLD, max: 300 }),
    height: randomDimension(80),
    length: randomDimension(80),
    mass: randomFloat(0.1, 19.99),
  };
}

function createRejectedPackage(): Package {
  return {
    width: faker.number.int({ min: BULKY_DIMENSION_THRESHOLD, max: 300 }),
    height: randomDimension(100),
    length: randomDimension(100),
    mass: randomFloat(20, 100),
  };
}

function assertSortResult(createPackage: () => Package, expectedStack: Stack): void {
  for (let index = 0; index < SAMPLE_SIZE; index += 1) {
    const generatedPackage = createPackage();
    const result = sort(
      generatedPackage.width,
      generatedPackage.height,
      generatedPackage.length,
      generatedPackage.mass,
    );

    expect(
      result,
      `generated package ${JSON.stringify(generatedPackage)} should be ${expectedStack}`,
    ).toBe(expectedStack);
  }
}

describe("sort fuzz coverage", () => {
  it("covers packages that are neither bulky nor heavy", () => {
    assertSortResult(createStandardPackage, "STANDARD");
  });

  it("covers packages that are heavy only", () => {
    assertSortResult(createHeavyOnlyPackage, "SPECIAL");
  });

  it("covers packages that are bulky by volume only", () => {
    assertSortResult(createBulkyByVolumeOnlyPackage, "SPECIAL");
  });

  it("covers packages that are bulky by a single dimension only", () => {
    assertSortResult(createBulkyByDimensionOnlyPackage, "SPECIAL");
  });

  it("covers packages that are both bulky and heavy", () => {
    assertSortResult(createRejectedPackage, "REJECTED");
  });
});
