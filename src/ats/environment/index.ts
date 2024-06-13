
    import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { clear } from './clear.js';
import { disableTracking } from './disableTracking.js';
import { enableTracking } from './enableTracking.js';
import { findInParents } from './findInParents.js';
import { findSubstitutions } from './findSubstitutions.js';
import { forEachParent } from './forEachParent.js';
import { meta } from './meta.js';
import { replace } from './replace.js';
import { set } from './set.js';
import { toJson } from './toJson.js';
import { toObject } from './toObject.js';
import { unset } from './unset.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export class Environment {
    public clear = clear;
    public disableTracking = disableTracking;
    public enableTracking = enableTracking;
    public findInParents = findInParents;
    public findSubstitutions = findSubstitutions;
    public forEachParent = forEachParent;
    public meta = meta;
    public replace = replace;
    public set = set;
    public toJson = toJson;
    public toObject = toObject;
    public unset = unset;


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

const inst = new Environment(); // Initialize the class

// Export the instance as a module after ensuring methods are loaded
export default (async () => {
    //@ts-ignore
    await inst.generateMethods();
    return inst;
})();
