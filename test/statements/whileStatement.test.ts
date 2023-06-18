import * as esprima from "../../src/esprima.bundle.js";
import {WhileStatement} from "../../src/syntax-tree/statements/index.ts";
import { describe, it, expect } from "../bdd.js";
import {createJspiclTranspiler} from "../../src/transpile.ts";

describe("WhileStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("renders a while statement with a test expression and body", () => {
    const input = "while (testexpression) { content; }";
    const output = `while testexpression do
    content
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(WhileStatement(statement, parserOptions)).toBe(output);
  });
});
