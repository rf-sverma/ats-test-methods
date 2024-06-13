import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.example.com', // Set your base URL here
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add authorization token
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // You can add custom headers here
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        // @ts-ignore
        return Promise.reject(error);
    }
);

// Response interceptor to handle responses
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // You can transform the response here if needed
        return response;
    },
    (error: AxiosError) => {
        // Handle errors here
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Error response', error.response);
        } else if (error.request) {
            // Request was made but no response was received
            console.error('Error request', error.request);
        } else {
            // Something else happened while setting up the request
            console.error('Error message', error.message);
        }
        // @ts-ignore
        return Promise.reject(error);
    }
);

// make an axios wrapper
// total clear API calls: 7
const pm = {
    collectionVariables: {
        // This variable indicates if the collection variables are disabled
        disabled: 'boolean',

        // Clears all collection variables
        clear: () => {
           
        },

        // Disables tracking of collection variables
        disableTracking: () => {
           
        },

        // Enables tracking of collection variables with optional settings
        enableTracking: (options) => {
          
        },
        // Finds a property in parent environments using a customizer function
        findInParents: (property, customizer) => {
           
        },

        // Finds and returns substitutions for collection variables
        findSubstitutions: () => {
         
        },

        // Iterates over each parent environment with optional root inclusion
        forEachParent: (options, iterator) => {
           
        },

        // Replaces placeholders in a template with corresponding collection variable values
        replaceIn: (template) => {
           
        },

        // Sets a collection variable with an optional type
        set: (key, value, type) => {
           
        },

        // Unsets (removes) a collection variable by key
        unset: (key) => {
          
        }
    },

    cookies: {
        data: [],
        // add : Add a cookie to the cookies data array.

        add: (item) => {
           
        },

        // append: Add a cookie to the cookies data array.
        append: (item) => {
           
        },


       
        all: () => {
           
        },

        // clear: Clears all cookies.
        clear: () => {
           
        },

        // count: Returns the number of cookies.
        count: () => {
           
        },

        // jar: Returns all cookies (same as all for simplicity).
        jar: () => {
           
        },

        // toString: Converts cookies data to a JSON string.
        toString: () => {
           
        },

        // remove: Removes cookies that match the given predicate.
        remove: () => {
           
        },

        // reduce: Reduces the cookies data using the given function.
        reduce: () => {
          
        },

        // eachParent: Iterates over parent cookies (assuming a parent property).
        eachParent: () => {
           
        },

     
        indexOf: () => {
           
        },

        

       
        upsert: () => {
           
            // make axios call to update the cookie
        },

       
        populate: () => {
         
        },

        
        repopulate: () => {
           
        },

       
        one: () => {
            
        },

       
        insert: () => {
           
        },

        
        insertAfter: () => {
          
        },


        assimilate: () => {
            
        },

       
        toObject: () => {
            
        }
    },

    environment: {

        clear: () => {
          

        },


        
        disableTracking: () => {
           
        },

        
        enableTracking: () => {
           
        },

        findInParents: () => {
            
        },

 findSubstitutions: () => {
           
        },

        forEachParent: () => {
            
        },


        meta: () => {
            
        },


        replaceIn: (template) => {
           
        },

        set: () => {
            
        },

        toJSON: () => {
         
        },

        toObject: () => {
            
        },

        unset: () => {
          
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
            currentEnv.request.auth = {type, options};
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
                    headers = headers.map(header => ({...header, key: header.key.toLowerCase()}));
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
                    headers = headers.map(header => ({...header, key: header.key.replace(/[^a-zA-Z0-9]/g, '')}));
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
            } else {
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

    test: {

    },

    variables: {


        
        clear: () => {
           
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

        
        has: (key) => {
            
        },

        // Returns the parent environment
        parent: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.parent;
        },

        
        replaceIn: () => {
           
        },

        // Placeholder for the variable name
        name: 'string',

        
        set: () => {
           
        },

        // Unsets (removes) a variable by key
        unset: () => {
           
        }
    },

    visualizer: {
       
        clear: () => {
          
        },

       
        set: () => {
          
        }
    }
}