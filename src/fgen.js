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
            "get",
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
            'to.not.be.within'
        ],
        "globals": [
            'get',
            'set',
            'unset',
            'variables'
        ],
        "info": [
            'environment',
            'iteration',
            'request',
            'response',
            'variables',
            'environment', 
            'request', 
            'response', 
            'collection'
        ],
        "iterationData": [
            'vars', 
            'cursor', 
            'cycles', 
            'position'
        ],
        "request": [
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
            'method', 
            'url', 
            'headers', 
            'data', 
            'body', 
            'preRequestScript', 
            'tests', 
            'responses', 
            'responseSize', 
            'responseTime', 
            'responseCode', 
            'responseBody', 
            'responseHeaders'
        ],
        "require": [
            'send'
        ],
        "response": [
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
            'responseTime', 
            'responseSize', 
            'responseSizeBody', 
            'stream',
            'members'
        ],
        "sendRequest": [
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
            'describe',
            'it'
        ],
        "variables": [
            'get',
            'set',
            'clear',
            'replaceIn',
            'has',
            'unset'
        ],
        "visualizer": [
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

// Content templates for various methods
const methodTemplate = (methodName) => `
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
            let content = methodTemplate(file);
            fs.writeFileSync(filePath, content, 'utf8');
        });
    });
};

// Create axiosInstance.ts
fs.writeFileSync(path.join(__dirname, 'ats', 'axiosInstance.ts'), axiosInstanceContent, 'utf8');

// Create directories and files
createFiles(path.join(__dirname, 'ats'), structure.ats);

console.log('Files and directories created successfully');
