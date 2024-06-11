import fs from "fs";
import path from "path";
import ats from "./index.js";

const docsDir = path.join(__dirname, "docs");

// Create the docs directory if it doesn't exist
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// Define JSDoc template
const jsdocTemplate = (
  methodName: string,
  description: string,
  parameters: string
) => `
/**
 * @function ${methodName}
 * @description ${description}
 * 
 * ${parameters}
 */
`;

// Define TSDoc template
const tsdocTemplate = (
  methodName: string,
  description: string,
  parameters: string
) => `
/**
 * ${description}
 * 
 * @param ${parameters}
 */
`;

// Function to extract description from TSDoc or JSDoc comments
const extractDescription = (comments: string[]) => {
  if (comments && comments.length > 0) {
    return comments[0].replace(/\/\*\*|\*\//g, "").trim();
  }
  return "";
};

// Function to extract parameters from function signature
const extractParameters = (signature: string) => {
  const args = signature.match(/\((.*?)\)/);
  if (args && args.length > 1) {
    const params = args[1].split(",").map((arg) => arg.trim());
    return params.map((param) => `\n * @param {${param}} ${param}`).join("");
  }
  return "";
};

// Function to generate documentation for each category
const generateCategoryDocs = (
  category: string,
  methods: { [key: string]: Function },
  template: (
    methodName: string,
    description: string,
    parameters: string
  ) => string
) => {
  const categoryDocs = `# ${category} Methods\n\n`;
  let methodsDocs = "";
  for (const methodName in methods) {
    if (typeof methods[methodName] === "function") {
      const method = methods[methodName];
      const methodComments: any = method.toString().match(/\/\*\*(.|\n)*?\*\//);
      const description = extractDescription(methodComments);
      const parameters = extractParameters(method.toString());
      methodsDocs += template(methodName, description, parameters);
    }
  }
  const categoryContent = `${categoryDocs}${methodsDocs}`;
  const categoryFilePath = path.join(docsDir, `${category}.md`);
  fs.writeFileSync(categoryFilePath, categoryContent);
};

// Generate documentation for each category using JSDoc template
generateCategoryDocs("jsdoc", ats, jsdocTemplate);

// Generate documentation for each category using TSDoc template
generateCategoryDocs("tsdoc", ats, tsdocTemplate);

console.log("Documentation generated successfully!");
