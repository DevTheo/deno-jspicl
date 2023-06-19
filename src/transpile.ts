import createTranspiler from "https://raw.githubusercontent.com/DevTheo/deno-trastpiler/v1.0.4pre1/src/mod.ts";
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