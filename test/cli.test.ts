import { describe, expect, it, vi } from "vitest";

import { createProgram } from "../cli";

describe("cli", () => {
  it("prints the sorted stack for valid numeric arguments", () => {
    const log = vi.fn();
    const program = createProgram({ log });

    program.parse(["node", "smarter-sort", "100", "100", "100", "20"], {
      from: "node",
    });

    expect(log).toHaveBeenCalledWith("REJECTED");
  });

  it("rejects non-numeric arguments", () => {
    const log = vi.fn();
    const errorSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const exitOverride = vi
      .spyOn(process, "exit")
      .mockImplementation(((code?: string | number | null | undefined) => {
        throw new Error(`process.exit:${code ?? 0}`);
      }) as typeof process.exit);

    expect(() => {
      createProgram({ log }).parse(["node", "smarter-sort", "abc", "10", "10", "5"], {
        from: "node",
      });
    }).toThrow("process.exit:1");

    expect(log).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
    exitOverride.mockRestore();
  });
});
