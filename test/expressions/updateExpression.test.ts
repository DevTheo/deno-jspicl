import * as esprima from "../../src/esprima.bundle.js";
import { describe, it, expect } from "../bdd.js";
//import {ExpressionStatement} from "estree";
type ExpressionStatement = esprima.ExpressionStatement;
import {UpdateExpression} from "../../src/syntax-tree/expressions/index.ts";
import {createJspiclTranspiler} from "../../src/transpile.ts";

describe("UpdateExpression", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  [
    ["++", "+="],
    ["--", "-="]
  ].forEach(([jsOperator, luaOperator]) =>
    it(`returns 'variable${luaOperator}1' expression for ${jsOperator} updateExpression`, () => {
      const input = `variable${jsOperator}`;
      const output = `variable${luaOperator}1`;
      const {body} = esprima.parseScript(input);
      const {expression} = body[0] as ExpressionStatement;

      expect(UpdateExpression(expression, parserOptions)).toBe(output);
    })
  );
});
