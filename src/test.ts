import atsPromise from './indexClass.js';

async function main() {
    const ats = await atsPromise;
    let a = 3;
    console.log("load ", ats.expect);
    try {
        ats.expect.expect(a).equal(4);
        console.log("Assertion passed.");
    } catch (error) {
        console.error("Assertion failed: ", error.message);
    }
}

main();
