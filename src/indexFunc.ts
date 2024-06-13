/**
 * @module
 * This module will help in exporting the ats library in form of a functional module
 */

import fs from 'fs';
import path from 'path';

// Define the base directory
const baseDir = path.join(__dirname, 'ats');

// Define the ats object
const ats: { [key: string]: any } = {};

// Function to generate methods dynamically
const generateMethods = (dirPath: string, category: string) => {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const methodName = path.basename(file, '.ts');
        const module = require(path.join(dirPath, file));
        ats[category][methodName] = module[methodName];
    });
};

// Dynamically generate methods for each category
const categories = fs.readdirSync(baseDir);
categories.forEach(category => {
    const categoryDirPath = path.join(baseDir, category);
    if (fs.statSync(categoryDirPath).isDirectory()) {
        ats[category] = {};
        generateMethods(categoryDirPath, category);
    }
});

export default ats;


