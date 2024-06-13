
    import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { cursor } from './cursor.js';
import { cycles } from './cycles.js';
import { position } from './position.js';
import { vars } from './vars.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export class IterationData {
    public cursor = cursor;
    public cycles = cycles;
    public position = position;
    public vars = vars;


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

const inst = new IterationData(); // Initialize the class

// Export the instance as a module after ensuring methods are loaded
export default (async () => {
    //@ts-ignore
    await inst.generateMethods();
    return inst;
})();
