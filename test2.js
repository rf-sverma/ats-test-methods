function customTest(name, spec) {
    console.log(`Running test: ${name}`);
    const startTime = Date.now();
    try {
        if (spec.length > 0) {
            // If the spec function expects a done callback, assume it's asynchronous
            spec(function done(err) {
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

// Example usage:
customTest("Status code is 200", function () {
    if (pm.response.code !== 200) {
        throw new Error(`Expected status code 200 but got ${pm.response.code}`);
    }
});

customTest("Response time is less than 200ms", function () {
    if (pm.response.responseTime >= 200) {
        throw new Error(`Expected response time to be below 200ms but got ${pm.response.responseTime}ms`);
    }
});

customTest("Response contains key", function () {
    const jsonData = pm.response.json();
    if (!jsonData.key) {
        throw new Error(`Expected response to contain 'key' but got ${JSON.stringify(jsonData)}`);
    }
});

customTest("Asynchronous request test", function (done) {
    pm.sendRequest("https://postman-echo.com/get", function (err, response) {
        if (err) {
            return done(err);
        }
        if (response.status !== 200) {
            return done(new Error(`Expected status 200 but got ${response.status}`));
        }
        done();
    });
});

customTest("Environment variable set and get", function () {
    pm.environment.set("testKey", "testValue");
    const value = pm.environment.get("testKey");
    if (value !== "testValue") {
        throw new Error(`Expected environment variable 'testKey' to be 'testValue' but got '${value}'`);
    }
});

// Nested tests example
customTest("Nested tests example", function () {
    customTest("Inner test 1", function () {
        if (pm.response.code !== 200) {
            throw new Error(`Expected status code 200 but got ${pm.response.code}`);
        }
    });

    customTest("Inner test 2", function (done) {
        pm.sendRequest("https://postman-echo.com/get", function (err, response) {
            if (err) {
                return done(err);
            }
            if (response.status !== 200) {
                return done(new Error(`Expected status 200 but got ${response.status}`));
            }
            done();
        });
    });
});
