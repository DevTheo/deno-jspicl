import {BlockStatement} from "../../src/syntax-tree/statements/index.ts";
import {createJspiclTranspiler} from "../../src/transpile.ts";
import { describe, it, expect } from "../bdd.js";

describe("BlockStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("returns empty string if body is missing", () => {
    expect(BlockStatement({}, parserOptions)).toBe("");
  });

  it("processes body", () => {
    expect(
      BlockStatement({body: {type: "Literal", raw: "value"}}, parserOptions)
    ).toBe("value");
  });

  it("adds a scope boundary", () => {
    expect(BlockStatement.scopeBoundary).toBe(true);
  });
});
