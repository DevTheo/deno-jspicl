import * as esprima from "../../src/esprima.bundle.js";
import {ForStatement} from "../../src/syntax-tree/statements/index.ts";
import { describe, it, expect } from "../bdd.js";
import {createJspiclTranspiler} from "../../src/transpile.ts";

describe("ForStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("renders a while statement", () => {
    const input = "for(var i=0; i<1; i++) {content}";
    const output = `local i = 0
  while i < 1 do
    content
    i+=1
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(ForStatement(statement, parserOptions)).toBe(output);
  });

  it("handles multiple initializations", () => {
    const input = "for(var i=0, j=2; i<3; i+=3) {content;}";
    const output = `local i = 0
local j = 2
  while i < 3 do
    content
    i+=3
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(ForStatement(statement, parserOptions)).toBe(output);
  });

  it("handles multiple updateExpressions", () => {
    const input = "for(var i=0, j=2; i<3; i+=3, j--) {content;}";
    const output = `local i = 0
local j = 2
  while i < 3 do
    content
    i+=3
j-=1
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(ForStatement(statement, parserOptions)).toBe(output);
  });
});
