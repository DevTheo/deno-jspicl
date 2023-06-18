import * as esprima from "../../src/esprima.bundle.js";
import {ExpressionStatement} from "../../src/syntax-tree/statements/index.ts";
import { describe, it, expect } from "../bdd.js";
import {createJspiclTranspiler} from "../../src/transpile.ts";

describe("ExpressionStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("ignores 'use strict' directive", () => {
    const input = "'use strict'";
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(ExpressionStatement(statement, parserOptions)).toBe("");
  });

  it("ignores local 'use strict' directive", () => {
    const input = "function a () { 'use strict' }";
    const {
      body: [statement]
    } = esprima.parseScript(input);
    const output = "function a()\n    \n  end";

    expect(transpile(statement)).toBe(output);
  });
});
