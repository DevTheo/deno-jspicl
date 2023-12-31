import * as esprima from "../../src/esprima.bundle.js";
import {ThrowStatement} from "../../src/syntax-tree/statements/index.ts";
import { describe, it, expect } from "../bdd.js";
import {createJspiclTranspiler} from "../../src/transpile.ts";

describe("ThrowStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };
  it("renders an assert with empty error message", () => {
    expect(ThrowStatement({}, parserOptions)).toBe('assert(false, "")');
  });

  it("renders an assert with an error message", () => {
    const {
      body: [argument]
    } = esprima.parseScript("Error('Error message')");
    expect(ThrowStatement({argument}, parserOptions)).toBe(
      "assert(false, \"error('Error message')\")"
    );
  });

  it("renders an assert with a custom object", () => {
    const {
      body: [argument]
    } = esprima.parseScript(`(${JSON.stringify({message: "Error message"})})`);
    expect(ThrowStatement({argument}, parserOptions)).toBe(
      'assert(false, "{\\n    message = \\"Error message\\"\\n  }")'
    );
  });
});
