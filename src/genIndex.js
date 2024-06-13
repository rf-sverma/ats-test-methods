import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const generateIndexClass = ()=>{
    // Create __dirname in an ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to dynamically create instance for each category
const createCategoryIndex = (categoryDir) => {
    const className = path.basename(categoryDir).charAt(0).toUpperCase() + path.basename(categoryDir).slice(1);
    const allMethods = fs.readdirSync(categoryDir).filter(file => file.endsWith('.ts') && file !== 'index.ts');

    let imports = '';
    let methods = '';

    allMethods.forEach(file => {
        const methodName = path.basename(file, '.ts');
        imports += `import { ${methodName} } from './${methodName}.js';\n`;
        methods += `    public ${methodName} = ${methodName};\n`;
    });

    const classContent = `
    import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

${imports}
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export class ${className} {
${methods}

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

const inst = new ${className}(); // Initialize the class

// Export the instance as a module after ensuring methods are loaded
export default (async () => {
    //@ts-ignore
    await inst.generateMethods();
    return inst;
})();
`;

    fs.writeFileSync(path.join(categoryDir, 'index.ts'), classContent, 'utf8');
};

// Function to create index.ts files for all categories in the ats directory
const createAllCategoryIndices = (baseDir) => {
    const categories = fs.readdirSync(baseDir);

    categories.forEach(category => {
        const categoryDirPath = path.join(baseDir, category);
        if (fs.statSync(categoryDirPath).isDirectory()) {
            createCategoryIndex(categoryDirPath);
        }
    });
};

// Base directory of the ats categories
const baseDir = path.join(__dirname, 'ats');

// Generate index.ts files for all categories
createAllCategoryIndices(baseDir);

console.log('Index.ts files created successfully for all categories');

}

generateIndexClass()