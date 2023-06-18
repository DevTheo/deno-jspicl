import {EmptyStatement} from "../../src/syntax-tree/statements/index.ts";
import {createJspiclTranspiler} from "../../src/transpile.ts";
import { describe, it, expect } from "../bdd.js";


describe("EmptyStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("returns an empty string", () => {
    expect(EmptyStatement({}, parserOptions)).toBe("");
  });
});
