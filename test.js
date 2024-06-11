class TestFramework {
    constructor() {
        this.tests = [];
        this.results = [];
    }

    test(name, spec) {
        this.tests.push({ name, spec });
    }

    async run() {
        for (const { name, spec } of this.tests) {
            const context = {};
            const startTime = Date.now();
            console.log(`Running test: ${name}`);
            try {
                if (spec.length > 0) {
                    // If the spec function expects a done callback, assume it's asynchronous
                    await new Promise((resolve, reject) => {
                        spec((err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });
                } else {
                    // Synchronous or async/await test
                    await spec(context);
                }
                const endTime = Date.now();
                this.results.push({ name, status: 'passed', time: endTime - startTime });
                console.log(`✔️ Test passed: ${name} (Time taken: ${endTime - startTime}ms)`);
            } catch (error) {
                const endTime = Date.now();
                this.results.push({ name, status: 'failed', time: endTime - startTime, error });
                console.error(`❌ Test failed: ${name} (Time taken: ${endTime - startTime}ms)`);
                console.error(error);
            }
        }
        this.report();
    }

    report() {
        console.log('\nTest Results:');
        for (const result of this.results) {
            if (result.status === 'passed') {
                console.log(`✔️ ${result.name} (Time taken: ${result.time}ms)`);
            } else {
                console.log(`❌ ${result.name} (Time taken: ${result.time}ms)`);
                console.error(result.error);
            }
        }
    }

    assertEqual(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(message || `Assertion failed: expected ${expected}, but got ${actual}`);
        }
    }

    assertNotEqual(actual, expected, message) {
        if (actual === expected) {
            throw new Error(message || `Assertion failed: did not expect ${actual}`);
        }
    }

    assertTrue(value, message) {
        if (!value) {
            throw new Error(message || `Assertion failed: expected true, but got ${value}`);
        }
    }

    assertFalse(value, message) {
        if (value) {
            throw new Error(message || `Assertion failed: expected false, but got ${value}`);
        }
    }
}

// Mock Postman pm object for demonstration
const pm = {
    response: {
        code: 200,
        responseTime: 150,
        json: function() {
            return { key: "value" };
        },
        text: function() {
            return '{"key":"value"}';
        },
        headers: {
            get: function(headerName) {
                return headerName === "Content-Type" ? "application/json" : null;
            }
        }
    },
    environment: {
        set: function(key, value) {
            console.log(`Environment variable set: ${key} = ${value}`);
        },
        get: function(key) {
            console.log(`Environment variable get: ${key}`);
            return "value";
        },
        unset: function(key) {
            console.log(`Environment variable unset: ${key}`);
        },
        clear: function() {
            console.log("Environment variables cleared");
        }
    },
    globals: {
        set: function(key, value) {
            console.log(`Global variable set: ${key} = ${value}`);
        },
        get: function(key) {
            console.log(`Global variable get: ${key}`);
            return "value";
        },
        unset: function(key) {
            console.log(`Global variable unset: ${key}`);
        },
        clear: function() {
            console.log("Global variables cleared");
        }
    },
    sendRequest: function(options, callback) {
        console.log(`Sending request to: ${options}`);
        // Mock response
        callback(null, { status: 200, json: () => ({ success: true }) });
    }
};

// Create test framework instance
const tf = new TestFramework();

// Define tests
tf.test("Status code is 200", function () {
    tf.assertEqual(pm.response.code, 200, `Expected status code 200 but got ${pm.response.code}`);
});

tf.test("Response time is less than 200ms", function () {
    tf.assertTrue(pm.response.responseTime < 200, `Expected response time to be below 200ms but got ${pm.response.responseTime}ms`);
});

tf.test("Response contains key", function () {
    const jsonData = pm.response.json();
    tf.assertTrue(jsonData.key !== undefined, `Expected response to contain 'key' but got ${JSON.stringify(jsonData)}`);
});

tf.test("Asynchronous request test", function (done) {
    pm.sendRequest("https://postman-echo.com/get", function (err, response) {
        if (err) {
            return done(err);
        }
        tf.assertEqual(response.status, 200, `Expected status 200 but got ${response.status}`);
        done();
    });
});

tf.test("Environment variable set and get", function () {
    pm.environment.set("testKey", "testValue");
    const value = pm.environment.get("testKey");
    tf.assertEqual(value, "testValue", `Expected environment variable 'testKey' to be 'testValue' but got '${value}'`);
});

// Run tests
tf.run();
