import * as esprima from "../../src/esprima.bundle.js";
import {DoWhileStatement} from "../../src/syntax-tree/statements/index.ts";
import {createJspiclTranspiler} from "../../src/transpile.ts";
import { describe, it, expect } from "../bdd.js";

describe("DoWhileStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("transpiles body and test expression", () => {
    const input = "while (testexpression) { body; }";
    const {
      body: [statement]
    } = esprima.parseScript(input);

    const output = `repeat
    body
  until not (testexpression)`;

    expect(DoWhileStatement(statement, parserOptions)).toBe(output);
  });
});
