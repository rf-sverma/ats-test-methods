
    import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { collection } from './collection.js';
import { environment } from './environment.js';
import { iteration } from './iteration.js';
import { request } from './request.js';
import { response } from './response.js';
import { variables } from './variables.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export class Info {
    public collection = collection;
    public environment = environment;
    public iteration = iteration;
    public request = request;
    public response = response;
    public variables = variables;


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

const inst = new Info(); // Initialize the class

// Export the instance as a module after ensuring methods are loaded
export default (async () => {
    //@ts-ignore
    await inst.generateMethods();
    return inst;
})();
