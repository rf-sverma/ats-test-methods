const fs = require('fs');
const path = require('path');

// Define the structure of the files and directories
const structure = {
    "ats": {
        "environment": ["clear.ts", "disableTracking.ts", "enableTracking.ts", "findInParents.ts"],
        "collectionVariables": ["clear.ts", "disableTracking.ts", "enableTracking.ts", "findInParents.ts", "findSubstitutions.ts", "forEachParent.ts", "replaceIn.ts", "set.ts", "unset.ts"],
        "cookies": ["add.ts", "all.ts", "append.ts", "clear.ts", "count.ts", "eachParent.ts", "indexOf.ts", "insert.ts", "insertAfter.ts", "jar.ts", "one.ts", "populate.ts", "prepend.ts", "reduce.ts", "remove.ts", "repopulate.ts", "toObject.ts", "toString.ts", "upsert.ts", "assimilate.ts"]
    }
};

// Content for axiosInstance.ts
const axiosInstanceContent = `
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.example.com', // Set your base URL here
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
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
            const filePath = path.join(dirPath, file);
            let content = '';

            if (dir === 'environment') {
                const methodName = path.basename(file, '.ts');
                content = environmentMethodTemplate(methodName);
            } else if (dir === 'collectionVariables') {
                const methodName = path.basename(file, '.ts');
                content = collectionVariablesMethodTemplate(methodName);
            } else if (dir === 'cookies') {
                const methodName = path.basename(file, '.ts');
                content = cookiesMethodTemplate(methodName);
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
