// A dummy files to test manually rules
/* eslint-disable no-console */

import { spawnSync } from "node:child_process";

// eslint-disable-next-line sonarjs/unused-import
import _json5 from "json5";

const first = 0;

// eslint-disable-next-line import-x/first
import pkg from "./package.json" with { type: "json" };

// eslint-disable-next-line import-x/first, import-x/order
import fs from "node:fs";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getNotUsed = (param: unknown): void => {
  console.log(`Unused parameter`);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDummy = (param: unknown) => {
  console.log(`${dummy} and ${param} a, ${first}, ${pkg.version}`);
};

const args = ["rev-parse", "HEAD"];

// test sonarjs/no-os-command-from-path
spawnSync("git", args, { encoding: "utf8" });

// test sonarjs/no-nested-functions level 5
for (const f of [[[[[[[]]]]]]]) {
  for (const f2 of f) {
    for (const f3 of f2) {
      for (const f4 of f3) {
        for (const f5 of f4) {
          console.log(`deep ${f5}`);
        }
      }
    }
  }
}
