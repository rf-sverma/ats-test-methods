// make an axios wrapper
const axios = {
    get: (url) => {
        console.log(`GET request to ${url}`);
        return { data: 'response' };
    },
    post: (url, data) => {
        console.log(`POST request to ${url} with data:`, data);
    },
    delete: (url) => {
        console.log(`DELETE request to ${url}`);
    }
};


const pm = {
    collectionVariables: {
        // This variable indicates if the collection variables are disabled
        disabled: 'boolean',

        // Clears all collection variables
        clear: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.collectionVariables = {};
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to clear the env data by axios
            // axios.post(`/environment/${currentEnv.id}/collectionVariables/clear`);
        },

        // Describes the collection variables content with optional type filtering
        describe: (content, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const description = Object.keys(currentEnv.collectionVariables).map(key => {
                return {
                    key: key,
                    value: currentEnv.collectionVariables[key],
                    type: typeof currentEnv.collectionVariables[key]
                };
            });

            return description;
        },

        // Disables tracking of collection variables
        disableTracking: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.trackingEnabled = false;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to disable tracking by axios
            // axios.post(`/environment/${currentEnv.id}/collectionVariables/disableTracking`);
        },

        // Enables tracking of collection variables with optional settings
        enableTracking: (options) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.trackingEnabled = true;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to enable tracking by axios
            // axios.post(`/environment/${currentEnv.id}/collectionVariables/enableTracking`, { options });
        },
        // Finds a property in parent environments using a customizer function
        findInParents: (property, customizer) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.parent;
            while (parent) {
                if (customizer(parent[property])) {
                    return parent[property];
                }
                parent = parent.parent;
            }
            return null;
        },

        // Finds and returns substitutions for collection variables
        findSubstitutions: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.collectionVariables;
        },

        // Iterates over each parent environment with optional root inclusion
        forEachParent: (options, iterator) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.parent;
            if (options.withRoot) {
                iterator(currentEnv);
            }
            while (parent) {
                iterator(parent);
                parent = parent.parent;
            }
        },

        // Gets the value of a collection variable by key
        get: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.collectionVariables[key];
        },

        // Checks if a collection variable exists by key
        has: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return key in currentEnv.collectionVariables;
        },

        // Placeholder for the collection variable ID
        id: 'string',

        // Returns metadata for the collection variables
        meta: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return {
                id: currentEnv.id,
                name: currentEnv.name,
                createdAt: currentEnv.createdAt,
                updatedAt: currentEnv.updatedAt
            };
        },

        // Returns the parent environment
        parent: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.parent;
        },

        // Replaces placeholders in a template with corresponding collection variable values
        replaceIn: (template) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.collectionVariables[key] || '');
        },

        // Placeholder for the collection variable name
        name: 'string',

        // Sets a collection variable with an optional type
        set: (key, value, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.collectionVariables[key] = value;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.post(`/environment/${currentEnv.id}/variables`, { key, value, type });
        },

        // Converts the collection variables to a JSON string
        toJSON: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return JSON.stringify(currentEnv.collectionVariables);
        },

        // Converts the collection variables to an object with various options
        toObject: (excludeDisabled, caseSensitive) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let result = {};
            for (const [key, value] of Object.entries(currentEnv.collectionVariables)) {
                if (excludeDisabled && value.disabled) continue;
                if (caseSensitive) result[key] = value;
                else result[key.toLowerCase()] = value;
            }
            return result;
        },

        // Unsets (removes) a collection variable by key
        unset: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            delete currentEnv.collectionVariables[key];
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.delete(`/environment/${currentEnv.id}/variables/${key}`);
        }
    },



    cookies: {
        data: [],
        // add : Add a cookie to the cookies data array.

        add: (item) => {
            environment.cookies.data.push(item);
            // make axios call to add the cookie to the cookies data array
        },

        // append: Add a cookie to the cookies data array.
        append: (item) => {
            environment.cookies.data.push(item);
            // make axios call to add the cookie to the cookies data array
        },


        // all: Returns all cookies.
        all: () => {
            // let cookies = axios.get('/cookies'); //make axios call to get all cookies
            // return cookies;

            // else return environment.cookies.data; which is an array of cookies in local storage of the browser
            // return environment.cookies.data;
        },

        // clear: Clears all cookies.
        clear: () => {
            // make axios call to clear all cookies
            // let cookies = axios.delete('/cookies');
            environment.cookies.data = [];
        },

        // count: Returns the number of cookies.
        count: () => {
            // make axios call to get the number of cookies
            // let cookies = axios.get('/cookies');
            // return cookies.length;

            // else return the length of the cookies data array
            return environment.cookies.data.length;
        },

        // jar: Returns all cookies (same as all for simplicity).
        jar: () => {
            // let cookies = axios.get('/cookies'); //make axios call to get all cookies
            // return cookies;

            // else return environment.cookies.data; which is an array of cookies in local storage of the browser
            return environment.cookies.data;
        },

        // toString: Converts cookies data to a JSON string.
        toString: () => {
            // make axios call to get all cookies
            // let cookies = axios.get('/cookies');
            // return JSON.stringify(cookies);

            // else return the cookies data array as a JSON string
            return JSON.stringify(environment.cookies.data);
        },

        // each: Iterates over each cookie and applies the given function.
        each: (iterator, context) => {
            // the cookie data has to get from the environment or the axios call then iterate over it
            environment.cookies.data.forEach((item, index) => iterator.call(context, item, index));
        },

        // remove: Removes cookies that match the given predicate.
        remove: (predicate, context) => {
            // the cookie data has to get from the environment or the axios call then iterate over it
            environment.cookies.data = environment.cookies.data.filter(item => !predicate.call(context, item));
            // make axios call to remove the cookies that match the given predicate
            // axios.delete('/cookies', { data: { predicate } });
        },

        // reduce: Reduces the cookies data using the given function.
        reduce: (iterator, accumulator, context) => {
            let data = environment.cookies.data.reduce((acc, item, index) => iterator.call(context, acc, item, index), accumulator);
            // make api call to add the data to the cookies
        },

        // map: Maps each cookie using the given function.
        map: (iterator, context) => {
            return environment.cookies.data.map((item, index) => iterator.call(context, item, index));
        },

        // eachParent: Iterates over parent cookies (assuming a parent property).
        eachParent: (iterator, context) => {
            // Assuming eachParent is supposed to iterate over parent cookies
            const parents = environment.cookies.data.filter(item => item.parent);
            parents.forEach((item, index) => iterator.call(context, item, index));
        },

        // filter: Filters cookies based on the given rule.
        filter: (rule, context) => {
            return environment.cookies.data.filter((item, index) => rule.call(context, item, index));
        },

        // find: Finds a cookie based on the given rule.
        find: (rule, context) => {
            return environment.cookies.data.find((item, index) => rule.call(context, item, index));
        },

        // get: Gets a cookie by key or by predicate function.
        get: (key) => {
            // make axios call to get the cookie by key
            let cookies = axios.get(`/cookies/${key}`);
            if (typeof key === 'function') {
                return cookies.data.find(key);
            } else {
                return cookies.data.find(item => item.key === key);
            }
        },

        // has: Checks if a cookie exists by key or value.
        has: (item, value) => {
            // make axios call to get the cookie by key
            let cookies = axios.get(`/cookies`);
            if (value !== undefined) {
                return cookies.data.some(cookie => cookie[item] === value);
            } else {
                return cookies.data.includes(item);
            }
        },

        // idx: Gets a cookie by index.
        idx: (index) => {
            return cookies.data[index];
        },

        // indexOf: Gets the index of a cookie.
        indexOf: (item) => {
            return cookies.data.indexOf(item);
        },

        // prepend: Adds a cookie to the beginning of the cookies data array.
        prepend: (item) => {
            let cookies = axios.get('/cookies');
            cookies.data.unshift(item);
            // make axios call to add the cookie to the cookies data array
        },

        // upsert: Updates an existing cookie or inserts a new one.
        upsert: (item) => {
            let cookies = axios.get('/cookies');
            const index = cookies.data.findIndex(cookie => cookie.key === item.key);
            if (index !== -1) {
                cookies.data[index] = item;
            } else {
                cookies.data.push(item);
            }
            // make axios call to update the cookie
        },

        // populate: Replaces the current cookies data with the given items.
        populate: (items) => {
            let cookies = axios.get('/cookies');
            cookies.data = items;
            // make axios call to populate the cookies data
        },

        // repopulate: Same as populate.
        repopulate: (items) => {
            let cookies = axios.get('/cookies');
            cookies.data = items;
            // make axios call to repopulate the cookies data
        },

        // one: Finds a cookie by ID.
        one: (id) => {
            let cookies = axios.get('/cookies');
            let data = cookies.data.find(cookie => cookie.id === id);
            return data;
        },

        // insert: Inserts a cookie before another cookie.
        insert: (item, before) => {
            let cookies = axios.get('/cookies');
            const index = cookies.data.indexOf(before);
            if (index !== -1) {
                cookies.data.splice(index, 0, item);
            } else {
                cookies.data.push(item);
            }
            // make axios call to insert the cookie before another cookie
        },

        // insertAfter: Inserts a cookie after another cookie.
        insertAfter: (item, after) => {
            let cookies = axios.get('/cookies');
            const index = cookies.data.indexOf(after);
            if (index !== -1) {
                cookies.data.splice(index + 1, 0, item);
            } else {
                cookies.data.push(item);
            }
            // make axios call to insert the cookie after another cookie
        },

        // assimilate: Assimilates a source of cookies data.
        assimilate: (source, prune) => {
            let cookies = axios.get('/cookies');
            if (Array.isArray(source)) {
                cookies.data = prune ? source : cookies.data.concat(source);
            } else if (source === 'PropertyList') {
                // Assuming PropertyList is a predefined list of cookies
                cookies.data = prune ? PropertyList : cookies.data.concat(PropertyList);
            }
        },

        // toObject: Converts cookies data to an object with various options.
        toObject: (excludeDisabled, caseSensitive, multiValue, sanitizeKeys) => {
            let result = {};
            let cookies = axios.get('/cookies');
            cookies.data.forEach(cookie => {
                if (excludeDisabled && cookie.disabled) return;

                let key = sanitizeKeys ? cookie.key.replace(/[^a-zA-Z0-9]/g, '') : cookie.key;
                if (!caseSensitive) key = key.toLowerCase();

                if (multiValue) {
                    if (!result[key]) result[key] = [];
                    result[key].push(cookie.value);
                } else {
                    result[key] = cookie.value;
                }
            });
            return result;
        }
    },



    environment: {

        clear: () => {
            const currentEnv = localStorage.getItem('envId');
            // make axios call to clear the environment variables using this info :{currentEnv}

        },

        describe: (content: string, type?: string) => {
            // NOTE: assume in variables inside the environment is a json object. that also has a key value pair of variables
            const currentEnv = localStorage.getItem('envId');
            const description = Object.keys(currentEnv.variables).map(key => {
                return {
                    key: key,
                    value: currentEnv.variables[key],
                    type: typeof currentEnv.variables[key]
                };
            });

            return description;
        },

        disableTracking: () => {
            const currentEnv = localStorage.getItem('envId');
            const trackingSystem = {
                isTracking: currentEnv === 'tracking' ? true : false,
                stop: function () {
                    this.isTracking = false;
                    // make axios call to stop tracking
                }
            };
            if (trackingSystem.isTracking) trackingSystem.stop();
            else console.log("Tracking is already disabled");
        },

        disabled: 'boolean',

        enableTracking: (options?: 'MutationTracker.definition') => {
            const currentEnv = localStorage.getItem('envId');
            const trackingSystem = {
                isTracking: currentEnv === 'tracking' ? true : false,
                start: function () {
                    this.isTracking = false;
                    // make axios call to start tracking
                }
            };
            if (trackingSystem.isTracking) trackingSystem.start();
            else console.log("Tracking is already enabled");
        },

        findInParents: (property: string, customizer?: (...params: any[]) => any) => {
            const currentEnv = localStorage.getItem('envId');
            const findProperty = (obj, prop) => {
                if (obj.hasOwnProperty(prop)) return obj[prop];
                for (const key in obj) {
                    if (typeof obj[key] === 'object') {
                        const result = findProperty(obj[key], prop);
                        if (result !== undefined) {
                            return result;
                        }
                    }
                }
                return undefined;
            };
            let value = findProperty(currentEnv.variables, property);
            if (customizer && typeof customizer === 'function') value = customizer(value);
            return value;
        },

        findSubstitutions: () => {
            const currentEnv = localStorage.getItem('envId');
            const resolveValue = (value, vars) => {
                if (typeof value === 'string' && value.startsWith('{{') && value.endsWith('}}')) {
                    const key = value.slice(2, -2);
                    // call axios to get the value of the key or use it from the variables if available
                    return vars[key] ? resolveValue(vars[key], vars) : value;
                }
                return value;
            };

            const substitutions = {};
            for (const key in currentEnv.variables) {
                substitutions[key] = resolveValue(currentEnv.variables[key], currentEnv.variables);
            }
            return substitutions;
        },

        forEachParent: (options: { withRoot?: boolean; }, iterator: (...params: any[]) => any) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const parents = currentEnv.parents || [];
            if (options.withRoot) {
                iterator(currentEnv);
            }
            parents.forEach(parent => {
                iterator(parent);
            });
        },

        get: (key: string) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            // Assuming environment variables are stored as key-value pairs in currentEnv.variables
            return currentEnv.variables[key];
            // To make an axios call, you can do something like this:
            // axios.get(`/environment/${currentEnv}/variables/${key}`).then(response => {
            //     return response.data;
            // });
        },

        has: (key: string) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            // Assuming environment variables are stored as key-value pairs in currentEnv.variables
            return key in currentEnv.variables;
        },

        id: 'string',

        meta: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return {
                id: currentEnv.id,
                name: currentEnv.name,
                createdAt: currentEnv.createdAt,
                updatedAt: currentEnv.updatedAt
            };
        },

        name: 'string',

        parent: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.parent;
        },

        replaceIn: (template) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.variables[key] || '');
        },

        set: (key, value, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.variables[key] = value;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make axios call to set the environment variables by this id :{currentEnv}
            // axios.post(`/environment/${currentEnv.id}/variables`, { key, value, type });
        },

        toJSON: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return JSON.stringify(currentEnv);
        },

        toObject: (excludeDisabled, caseSensitive) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let result = {};
            for (const [key, value] of Object.entries(currentEnv.variables)) {
                if (excludeDisabled && value.disabled) continue;
                if (caseSensitive) result[key] = value.value;
                else result[key.toLowerCase()] = value.value;
            }
            return result;
        },

        unset: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            delete currentEnv.variables[key];
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make axios call to unset the environment variable by this id :{currentEnv}
            // axios.delete(`/environment/${currentEnv.id}/variables/${key}`);
        }
    },



    execution: {
        location: 'ExecutionLocation',

        setNextRequest: (request) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.nextRequest = request;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // Optionally, make an axios call to persist this change to a server
            // axios.post(`/environment/${currentEnv.id}/nextRequest`, { request });
        }

    },


    expect: {
        // Applies a function with a given this argument and optional arguments array
        apply: (thisArg, argArray) => {
            // Assuming there's an internal function to be applied
            const result = thisArg.apply(null, argArray);
            return result;
            // make a call to log the apply action by axios
            // axios.post(`/log/apply`, { thisArg, argArray, result });
        },

        // Binds a function to a given this argument and optional arguments
        bind: (thisArg, ...argArray) => {
            const boundFunction = thisArg.bind(null, ...argArray);
            return boundFunction;
            // make a call to log the bind action by axios
            // axios.post(`/log/bind`, { thisArg, argArray });
        },

        // Calls a function with a given this argument and optional arguments
        call: (thisArg, ...argArray) => {
            const result = thisArg.call(null, ...argArray);
            return result;
            // make a call to log the call action by axios
            // axios.post(`/log/call`, { thisArg, argArray, result });
        },

        // Fails an expectation with an optional message
        fail: (message) => {
            throw new Error(message || "Expectation failed");
            // make a call to log the failure by axios
            // axios.post(`/log/fail`, { message });
        },

        // Placeholder for expect function arguments
        arguments: 'any',

        // Placeholder for expect function caller
        caller: 'Function',

        // Placeholder for expect function length
        length: 'number',

        // Placeholder for expect function name
        name: 'string',

        // Placeholder for expect function prototype
        prototype: 'any',

        // Converts the expect object to a string
        toString: () => {
            return '[object Expect]';
        }
    },



    globals: {
        // Clears all global variables
        clear: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.globals = {};
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to clear the env data by axios
            // axios.post(`/environment/${currentEnv.id}/clearGlobals`);
        },

        // Describes the global variables content with optional type filtering
        describe: (content, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const description = Object.keys(currentEnv.globals).map(key => {
                return {
                    key: key,
                    value: currentEnv.globals[key],
                    type: typeof currentEnv.globals[key]
                };
            });

            return description;
        },

        // Disables tracking of global variables
        disableTracking: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.trackingEnabled = false;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.post(`/environment/${currentEnv.id}/disableTracking`);
        },

        // Indicates if the global variables are disabled
        disabled: 'boolean',

        // Enables tracking of global variables with optional settings
        enableTracking: (options) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.trackingEnabled = true;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.post(`/environment/${currentEnv.id}/enableTracking`, options);
        },

        // Finds a property in parent environments using a customizer function
        findInParents: (property, customizer) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.parent;
            while (parent) {
                if (customizer(parent[property])) {
                    return parent[property];
                }
                parent = parent.parent;
            }
            return null;
        },

        // Finds and returns substitutions for global variables
        findSubstitutions: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.globals;
        },

        // Iterates over each parent environment with optional root inclusion
        forEachParent: (options, iterator) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.parent;
            if (options.withRoot) {
                iterator(currentEnv);
            }
            while (parent) {
                iterator(parent);
                parent = parent.parent;
            }
        },

        // Gets the value of a global variable by key
        get: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.globals[key];
        },

        // Checks if a global variable exists by key
        has: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return key in currentEnv.globals;
        },

        // Placeholder for the global variable ID
        id: 'string',

        // Returns metadata for the global variables
        meta: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return {
                id: currentEnv.id,
                name: currentEnv.name,
                createdAt: currentEnv.createdAt,
                updatedAt: currentEnv.updatedAt
            };
        },

        // Returns the parent environment
        parent: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.parent;
        },

        // Replaces placeholders in a template with corresponding global variable values
        replaceIn: (template) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.globals[key] || '');
        },

        // Placeholder for the global variable name
        name: 'string',

        // Sets a global variable with an optional type
        set: (key, value, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.globals[key] = value;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.post(`/environment/${currentEnv.id}/globals`, { key, value, type });
        },

        // Converts the global variables to a JSON string
        toJSON: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return JSON.stringify(currentEnv.globals);
        },

        // Converts the global variables to an object with various options
        toObject: (excludeDisabled, caseSensitive) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let result = {};
            for (const [key, value] of Object.entries(currentEnv.globals)) {
                if (excludeDisabled && value.disabled) continue;
                if (caseSensitive) result[key] = value;
                else result[key.toLowerCase()] = value;
            }
            return result;
        },

        // Unsets (removes) a global variable by key
        unset: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            delete currentEnv.globals[key];
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.delete(`/environment/${currentEnv.id}/globals/${key}`);
        }
    },



    info: {
        eventName: 'string',
        iteration: 'number',
        iterationCount: 'number',
        requestId: 'string',
        requestName: 'string',
    },



    iterationData: {
        // Clears all iteration data
        clear: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.iterationData = {};
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to clear the iteration data by axios
            // axios.post(`/environment/${currentEnv.id}/clearIterationData`);
        },

        // Describes the iteration data content with optional type filtering
        describe: (content, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const description = Object.keys(currentEnv.iterationData).map(key => {
                return {
                    key: key,
                    value: currentEnv.iterationData[key],
                    type: typeof currentEnv.iterationData[key]
                };
            });

            return description;
        },

        // Disables tracking of iteration data
        disableTracking: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.trackingEnabled = false;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.post(`/environment/${currentEnv.id}/disableTracking`);
        },

        // Indicates if the iteration data is disabled
        disabled: 'boolean',

        // Enables tracking of iteration data with optional settings
        enableTracking: (options) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.trackingEnabled = true;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.post(`/environment/${currentEnv.id}/enableTracking`, options);
        },

        // Finds a property in parent environments using a customizer function
        findInParents: (property, customizer) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.parent;
            while (parent) {
                if (customizer(parent[property])) {
                    return parent[property];
                }
                parent = parent.parent;
            }
            return null;
        },

        // Finds and returns substitutions for iteration data
        findSubstitutions: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.iterationData;
        },

        // Iterates over each parent environment with optional root inclusion
        forEachParent: (options, iterator) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.parent;
            if (options.withRoot) {
                iterator(currentEnv);
            }
            while (parent) {
                iterator(parent);
                parent = parent.parent;
            }
        },

        // Gets the value of an iteration data item by key
        get: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.iterationData[key];
        },

        // Checks if an iteration data item exists by key
        has: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return key in currentEnv.iterationData;
        },

        // Placeholder for the iteration data ID
        id: 'string',

        // Returns metadata for the iteration data
        meta: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return {
                id: currentEnv.id,
                name: currentEnv.name,
                createdAt: currentEnv.createdAt,
                updatedAt: currentEnv.updatedAt
            };
        },

        // Returns the parent environment
        parent: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.parent;
        },

        // Replaces placeholders in a template with corresponding iteration data values
        replaceIn: (template) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.iterationData[key] || '');
        },

        // Placeholder for the iteration data name
        name: 'string',

        // Sets an iteration data item with an optional type
        set: (key, value, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.iterationData[key] = value;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the iteration data by axios
            // axios.post(`/environment/${currentEnv.id}/iterationData`, { key, value, type });
        },

        // Converts the iteration data to a JSON string
        toJSON: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return JSON.stringify(currentEnv.iterationData);
        },

        // Converts the iteration data to an object with various options
        toObject: (excludeDisabled, caseSensitive) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let result = {};
            for (const [key, value] of Object.entries(currentEnv.iterationData)) {
                if (excludeDisabled && value.disabled) continue;
                if (caseSensitive) result[key] = value;
                else result[key.toLowerCase()] = value;
            }
            return result;
        },

        // Unsets (removes) an iteration data item by key
        unset: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            delete currentEnv.iterationData[key];
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the iteration data by axios
            // axios.delete(`/environment/${currentEnv.id}/iterationData/${key}`);
        }
    },



    request: {
        // Adds a header to the request
        addHeader: (header) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.request.headers.push(header);
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the request headers by axios
            // axios.post(`/environment/${currentEnv.id}/request/headers`, { header });
        },

        // Adds query parameters to the request
        addQueryParams: (params) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            if (typeof params === 'string') {
                currentEnv.request.queryParams.push(params);
            } else {
                currentEnv.request.queryParams.push(...params);
            }
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the request query parameters by axios
            // axios.post(`/environment/${currentEnv.id}/request/queryParams`, { params });    FROM RIFAT
        },

        // Placeholder for request authentication
        auth: 'RequestAuth',

        // Authorizes the request using a specific type and optional options
        authorizeUsing: (type, options) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.request.auth = { type, options };
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the request authorization by axios
            // axios.post(`/environment/${currentEnv.id}/request/auth`, { type, options });
        },

        // Placeholder for request body
        body: 'RequestBody',

        // Placeholder for request certificate
        certificate: 'Certificate',

        // Clones the request
        clone: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const clonedRequest = JSON.parse(JSON.stringify(currentEnv.request));
            return clonedRequest;
        },

        // Describes the request content with optional type filtering
        describe: (content, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const description = Object.keys(currentEnv.request).map(key => {
                return {
                    key: key,
                    value: currentEnv.request[key],
                    type: typeof currentEnv.request[key]
                };
            });

            return description;
        },

        // Indicates if the request is disabled
        disabled: 'boolean',

        // Finds a property in parent requests using a customizer function
        findInParents: (property, customizer) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.request.parent;
            while (parent) {
                if (customizer(parent[property])) {
                    return parent[property];
                }
                parent = parent.parent;
            }
            return null;
        },

        // Finds and returns substitutions for request data
        findSubstitutions: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.request.findSubstitutions;
        },

        // Iterates over each parent request with optional root inclusion
        forEachParent: (options, iterator) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.request.parent;
            if (options.withRoot) {
                iterator(currentEnv.request);
            }
            while (parent) {
                iterator(parent);
                parent = parent.parent;
            }
        },

        // Iterates over each request header
        forEachHeader: (callback) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.request.headers.forEach(callback);
        },

        // Gets the request headers with optional settings
        getHeaders: (options) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let headers = currentEnv.request.headers;
            if (options) {
                if (options.ignoreCase) {
                    headers = headers.map(header => ({ ...header, key: header.key.toLowerCase() }));
                }
                if (options.enabled) {
                    headers = headers.filter(header => !header.disabled);
                }
                if (options.multiValue) {
                    headers = headers.reduce((acc, header) => {
                        acc[header.key] = acc[header.key] ? [...acc[header.key], header.value] : [header.value];
                        return acc;
                    }, {});
                }
                if (options.sanitizeKeys) {
                    headers = headers.map(header => ({ ...header, key: header.key.replace(/[^a-zA-Z0-9]/g, '') }));
                }
            }
            return headers;
        },

        // Placeholder for request headers
        headers: 'HeaderList',

        // Placeholder for request ID
        id: 'string',

        // Returns metadata for the request
        meta: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return {
                id: currentEnv.request.id,
                name: currentEnv.request.name,
                createdAt: currentEnv.request.createdAt,
                updatedAt: currentEnv.request.updatedAt
            };
        },
        // Placeholder for the request method
        method: 'string',

        // Placeholder for the request name
        name: 'string',

        // Returns the parent request
        parent: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.request.parent;
        },

        // Placeholder for the request proxy configuration
        proxy: 'ProxyConfig',

        // Removes a header from the request
        removeHeader: (toRemove, options) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const headers = currentEnv.request.headers;
            const index = headers.findIndex(header => options.ignoreCase ? header.toLowerCase() === toRemove.toLowerCase() : header === toRemove);
            if (index !== -1) {
                headers.splice(index, 1);
                localStorage.setItem('envId', JSON.stringify(currentEnv));
                // make a call to update the request data by axios
                // axios.delete(`/environment/${currentEnv.id}/request/header`, { header: toRemove, options });
            }
        },

        // Removes query parameters from the request
        removeQueryParams: (params) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            if (typeof params === 'string') {
                params = [params];
            }
            currentEnv.request.queryParams = currentEnv.request.queryParams.filter(param => !params.includes(param));
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the request data by axios
            // axios.delete(`/environment/${currentEnv.id}/queryParams`, { data: { params } });
        },

        // Returns the size of the request
        size: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.request.size;
        },

        // Converts the request object to a JSON string
        toJSON: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return JSON.stringify(currentEnv.request);
        },

        // Updates the request with given options
        update: (options) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            Object.assign(currentEnv.request, options);
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the request data by axios
            // axios.put(`/environment/${currentEnv.id}/request`, options);
        },

        // Upserts (updates or inserts) a header in the request
        upsertHeader: (header) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const existingHeaderIndex = currentEnv.request.headers.findIndex(h => h.key.toLowerCase() === header.key.toLowerCase());
            if (existingHeaderIndex !== -1) {
                currentEnv.request.headers[existingHeaderIndex] = header;
            } else {
                currentEnv.request.headers.push(header);
            }
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the request header data by axios
            // axios.post(`/environment/${currentEnv.id}/headers`, header);
        },

        // Placeholder for the request URL
        url: 'Url'
    },



    require: {
        // Applies a function with a given this argument and optional arguments array
        apply: (thisArg, argArray) => {
            // Assuming there's an internal function to be applied
            const result = thisArg.apply(null, argArray);
            return result;
            // make a call to log the apply action by axios
            // axios.post(`/log/apply`, { thisArg, argArray, result });
        },

        // Binds a function to a given this argument and optional arguments
        bind: (thisArg, ...argArray) => {
            const boundFunction = thisArg.bind(null, ...argArray);
            return boundFunction;
            // make a call to log the bind action by axios
            // axios.post(`/log/bind`, { thisArg, argArray });
        },

        // Calls a function with a given this argument and optional arguments
        call: (thisArg, ...argArray) => {
            const result = thisArg.call(null, ...argArray);
            return result;
            // make a call to log the call action by axios
            // axios.post(`/log/call`, { thisArg, argArray, result });
        },

        // Placeholder for require function arguments
        arguments: 'any',

        // Placeholder for require function caller
        caller: 'Function',

        // Placeholder for require function length
        length: 'number',

        // Placeholder for require function name
        name: 'string',

        // Placeholder for require function prototype
        prototype: 'any',

        // Converts the require object to a string
        toString: () => {
            return '[object Require]';
        }
    },



    response: {
        // Placeholder for response body
        body: 'string',

        // Placeholder for response code
        code: 'number',

        // Returns content information
        contentInfo: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.response.contentInfo;
        },

        // Placeholder for response cookies
        cookies: 'CookieList',

        // Returns the data URI of the response
        dataURI: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.response.dataURI;
        },

        // Describes the response content with optional type filtering
        describe: (content, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const description = Object.keys(currentEnv.response).map(key => {
                return {
                    key: key,
                    value: currentEnv.response[key],
                    type: typeof currentEnv.response[key]
                };
            });

            return description;
        },

        // Indicates if the response is disabled
        disabled: 'boolean',

        // Finds a property in parent responses using a customizer function
        findInParents: (property, customizer) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.response.parent;
            while (parent) {
                if (customizer(parent[property])) {
                    return parent[property];
                }
                parent = parent.parent;
            }
            return null;
        },

        // Finds and returns substitutions for response data
        findSubstitutions: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.response.findSubstitutions;
        },

        // Iterates over each parent response with optional root inclusion
        forEachParent: (options, iterator) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.response.parent;
            if (options.withRoot) {
                iterator(currentEnv.response);
            }
            while (parent) {
                iterator(parent);
                parent = parent.parent;
            }
        },

        // Placeholder for response headers
        headers: 'HeaderList',

        // Placeholder for response ID
        id: 'string',

        // Converts response data to JSON with optional reviver and strict mode
        json: (reviver, strict) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return JSON.parse(currentEnv.response.body, reviver);
        },

        // Converts response data to JSONP with optional reviver and strict mode
        jsonp: (reviver, strict) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return JSON.parse(currentEnv.response.body, reviver);
        },

        // Returns metadata for the response
        meta: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return {
                id: currentEnv.response.id,
                name: currentEnv.response.name,
                createdAt: currentEnv.response.createdAt,
                updatedAt: currentEnv.response.updatedAt
            };
        },

        // Placeholder for the response name
        name: 'string',

        // Placeholder for the original request that generated the response
        originalRequest: 'Request',

        // Returns the parent response
        parent: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.response.parent;
        },

        // Returns the reason phrase of the response
        reason: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.response.reason;
        },

        // Placeholder for the response time
        responseTime: 'number',

        // Returns the size of the response
        size: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.response.size;
        },

        // Placeholder for the response status
        status: 'string',

        // Converts the response body to text
        text: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.response.body;
        },

        // Placeholder for the `to` assertions
        to: {
            be: 'AssertableBe',
            have: 'AssertableHave'
        },

        // Converts the response object to a JSON string
        toJSON: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return JSON.stringify(currentEnv.response);
        }
    },


    sendRequest: {
        // Applies a function with a given this argument and optional arguments array
        apply: (thisArg, argArray) => {
            // Assuming there's an internal function to be applied
            const result = thisArg.apply(null, argArray);
            return result;
            // make a call to log the apply action by axios
            // axios.post(`/log/sendRequest/apply`, { thisArg, argArray, result });
        },

        // Binds a function to a given this argument and optional arguments
        bind: (thisArg, ...argArray) => {
            const boundFunction = thisArg.bind(null, ...argArray);
            return boundFunction;
            // make a call to log the bind action by axios
            // axios.post(`/log/sendRequest/bind`, { thisArg, argArray });
        },

        // Calls a function with a given this argument and optional arguments
        call: (thisArg, ...argArray) => {
            const result = thisArg.call(null, ...argArray);
            return result;
            // make a call to log the call action by axios
            // axios.post(`/log/sendRequest/call`, { thisArg, argArray, result });
        },

        // Placeholder for sendRequest function arguments
        arguments: 'any',

        // Placeholder for sendRequest function caller
        caller: 'Function',

        // Placeholder for sendRequest function length
        length: 'number',

        // Placeholder for sendRequest function name
        name: 'string',

        // Placeholder for sendRequest function prototype
        prototype: 'any',

        // Converts the sendRequest object to a string
        toString: () => {
            return '[object SendRequest]';
        }
    },



    test: {
        // Applies a function with a given this argument and optional arguments array
        apply: (thisArg, argArray) => {
            // Assuming there's an internal function to be applied
            const result = thisArg.apply(null, argArray);
            return result;
            // make a call to log the apply action by axios
            // axios.post(`/log/test/apply`, { thisArg, argArray, result });
        },

        // Binds a function to a given this argument and optional arguments
        bind: (thisArg, ...argArray) => {
            const boundFunction = thisArg.bind(null, ...argArray);
            return boundFunction;
            // make a call to log the bind action by axios
            // axios.post(`/log/test/bind`, { thisArg, argArray });
        },

        // Calls a function with a given this argument and optional arguments
        call: (thisArg, ...argArray) => {
            const result = thisArg.call(null, ...argArray);
            return result;
            // make a call to log the call action by axios
            // axios.post(`/log/test/call`, { thisArg, argArray, result });
        },

        // Placeholder for test function arguments
        arguments: 'any',

        // Placeholder for test function caller
        caller: 'Function',

        // Placeholder for test function length
        length: 'number',

        // Placeholder for test function name
        name: 'string',

        // Placeholder for test function prototype
        prototype: 'any',

        // Converts the test object to a string
        toString: () => {
            return '[object Test]';
        },

        // Returns the index of the test
        index: () => {
            // Placeholder implementation for the index function
            return 0;
            // make a call to log the index action by axios
            // axios.post(`/log/test/index`);
        },
        // Skips a test by name
        skip: (testName) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.skippedTests = currentEnv.skippedTests || [];
            currentEnv.skippedTests.push(testName);
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to log the skipped test by axios
            // axios.post(`/environment/${currentEnv.id}/skipTest`, { testName });
        }
    },



    variables: {
        // Indicates if the variables are disabled
        disabled: 'boolean',

        // Clears all variables
        clear: () => {
            const currentEnv = localStorage.getItem('envId');
            // make a call to clear the variables by axios
            axios.delete(`/clear/variables/${currentEnv}`);
        },

        // Describes the variables content with optional type filtering
        describe: (content, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const description = Object.keys(currentEnv.variables).map(key => {
                return {
                    key: key,
                    value: currentEnv.variables[key],
                    type: typeof currentEnv.variables[key]
                };
            });

            return description;
        },

        // Disables tracking of variables
        disableTracking: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.trackingEnabled = false;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.post(`/environment/${currentEnv.id}/disableTracking`);
        },

        // Enables tracking of variables with optional settings
        enableTracking: (options) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.trackingEnabled = true;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.post(`/environment/${currentEnv.id}/enableTracking`, options);
        },

        // Finds a property in parent environments using a customizer function
        findInParents: (property, customizer) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.parent;
            while (parent) {
                if (customizer(parent[property])) {
                    return parent[property];
                }
                parent = parent.parent;
            }
            return null;
        },

        // Finds and returns substitutions for variables
        findSubstitutions: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.variables;
        },

        // Iterates over each parent environment with optional root inclusion
        forEachParent: (options, iterator) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let parent = currentEnv.parent;
            if (options.withRoot) {
                iterator(currentEnv);
            }
            while (parent) {
                iterator(parent);
                parent = parent.parent;
            }
        },

        // Gets the value of a variable by key
        get: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.variables[key];
        },

        // Checks if a variable exists by key
        has: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return key in currentEnv.variables;
        },

        // Placeholder for the variable ID
        id: 'string',

        // Returns metadata for the variables
        meta: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return {
                id: currentEnv.id,
                name: currentEnv.name,
                createdAt: currentEnv.createdAt,
                updatedAt: currentEnv.updatedAt
            };
        },

        // Returns the parent environment
        parent: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.parent;
        },

        // Replaces placeholders in a template with corresponding variable values
        replaceIn: (template) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.variables[key] || '');
        },

        // Placeholder for the variable name
        name: 'string',

        // Sets a variable with an optional type
        set: (key, value, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.variables[key] = value;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the variable data by axios
            // axios.post(`/environment/${currentEnv.id}/variables`, { key, value, type });
        },

        // Converts the variables to a JSON string
        toJSON: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return JSON.stringify(currentEnv.variables);
        },
        // Converts the variables to an object with various options
        toObject: (excludeDisabled, caseSensitive) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            let result = {};
            for (const [key, value] of Object.entries(currentEnv.variables)) {
                if (excludeDisabled && value.disabled) continue;
                if (caseSensitive) result[key] = value;
                else result[key.toLowerCase()] = value;
            }
            return result;
        },

        // Unsets (removes) a variable by key
        unset: (key) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            delete currentEnv.variables[key];
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to delete the variable by axios
            axios.delete(`/environment/${currentEnv.id}/variables/${key}`);
        }
    },



    visualizer: {
        // Clears the visualizer data
        clear: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.visualizerData = null;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to clear the visualizer data by axios
            // axios.post(`/environment/${currentEnv.id}/clearVisualizer`);
        },

        // Sets the visualizer template and data with optional settings
        set: (template, data, options) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.visualizerTemplate = template;
            currentEnv.visualizerData = data;
            currentEnv.visualizerOptions = options;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the visualizer data by axios
            // axios.post(`/environment/${currentEnv.id}/setVisualizer`, { template, data, options });
        }
    }
}