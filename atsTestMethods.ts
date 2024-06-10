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

// Define the pm object with functional methods
const pm = {
    collectionVariables: {
        // Clears all collection variables
        clear: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
            currentEnv.collectionVariables = {};
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // Make a call to clear the env data by axios
            axiosInstance.post(`/environment/${currentEnv.id}/collectionVariables/clear`);
        },

        // Disables tracking of collection variables
        disableTracking: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
            currentEnv.trackingEnabled = false;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // Make a call to disable tracking by axios
            axiosInstance.post(`/environment/${currentEnv.id}/collectionVariables/disableTracking`);
        },

        // Enables tracking of collection variables with optional settings
        enableTracking: (options: object) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
            currentEnv.trackingEnabled = true;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // Make a call to enable tracking by axios
            axiosInstance.post(`/environment/${currentEnv.id}/collectionVariables/enableTracking`, { options });
        },

        // Finds a property in parent environments using a customizer function
        findInParents: (property: string, customizer: (value: any) => boolean) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
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
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
            return currentEnv.collectionVariables;
        },

        // Iterates over each parent environment with optional root inclusion
        forEachParent: (options: { withRoot?: boolean }, iterator: (parent: any) => void) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
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
        replaceIn: (template: string) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
            return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.collectionVariables[key] || '');
        },

        // Sets a collection variable with an optional type
        set: (key: string, value: any, type?: string) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
            currentEnv.collectionVariables[key] = value;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // Make a call to update the env data by axios
            axiosInstance.post(`/environment/${currentEnv.id}/variables`, { key, value, type });
        },

        // Unsets (removes) a collection variable by key
        unset: (key: string) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
            delete currentEnv.collectionVariables[key];
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // Make a call to update the env data by axios
            axiosInstance.delete(`/environment/${currentEnv.id}/variables/${key}`);
        }
    },

    cookies: {
        data: [],
        
        // Add a cookie to the cookies data array.
        add: (item: any) => {
            pm.cookies.data.push(item);
            // Make axios call to add the cookie to the cookies data array
            axiosInstance.post('/cookies', { item });
        },

        // Append a cookie to the cookies data array.
        append: (item: any) => {
            pm.cookies.data.push(item);
            // Make axios call to add the cookie to the cookies data array
            axiosInstance.post('/cookies', { item });
        },

        // Returns all cookies.
        all: () => {
            return axiosInstance.get('/cookies').then(response => response.data);
        },

        // Clears all cookies.
        clear: () => {
            // Make axios call to clear all cookies
            axiosInstance.delete('/cookies').then(() => {
                pm.cookies.data = [];
            });
        },

        // Returns the number of cookies.
        count: () => {
            return axiosInstance.get('/cookies/count').then(response => response.data.count);
        },

        // Returns all cookies (same as all for simplicity).
        jar: () => {
            return pm.cookies.all();
        },

        // Converts cookies data to a JSON string.
        toString: () => {
            return axiosInstance.get('/cookies').then(response => JSON.stringify(response.data));
        },

        // Removes cookies that match the given predicate.
        remove: (predicate: (item: any) => boolean) => {
            pm.cookies.data = pm.cookies.data.filter(item => !predicate(item));
            // Make axios call to remove the cookies that match the given predicate
            axiosInstance.post('/cookies/remove', { predicate });
        },

        // Reduces the cookies data using the given function.
        reduce: (iterator: (acc: any, item: any, index: number) => any, accumulator: any) => {
            let data = pm.cookies.data.reduce((acc, item, index) => iterator(acc, item, index), accumulator);
            // Make API call to add the data to the cookies
            axiosInstance.post('/cookies/reduce', { data });
        },

        // Iterates over parent cookies (assuming a parent property).
        eachParent: (iterator: (item: any, index: number) => void) => {
            const parents = pm.cookies.data.filter(item => item.parent);
            parents.forEach((item, index) => iterator(item, index));
        },

        // Gets the index of a cookie.
        indexOf: (item: any) => {
            return pm.cookies.data.indexOf(item);
        },

        // Adds a cookie to the beginning of the cookies data array.
        prepend: (item: any) => {
            pm.cookies.data.unshift(item);
            // Make axios call to add the cookie to the cookies data array
            axiosInstance.post('/cookies/prepend', { item });
        },

        // Updates an existing cookie or inserts a new one.
        upsert: (item: any) => {
            const index = pm.cookies.data.findIndex(cookie => cookie.key === item.key);
            if (index !== -1) {
                pm.cookies.data[index] = item;
            } else {
                pm.cookies.data.push(item);
            }
            // Make axios call to update the cookie
            axiosInstance.post('/cookies/upsert', { item });
        },

        // Replaces the current cookies data with the given items.
        populate: (items: any[]) => {
            pm.cookies.data = items;
            // Make axios call to populate the cookies data
            axiosInstance.post('/cookies/populate', { items });
        },

        // Same as populate.
        repopulate: (items: any[]) => {
            pm.cookies.data = items;
            // Make axios call to repopulate the cookies data
            axiosInstance.post('/cookies/repopulate', { items });
        },

        // Finds a cookie by ID.
        one: (id: string) => {
            return axiosInstance.get(`/cookies/${id}`).then(response => response.data);
        },

        // Inserts a cookie before another cookie.
        insert: (item: any, before: any) => {
            const index = pm.cookies.data.indexOf(before);
            if (index !== -1) {
                pm.cookies.data.splice(index, 0, item);
            } else {
                pm.cookies.data.push(item);
            }
            // Make axios call to insert the cookie before another cookie
            axiosInstance.post('/cookies/insert', { item, before });
        },

        // Inserts a cookie after another cookie.
        insertAfter: (item: any, after: any) => {
            const index = pm.cookies.data.indexOf(after);
            if (index !== -1) {
                pm.cookies.data.splice(index + 1, 0, item);
            } else {
                pm.cookies.data.push(item);
            }
            // Make axios call to insert the cookie after another cookie
            axiosInstance.post('/cookies/insertAfter', { item, after });
        },

        // Assimilates a source of cookies data.
        assimilate: (source: any[], prune: boolean) => {
            if (Array.isArray(source)) {
                pm.cookies.data = prune ? source : pm.cookies.data.concat(source);
            } else if (source === 'PropertyList') {
                // Assuming PropertyList is a predefined list of cookies
                const PropertyList = []; // Placeholder for the PropertyList
                pm.cookies.data = prune ? PropertyList : pm.cookies.data.concat(PropertyList);
            }
            // Make axios call to assimilate the cookies data
            axiosInstance.post('/cookies/assimilate', { source, prune });
        },

        // Converts cookies data to an object with various options.
        toObject: (excludeDisabled: boolean, caseSensitive: boolean, multiValue: boolean, sanitizeKeys: boolean) => {
            let result: any = {};
            pm.cookies.data.forEach(cookie => {
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
            // Make axios call to clear the environment variables using this info: {currentEnv}
            axiosInstance.post('/environment/clear');
        },

        // Disables tracking of collection variables
        disableTracking: () => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
            currentEnv.trackingEnabled = false;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // Make a call to disable tracking by axios
            axiosInstance.post(`/environment/${currentEnv.id}/collectionVariables/disableTracking`);
        },

        // Enables tracking of collection variables with optional settings
        enableTracking: (options: object) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
            currentEnv.trackingEnabled = true;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // Make a call to enable tracking by axios
            axiosInstance.post(`/environment/${currentEnv.id}/collectionVariables/enableTracking`, { options });
        },

        findInParents: (property: string, customizer?: (...params: any[]) => any) => {
            const currentEnv = JSON.parse(localStorage.getItem('envId') || '{}');
            const findProperty = (obj: any, prop: string) => {
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
        }
    }
};

// Example usage:
pm.collectionVariables.clear();
pm.cookies.add({ key: 'cookie1', value: 'value1' });
pm.environment.clear();
