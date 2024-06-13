
    import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { auth } from './auth.js';
import { body } from './body.js';
import { clearTimeout } from './clearTimeout.js';
import { data } from './data.js';
import { getHeader } from './getHeader.js';
import { getUrl } from './getUrl.js';
import { header } from './header.js';
import { headers } from './headers.js';
import { json } from './json.js';
import { method } from './method.js';
import { noAuth } from './noAuth.js';
import { preRequestScript } from './preRequestScript.js';
import { removeHeader } from './removeHeader.js';
import { responseBody } from './responseBody.js';
import { responseCode } from './responseCode.js';
import { responseHeaders } from './responseHeaders.js';
import { responseSize } from './responseSize.js';
import { responseTime } from './responseTime.js';
import { responses } from './responses.js';
import { send } from './send.js';
import { tests } from './tests.js';
import { timeout } from './timeout.js';
import { url } from './url.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export class Request {
    public auth = auth;
    public body = body;
    public clearTimeout = clearTimeout;
    public data = data;
    public getHeader = getHeader;
    public getUrl = getUrl;
    public header = header;
    public headers = headers;
    public json = json;
    public method = method;
    public noAuth = noAuth;
    public preRequestScript = preRequestScript;
    public removeHeader = removeHeader;
    public responseBody = responseBody;
    public responseCode = responseCode;
    public responseHeaders = responseHeaders;
    public responseSize = responseSize;
    public responseTime = responseTime;
    public responses = responses;
    public send = send;
    public tests = tests;
    public timeout = timeout;
    public url = url;


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

const inst = new Request(); // Initialize the class

// Export the instance as a module after ensuring methods are loaded
export default (async () => {
    //@ts-ignore
    await inst.generateMethods();
    return inst;
})();
