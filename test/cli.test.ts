import { describe, expect, it, vi } from "vitest";

import { createProgram } from "../cli";

describe("cli", () => {
  it("prints the sorted stack for valid numeric options", () => {
    const log = vi.fn();
    const program = createProgram({ log });

    program.parse(
      [
        "node",
        "smarter-sort",
        "--width",
        "100",
        "--height",
        "100",
        "--lenght",
        "100",
        "--mass",
        "20",
      ],
      {
        from: "node",
      },
    );

    expect(log).toHaveBeenCalledWith("REJECTED");
  });

  it("rejects non-numeric option values", () => {
    const log = vi.fn();
    const errorSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const exitOverride = vi
      .spyOn(process, "exit")
      .mockImplementation(((code?: string | number | null | undefined) => {
        throw new Error(`process.exit:${code ?? 0}`);
      }) as typeof process.exit);

    expect(() => {
      createProgram({ log }).parse(
        [
          "node",
          "smarter-sort",
          "--width",
          "abc",
          "--height",
          "10",
          "--lenght",
          "10",
          "--mass",
          "5",
        ],
        {
          from: "node",
        },
      );
    }).toThrow("process.exit:1");

    expect(log).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
    exitOverride.mockRestore();
  });

  it("accepts short option aliases", () => {
    const log = vi.fn();
    const program = createProgram({ log });

    program.parse(
      ["node", "smarter-sort", "-w", "100", "-h", "100", "-l", "100", "-m", "19"],
      {
        from: "node",
      },
    );

    expect(log).toHaveBeenCalledWith("SPECIAL");
  });
});
