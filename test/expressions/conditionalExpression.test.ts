import * as esprima from "../../src/esprima.bundle.js";
import { describe, it, expect } from "../bdd.js";
//import {ExpressionStatement} from "estree";
type ExpressionStatement = esprima.ExpressionStatement;
import {ConditionalExpression} from "../../src/syntax-tree/expressions/index.ts";
import {createJspiclTranspiler} from "../../src/transpile.ts";

describe("ConditionalExpression", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("renders a conditional expression as an inline function with if/else statement", () => {
    const input = "a ? b : c";
    const output = "(function () if a then return b else return c end end)()";
    const {body} = esprima.parseScript(input);
    const {expression} = body[0] as ExpressionStatement;

    expect(ConditionalExpression(expression, parserOptions)).toBe(output);
  });

  it("renders a nested conditional expression as an inline function with if/else statements", () => {
    const input = "a ? b ? c() : d : f()";
    const output =
      "(function () if a then return (function () if b then return c() else return d end end)() else return f() end end)()";
    const {body} = esprima.parseScript(input);
    const {expression} = body[0] as ExpressionStatement;

    expect(ConditionalExpression(expression, parserOptions)).toBe(output);
  });
});
