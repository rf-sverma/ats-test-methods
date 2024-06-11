const fs = require('fs');
const path = require('path');

// Define the structure of the files and directories
const structure = {
    "ats": {
        "environment": [
            "clear", 
            "disableTracking", 
            "enableTracking", 
            "findInParents"
        ],
        "collectionVariables": [
            "clear", 
            "disableTracking", 
            "enableTracking", 
            "findInParents", 
            "findSubstitutions", 
            "forEachParent", 
            "replaceIn", 
            "set", 
            "unset"
        ],
        "cookies": [
            "add", 
            "all", 
            "append", 
            "clear", 
            "count", 
            "eachParent", 
            "indexOf", 
            "insert", 
            "insertAfter", 
            "jar", 
            "one", 
            "populate", 
            "prepend", 
            "reduce", 
            "remove", 
            "repopulate", 
            "toObject", 
            "toString", 
            "upsert", 
            "assimilate"
        ],
        "execution": ["location"],
        "expect": [
            // Methods
            'to.be',
            'to.not',
            'to.equal',
            'to.not.equal',
            'to.eql',
            'to.not.eql',
            'to.have',
            'to.not.have',
            'to.be.oneOf',
            'to.not.be.oneOf',
            'to.match',
            'to.not.match',
            'to.be.above',
            'to.not.be.above',
            'to.be.below',
            'to.not.be.below',
            'to.have.jsonBody',
            'to.not.have.jsonBody',
            'to.have.header',
            'to.not.have.header',
            'to.have.jsonBody',
            'to.not.have.jsonBody',
            'to.exist',
            'to.not.exist',
            'to.be.true',
            'to.be.false',
            'to.be.null',
            'to.be.undefined',
            'to.be.a',
            'to.not.be.a',
            'to.have.property',
            'to.not.have.property',
            'to.have.length',
            'to.be.within',
            'to.not.be.within',
            // Properties
            'response', // Access the response object
            'environment', // Access the environment object
            'globals', // Access the globals object
            'collectionVariables', // Access the collectionVariables object
            'pm', // Access the pm object
            'responseTime', // The response time of the request in milliseconds
            'responseCode', // The status code of the response
            'responseHeaders', // The headers of the response
            'responseBody', // The body of the response
            'environmentVariables', // The environment variables
            'globalsVariables', // The global variables
            'collectionVariablesVariables' // The collection variables
        ],
        "globals": [
            // Methods
            'get',
            'set',
            'unset',
            // Properties
            'variables' // The global variables
        ],
        "info": [
            // Methods
            'environment',
            'iteration',
            'request',
            'response',
            'variables',
            // Properties
            'environment', // The environment details
            'request', // The request details
            'response', // The response details
            'collection' // The collection details
        ],
        "iterationData": [
            // Properties
            'vars', // The iteration data variables
            'cursor', // The cursor of the current iteration
            'cycles', // The number of cycles in the iteration
            'position' // The position in the iteration
        ],
        "request": [
            // Methods
            'auth',
            'body',
            'clearTimeout',
            'getHeader',
            'getUrl',
            'header',
            'json',
            'noAuth',
            'removeHeader',
            'send',
            'timeout',
            // Properties
            'method', // The request method
            'url', // The request URL
            'headers', // The request headers
            'data', // The request data
            'body', // The request body
            'preRequestScript', // The pre-request script
            'tests', // The test script
            'responses', // The responses
            'responseSize', // The size of the response
            'responseTime', // The time taken for the response
            'responseCode', // The response code
            'responseBody', // The response body
            'responseHeaders' // The response headers
        ],
        "require": [
            // Methods
            'send'
        ],
        "response": [
            // Methods
            'toJSON',
            'toObject',
            'code',
            'status',
            'headers',
            'hasHeader',
            'header',
            'body',
            'text',
            'json',
            // Properties
            'responseTime', // The response time of the request in milliseconds
            'responseSize', // The size of the response in bytes
            'responseSizeBody', // The size of the response body in bytes
            'stream',
            'members' // Retrieves an array of headers
        ],
        "sendRequest": [
            // Methods
            'get',
            'post',
            'put',
            'delete',
            'patch',
            'head',
            'options',
            'send'
        ],
        "test": [
            // Methods
            'describe',
            'it'
        ],
        "variables": [
            // Methods
            'get',
            'set',
            'clear',
            'replaceIn',
            'has',
            'unset'
        ],
        "visualizer": [
            // Methods
            'set',
            'get',
            'clear'
        ]
    }
};


// Content for axiosInstance.ts
const axiosInstanceContent = `
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.example.com', // Set your base URL here
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = \`Bearer \${token}\`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            console.error('Error response', error.response);
        } else if (error.request) {
            console.error('Error request', error.request);
        } else {
            console.error('Error message', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
`;

// Content template for environment methods
const environmentMethodTemplate = (methodName) => `
import axiosInstance from '../axiosInstance';

export const ${methodName} = () => {
    // Add your implementation here
};
`;

// Content template for collectionVariables methods
const collectionVariablesMethodTemplate = (methodName) => `
import axiosInstance from '../axiosInstance';

export const ${methodName} = () => {
    // Add your implementation here
};
`;

// Content template for cookies methods
const cookiesMethodTemplate = (methodName) => `
import axiosInstance from '../axiosInstance';

export const ${methodName} = () => {
    // Add your implementation here
};
`;

// Function to create directories and files
const createFiles = (baseDir, structure) => {
    Object.keys(structure).forEach(dir => {
        const dirPath = path.join(baseDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        structure[dir].forEach(file => {
            const filePath = path.join(dirPath, file + '.ts');
            let content = '';

            if (dir === 'environment') {
                content = environmentMethodTemplate(file);
            } else if (dir === 'collectionVariables') {
                content = collectionVariablesMethodTemplate(file);
            } else if (dir === 'cookies') {
                content = cookiesMethodTemplate(file);
            }

            fs.writeFileSync(filePath, content, 'utf8');
        });
    });
};

// Create axiosInstance.ts
fs.writeFileSync(path.join(__dirname, 'ats', 'axiosInstance.ts'), axiosInstanceContent, 'utf8');

// Create directories and files
createFiles(path.join(__dirname, 'ats'), { "environment": structure.ats.environment });
createFiles(path.join(__dirname, 'ats'), { "collectionVariables": structure.ats.collectionVariables });
createFiles(path.join(__dirname, 'ats'), { "cookies": structure.ats.cookies });

console.log('Files and directories created successfully');
