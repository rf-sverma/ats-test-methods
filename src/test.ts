import atsPromise from "./index.js";
async function main() {
  const ats = await atsPromise;
  let a = 3;
  console.log("load ", ats);
  ats.collectionVariables.clear();
  ats.response.toJSON();
  ats.test.run();
  try {
    ats.assert.expect(a).equal(3);
    console.log("Assertion passed.");
  } catch (error: any) {
    console.error("Assertion failed: ", error.message);
  }
}
main();
