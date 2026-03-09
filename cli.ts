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
    .helpOption("--help", "display help for command")
    .showHelpAfterError()
    .requiredOption("-w, --width <width>", "package width in centimeters", (value) =>
      parseNumber(value, "width"),
    )
    .requiredOption("-h, --height <height>", "package height in centimeters", (value) =>
      parseNumber(value, "height"),
    )
    .requiredOption("-l, --lenght <length>", "package length in centimeters", (value) =>
      parseNumber(value, "length"),
    )
    .requiredOption("-m, --mass <mass>", "package mass in kilograms", (value) =>
      parseNumber(value, "mass"),
    )
    .action((options: { width: number; height: number; lenght: number; mass: number }) => {
      dependencies.log(sort(options.width, options.height, options.lenght, options.mass));
    });

  return program;
}

export { createProgram };

if (import.meta.url === `file://${process.argv[1]}`) {
  createProgram().parse();
}
