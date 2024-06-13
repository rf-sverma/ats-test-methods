
    import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { clear } from './clear.js';
import { get } from './get.js';
import { set } from './set.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export class Visualizer {
    public clear = clear;
    public get = get;
    public set = set;


    [key: string]: any; // Index signature
    
    constructor() {
        this.generateMethods().then(() => {
            console.log("Methods generated");
        });
    }

    private async generateMethods() {
        const baseDir = path.join(__dirname);
        const allMethods = fs.readdirSync(baseDir);

        for (const file of allMethods) {
            if (file !== 'index.ts' && file.endsWith('.ts')) {
                const methodName = path.basename(file, '.ts');
                const modulePath = path.join(baseDir, file);
                const module = await import(modulePath);
                this[methodName] = module.default || module[methodName];
            }
        }
    }
}

const inst = new Visualizer(); // Initialize the class

// Export the instance as a module after ensuring methods are loaded
export default (async () => {
    //@ts-ignore
    await inst.generateMethods();
    return inst;
})();
