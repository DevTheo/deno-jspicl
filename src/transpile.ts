import createTranspiler from "trastpiler";
import * as globalMappers from "./syntax-tree/index.ts";

export function createJspiclTranspiler(
  customMappers?: Object,
  initialScopeData?: Object
) {
  return createTranspiler({
    initialScopeData,
    mappers: {
      ...globalMappers,
      ...customMappers
    }
  });
}