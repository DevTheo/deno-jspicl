import {prettify} from "../src/prettify.ts";
import { describe, it, expect } from "./bdd.js";


describe("prettify", () => {
  it("indents lua code", () => {
    const input = Deno.readTextFileSync("./luacode.lua"); //.toString();
    const expected = Deno.readTextFileSync("./expected.lua"); //.toString();

    expect(prettify(input)).toBe(expected);
  });
});
