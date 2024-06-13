
    import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { add } from './add.js';
import { all } from './all.js';
import { append } from './append.js';
import { assimilate } from './assimilate.js';
import { clear } from './clear.js';
import { count } from './count.js';
import { eachParent } from './eachParent.js';
import { indexOf } from './indexOf.js';
import { insert } from './insert.js';
import { insertAfter } from './insertAfter.js';
import { jar } from './jar.js';
import { one } from './one.js';
import { populate } from './populate.js';
import { prepend } from './prepend.js';
import { reduce } from './reduce.js';
import { remove } from './remove.js';
import { repopulate } from './repopulate.js';
import { toObject } from './toObject.js';
import { toString } from './toString.js';
import { upsert } from './upsert.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export class Cookies {
    public add = add;
    public all = all;
    public append = append;
    public assimilate = assimilate;
    public clear = clear;
    public count = count;
    public eachParent = eachParent;
    public indexOf = indexOf;
    public insert = insert;
    public insertAfter = insertAfter;
    public jar = jar;
    public one = one;
    public populate = populate;
    public prepend = prepend;
    public reduce = reduce;
    public remove = remove;
    public repopulate = repopulate;
    public toObject = toObject;
    public toString = toString;
    public upsert = upsert;


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

const inst = new Cookies(); // Initialize the class

// Export the instance as a module after ensuring methods are loaded
export default (async () => {
    //@ts-ignore
    await inst.generateMethods();
    return inst;
})();
