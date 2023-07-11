// A dummy files to test manually rules
/* eslint-disable no-console */

import _json5 from "json5";

const first = 0;

// eslint-disable-next-line import/first
import pkg from "./package.json";

// eslint-disable-next-line import/first, import/order
import fs from "fs";

console.log("hello");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const empty = 1;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dummy: any;

console.log(fs.readSync);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDummy = (param: unknown) => {
  console.log(`${dummy} and ${param} a, ${first}, ${pkg.version}`);
};
