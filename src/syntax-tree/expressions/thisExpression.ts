import {AstNodeParser} from "../../types.ts";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#this-expression
export const ThisExpression: AstNodeParser = () => "this";
