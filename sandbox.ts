// A dummy files to test manually rules

// eslint-disable-next-line no-console
console.log("hello");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const empty = 1;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dummy: any;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDummy = (param: unknown) => {
  // eslint-disable-next-line no-console
  console.log(`${dummy} and ${param}`);
};
