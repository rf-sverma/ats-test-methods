/**
 * @module
 * This module will help in exporting the ats library in form of a functional module
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Create __dirname in an ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class Ats {
    ats;
    constructor() {
        this.ats = {};
        this.generateMethods().then(() => {
            console.log("Methods generated");
        });
    }
    async generateMethods() {
        const baseDir = path.join(__dirname, 'ats');
        const categories = fs.readdirSync(baseDir);
        for (const category of categories) {
            const categoryDirPath = path.join(baseDir, category);
            if (fs.statSync(categoryDirPath).isDirectory()) {
                this.ats[category] = {};
                const files = fs.readdirSync(categoryDirPath);
                for (const file of files) {
                    const methodName = path.basename(file, '.js');
                    const modulePath = path.join(categoryDirPath, file);
                    const moduleName = (file === 'index.js') ? category : methodName;
                    const module = await import(modulePath);
                    this.ats[category][moduleName] = module.default || module[methodName];
                }
            }
        }
    }
}
const atsInstance = new Ats(); // Initialize the Ats class
// Export the atsInstance after ensuring methods are loaded
export default (async () => {
    //@ts-ignore
    await atsInstance.generateMethods();
    return atsInstance.ats;
})();
