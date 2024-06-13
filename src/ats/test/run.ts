export const run =(name: any, spec:any)=> {
    console.log(`Running test: ${name}`);
    const startTime = Date.now();
    try {
        if (spec.length > 0) {
            // If the spec function expects a done callback, assume it's asynchronous
            spec(function done(err: any) {
                const endTime = Date.now();
                if (err) {
                    console.error(`❌ Test failed: ${name} (Time taken: ${endTime - startTime}ms)`);
                    console.error(err);
                } else {
                    console.log(`✔️ Test passed: ${name} (Time taken: ${endTime - startTime}ms)`);
                }
            });
        } else {
            // Synchronous test
            spec();
            const endTime = Date.now();
            console.log(`✔️ Test passed: ${name} (Time taken: ${endTime - startTime}ms)`);
        }
    } catch (error) {
        const endTime = Date.now();
        console.error(`❌ Test failed: ${name} (Time taken: ${endTime - startTime}ms)`);
        console.error(error);
    }
}