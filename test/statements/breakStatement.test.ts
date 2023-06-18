import {BreakStatement} from "../../src/syntax-tree/statements/index.ts";
import {createJspiclTranspiler} from "../../src/transpile.ts";
import { describe, it, expect } from "../bdd.js";

describe("BreakStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("returns `break` if not inside switch statement", () => {
    expect(BreakStatement({}, parserOptions)).toBe("break");
    expect(
      BreakStatement(
        {},
        {
          ...parserOptions,
          scope: {variables: {}, isInsideSwitch: false}
        }
      )
    ).toBe("break");
  });

  it("returns an empty string if inside switch statement", () => {
    expect(
      BreakStatement(
        {},
        {
          ...parserOptions,
          scope: {variables: {}, isInsideSwitch: true}
        }
      )
    ).toBe("");
  });
});
