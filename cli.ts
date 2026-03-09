#!/usr/bin/env node

import { Command, InvalidArgumentError } from "commander";

import { sort } from "./index.js";

type CliDependencies = {
  log: (message: string) => void;
};

function parseNumber(value: string, label: string): number {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new InvalidArgumentError(`${label} must be a valid number.`);
  }

  return parsedValue;
}

function createProgram(dependencies: CliDependencies = { log: console.log }): Command {
  const program = new Command();

  program
    .name("smarter-sort")
    .description("Classify a package as STANDARD, SPECIAL, or REJECTED.")
    .argument("<width>", "package width in centimeters", (value) =>
      parseNumber(value, "width"),
    )
    .argument("<height>", "package height in centimeters", (value) =>
      parseNumber(value, "height"),
    )
    .argument("<length>", "package length in centimeters", (value) =>
      parseNumber(value, "length"),
    )
    .argument("<mass>", "package mass in kilograms", (value) =>
      parseNumber(value, "mass"),
    )
    .action((width: number, height: number, length: number, mass: number) => {
      dependencies.log(sort(width, height, length, mass));
    });

  return program;
}

export { createProgram };

if (import.meta.url === `file://${process.argv[1]}`) {
  createProgram().parse();
}
