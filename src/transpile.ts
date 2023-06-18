import createTranspiler from "https://esm.sh/trastpiler@1.0.2";
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