import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateIndexClass } from './genIndex';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the structure of the files and directories
const structure = {
    "ats": {
        "environment": [
            "clear", 
            "disableTracking", 
            "enableTracking", 
            "findInParents"
        ],
        // "collectionVariables": [
        //     "clear", 
        //     "disableTracking", 
        //     "enableTracking", 
        //     "findInParents", 
        //     "findSubstitutions", 
        //     "forEachParent", 
        //     "replaceIn", 
        //     "set", 
        //     "get",
        //     "unset"
        // ],
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
        "assert":['expect'],
        // "sendRequest": [
        //     'get',
        //     'post',
        //     'put',
        //     'delete',
        //     'patch',
        //     'head',
        //     'options',
        //     'send'
        // ],
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
//@ts-nocheck
import axiosInstance from '../axiosInstance.js';

export const ${methodName} = () => {
    console.log('${methodName} init')
    // Add your implementation here
};
`;

// Function to create directories and files
const createFiles = (baseDir, structure) => {
    Object.keys(structure).forEach(dir => {
        const dirPath = join(baseDir, dir);
        if (!existsSync(dirPath)) {
            mkdirSync(dirPath, { recursive: true });
        }

        structure[dir].forEach(file => {
            const filePath = join(dirPath, file + '.ts');
            let content = methodTemplate(file);
            writeFileSync(filePath, content, 'utf8');
        });
    });
};

// Create axiosInstance.ts
writeFileSync(join(__dirname, 'ats', 'axiosInstance.ts'), axiosInstanceContent, 'utf8');

// Create directories and files
createFiles(join(__dirname, 'ats'), structure.ats);

// Create Corresponding index class
// use genIndex.js
generateIndexClass();

console.log('Files and directories created successfully');
