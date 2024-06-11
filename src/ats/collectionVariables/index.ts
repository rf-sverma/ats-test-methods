import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dynamically load methods
const baseDir = __dirname;
const methods: { [key: string]: any } = {};

const files = fs.readdirSync(baseDir).filter((file: string) => file !== 'index.ts');

files.forEach((file: any) => {
    const methodName = path.basename(file, '.ts');
    const module = require(path.join(baseDir, file));
    methods[methodName] = module.default;
});

class CollectionVariables {
    constructor() {
        for (const key in methods) {
            if (Object.prototype.hasOwnProperty.call(methods, key)) {
                //@ts-ignore
                this[key] = methods[key];
            }
        }
    }
}

const collectionVariables = new CollectionVariables()

export default collectionVariables
