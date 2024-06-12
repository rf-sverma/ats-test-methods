import axios from 'axios';
// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://api.example.com', // Set your base URL here
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor to add authorization token
axiosInstance.interceptors.request.use((config) => {
    // You can add custom headers here
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    // @ts-ignore
    return Promise.reject(error);
});
// Response interceptor to handle responses
axiosInstance.interceptors.response.use((response) => {
    // You can transform the response here if needed
    return response;
}, (error) => {
    // Handle errors here
    if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response', error.response);
    }
    else if (error.request) {
        // Request was made but no response was received
        console.error('Error request', error.request);
    }
    else {
        // Something else happened while setting up the request
        console.error('Error message', error.message);
    }
    // @ts-ignore
    return Promise.reject(error);
});
// make an axios wrapper
// total clear API calls: 7
const pm = {
    collectionVariables: {
        // This variable indicates if the collection variables are disabled
        disabled: 'boolean',
        // Clears all collection variables
        clear: () => {
            const currentEnv = JSON.parse(localStorage.getItem(''));
            currentEnv.collectionVariables = {};
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to clear the env data by axios
            // axios.post(`/environment/${currentEnv.id}/collectionVariables/clear/envId`);
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
        // Replaces placeholders in a template with corresponding collection variable values
        replaceIn: (template) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.collectionVariables[key] || '');
        },
        // Sets a collection variable with an optional type
        set: (key, value, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.collectionVariables[key] = value;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.post(`/environment/${currentEnv.id}/variables`, { key, value, type });
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
        // eachParent: Iterates over parent cookies (assuming a parent property).
        eachParent: (iterator, context) => {
            // Assuming eachParent is supposed to iterate over parent cookies
            const parents = environment.cookies.data.filter(item => item.parent);
            parents.forEach((item, index) => iterator.call(context, item, index));
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
            }
            else {
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
            }
            else {
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
            }
            else {
                cookies.data.push(item);
            }
            // make axios call to insert the cookie after another cookie
        },
        // assimilate: Assimilates a source of cookies data.
        assimilate: (source, prune) => {
            let cookies = axios.get('/cookies');
            if (Array.isArray(source)) {
                cookies.data = prune ? source : cookies.data.concat(source);
            }
            else if (source === 'PropertyList') {
                // Assuming PropertyList is a predefined list of cookies
                cookies.data = prune ? PropertyList : cookies.data.concat(PropertyList);
            }
        },
        // toObject: Converts cookies data to an object with various options.
        toObject: (excludeDisabled, caseSensitive, multiValue, sanitizeKeys) => {
            let result = {};
            let cookies = axios.get('/cookies');
            cookies.data.forEach(cookie => {
                if (excludeDisabled && cookie.disabled)
                    return;
                let key = sanitizeKeys ? cookie.key.replace(/[^a-zA-Z0-9]/g, '') : cookie.key;
                if (!caseSensitive)
                    key = key.toLowerCase();
                if (multiValue) {
                    if (!result[key])
                        result[key] = [];
                    result[key].push(cookie.value);
                }
                else {
                    result[key] = cookie.value;
                }
            });
            return result;
        }
    },
    environment: {
        clear: () => {
            // make axios call to clear the environment variables using this info :{currentEnv}
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
        findInParents: (property, customizer) => {
            const currentEnv = localStorage.getItem('envId');
            const findProperty = (obj, prop) => {
                if (obj.hasOwnProperty(prop))
                    return obj[prop];
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
            if (customizer && typeof customizer === 'function')
                value = customizer(value);
            return value;
        },
        //         this will find out if there is a variable in the parent environment that matches the given property and return it
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
        forEachParent: (options, iterator) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const parents = currentEnv.parents || [];
            if (options.withRoot) {
                iterator(currentEnv);
            }
            parents.forEach(parent => {
                iterator(parent);
            });
        },
        meta: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return {
                id: currentEnv.id,
                name: currentEnv.name,
                createdAt: currentEnv.createdAt,
                updatedAt: currentEnv.updatedAt
            };
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
                if (excludeDisabled && value.disabled)
                    continue;
                if (caseSensitive)
                    result[key] = value.value;
                else
                    result[key.toLowerCase()] = value.value;
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
        // Sets a global variable with an optional type
        set: (key, value, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.globals[key] = value;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the env data by axios
            // axios.post(`/environment/${currentEnv.id}/globals`, { key, value, type });
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
        // Sets an iteration data item with an optional type
        set: (key, value, type) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.iterationData[key] = value;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the iteration data by axios
            // axios.post(`/environment/${currentEnv.id}/iterationData`, { key, value, type });
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
            }
            else {
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
            }
            else {
                currentEnv.request.headers.push(header);
            }
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make a call to update the request header data by axios
            // axios.post(`/environment/${currentEnv.id}/headers`, header);
        }
    },
    require: {},
    response: {
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
        // Returns the size of the response
        size: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.response.size;
        },
        // Converts the response body to text
        text: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.response.body;
        }
    },
    sendRequest: {},
    test: {},
    variables: {
        // Clears all variables
        clear: () => {
            const currentEnv = localStorage.getItem('envId');
            // make a call to clear the variables by axios
            axios.delete(`/clear/variables/${currentEnv}`);
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
};
