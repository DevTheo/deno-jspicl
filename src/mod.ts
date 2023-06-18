import * as esprima from "https://raw.githubusercontent.com/DevTheo/deno-esprima/v4.0.1pre2/src/mod.ts";
import {createJspiclTranspiler} from "./transpile.ts";
import {getRequiredPolyfills} from "./polyfills/get-required-polyfills.ts";
import {JspiclOptions, JspiclOutput} from "./types.ts";
import {prettify} from "./prettify.ts";``

export * from "./types.ts";

const defaultOptions: JspiclOptions = {
  prettify: true
};

export function jspicl(
  source: string,
  overrideOptions?: JspiclOptions
): JspiclOutput {
  const options = {
    ...defaultOptions,
    ...overrideOptions
  };

  const transpile = createJspiclTranspiler(options.customMappers);
  const {body} = esprima.parseScript(source, {loc: true, range: true});

  let code: string = transpile(body);

  if (options.prettify) {
    code = prettify(code);
  }

  return {
    polyfills: getRequiredPolyfills(code),
    code
  };
}
