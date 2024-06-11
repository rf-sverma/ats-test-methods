import fs from 'fs';
import path from 'path';

class Ats {
    ats: { [key: string]: any };

    constructor() {
        this.ats = {};
        this.generateMethods();
    }

    private generateMethods() {
        const baseDir = path.join(__dirname, 'ats');
        const categories = fs.readdirSync(baseDir);
        
        categories.forEach(category => {
            const categoryDirPath = path.join(baseDir, category);
            if (fs.statSync(categoryDirPath).isDirectory()) {
                this.ats[category] = {};
                const files = fs.readdirSync(categoryDirPath);
                files.forEach(file => {
                    if (file.endsWith('.ts')) {
                        const methodName = path.basename(file, '.ts');
                        const module = require(path.join(categoryDirPath, file));
                        this.ats[category][methodName] = module.default || module[methodName];
                    } else if (file === 'index.ts') {
                        const module = require(path.join(categoryDirPath, file));
                        Object.assign(this.ats[category], module.default || module);
                    }
                });
            }
        });
    }
}

const ats = new Ats(); // exporting the initiated class . Change this to use the raw class instead

export default ats;


