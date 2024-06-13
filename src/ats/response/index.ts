import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { hasHeader } from "./hasHeader.js";
import { stream } from "./stream.js";
import { text } from "./text.js";
import { toJSON } from "./toJSON.js";
import { toObject } from "./toObject.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export class Response {
  public hasHeader = hasHeader;
  public stream = stream;
  public text = text;
  public toJSON = toJSON;
  public toObject = toObject;

  [key: string]: any; // Index signature

  constructor() {
    this.body = null;
    this.code = null;
    this.cookies = null;
    this.disabled = false;
    this.headers;
    this.header;
    this.id;
    this.json;
    this.responseTime;
    this.responseSize;
    this.responseTime;
    this.status;
    this.members;

    this.generateMethods().then(() => {
      console.log("Methods generated");
    });
  }

  private async generateMethods() {
    const baseDir = path.join(__dirname);
    const allMethods = fs.readdirSync(baseDir);

    for (const file of allMethods) {
      if (file !== "index.ts" && file.endsWith(".ts")) {
        const methodName = path.basename(file, ".ts");
        const modulePath = path.join(baseDir, file);
        const module = await import(modulePath);
        this[methodName] = module.default || module[methodName];
      }
    }
  }
}

const inst = new Response(); // Initialize the class

// Export the instance as a module after ensuring methods are loaded
export default (async () => {
  //@ts-ignore
  await inst.generateMethods();
  return inst;
})();
