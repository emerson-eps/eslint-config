// A dummy files to test manually rules
/* eslint-disable no-console */

import { spawnSync } from "child_process";

// eslint-disable-next-line sonarjs/unused-import
import _json5 from "json5";

const first = 0;

// eslint-disable-next-line import-x/first
import pkg from "./package.json" with { type: "json" };

// eslint-disable-next-line import-x/first, import-x/order
import fs from "fs";

console.log("hello");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const empty = 1;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dummy: any;

console.log(fs.readSync);

// test sonarjs/todo-tag
// TODO something to do

// test sonarjs/fixme-tag
// FIXME something to do

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
export const getNotUsed = (param: unknown) => {
  console.log(`Unused parameter`);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDummy = (param: unknown) => {
  console.log(`${dummy} and ${param} a, ${first}, ${pkg.version}`);
};

const args = ["rev-parse", "HEAD"];

// test sonarjs/no-os-command-from-path
spawnSync("git", args, { encoding: "utf8" });

// test sonarjs/no-nested-functions
[[[[[[[]]]]]]].forEach((f) =>
  f.forEach((f) =>
    f.forEach((f) =>
      f.forEach((f) => f.forEach((f) => console.log(`deep ${f}`))),
    ),
  ),
);
