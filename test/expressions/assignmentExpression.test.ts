import * as esprima from "../../src/esprima.bundle.js";
import { describe, it, expect } from "../bdd.js";
//import {ExpressionStatement} from "estree";
type ExpressionStatement = esprima.ExpressionStatement;
import {AssignmentExpression} from "../../src/syntax-tree/expressions/index.ts";
import {createJspiclTranspiler} from "../../src/transpile.ts";

describe("AssignmentExpression", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  ["*=", "+=", "-=", "%=", "/="].forEach((operator) =>
    it(`renders two expressions separated by an ${operator}`, () => {
      const input = `variable ${operator} value`;
      const output = `variable${operator}value`;
      const {body} = esprima.parseScript(input);
      const {expression} = body[0] as ExpressionStatement;

      expect(AssignmentExpression(expression, parserOptions)).toBe(output);
    })
  );
});
