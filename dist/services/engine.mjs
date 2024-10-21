import * as http from 'http';
import * as https from 'https';
import * as zlib from 'zlib';
import { URL, URLSearchParams } from 'url';
import os from 'os';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';

/* Package */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function getReusedSocket(res) {
  return res == null ? void 0 : res.reusedSocket;
}
__name(getReusedSocket, "getReusedSocket");
function getServerIp(res) {
  const socket = (res == null ? void 0 : res.socket) || (res == null ? void 0 : res.connection);
  return socket ? socket.remoteAddress : void 0;
}
__name(getServerIp, "getServerIp");
function getDefaultUserAgent() {
  const platform = os.platform();
  const arch = os.arch();
  const nodeVersion = process.version;
  return `Nyro/0.0.1 (${platform}; ${arch} ${nodeVersion})`;
}
__name(getDefaultUserAgent, "getDefaultUserAgent");

// src/helpers/combineUrl.ts
function combineUrl(baseUrl, url) {
  return url ? baseUrl.replace(/\/+$/, "") + `${baseUrl ? "/" : ""}` + url.replace(/^\/+/, "") : baseUrl;
}
__name(combineUrl, "combineUrl");
var combineUrl_default = combineUrl;

// src/helpers/errorHandler.ts
var _ErrorHandler = class _ErrorHandler extends Error {
  constructor(errorHandlerOptions) {
    var _a;
    super(errorHandlerOptions.message);
    this.name = "NyroError";
    this.requestOptions = errorHandlerOptions.requestOptions;
    this.statusCode = errorHandlerOptions.statusCode;
    this.stack = (_a = errorHandlerOptions.error) == null ? void 0 : _a.stack;
  }
};
__name(_ErrorHandler, "ErrorHandler");
var ErrorHandler = _ErrorHandler;
async function Core(options, currentRedirects = 0) {
  const combinedURL = combineUrl_default(options.baseURL || "", options.url || options.path || "");
  const fullUrl = new URL(combinedURL);
  if (options.path) {
    fullUrl.pathname += options.path;
  }
  if (options.params) {
    const params = new URLSearchParams(options.params);
    fullUrl.search = params.toString();
  }
  if (["json", "text", "blob", "stream", "arrayBuffer", "document"].indexOf(options.responseType || "json") === -1) {
    return Promise.reject(new ErrorHandler({
      statusCode: 400,
      message: `Invalid response type: ${options.responseType}`,
      name: "Request",
      requestOptions: options
    }));
  }
  if (["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS", "CONNECT", "TRACE"].indexOf(options.method) === -1) {
    return Promise.reject(new ErrorHandler({
      statusCode: 400,
      message: `Invalid request method: ${options.method}`,
      name: "Request",
      requestOptions: options
    }));
  }
  if (options.query) {
    const query = new URLSearchParams();
    for (const key in options.query) {
      if (Object.prototype.hasOwnProperty.call(options.query, key)) {
        query.append(key, String(options.query[key]));
      }
    }
    fullUrl.search += (fullUrl.search ? "&" : "") + query.toString();
  }
  const isHttps = fullUrl.protocol === "https:";
  const lib = isHttps ? https : http;
  if (options.headers) {
    if (!options.headers["User-Agent"]) options.headers["User-Agent"] = getDefaultUserAgent();
    if (!options.headers["Content-Type"]) options.headers["Content-Type"] = "application/json";
  }
  if (!options.responseType) {
    options.responseType = "json";
  }
  if (options.auth && options.headers) {
    const { username, password } = options.auth;
    const token = Buffer.from(`${username}:${password}`).toString("base64");
    options.headers["Authorization"] = `Basic ${token}`;
  }
  const requestOptions = {
    method: options.method,
    headers: options.headers
  };
  if (options.proxy) {
    const proxyAuth = options.proxy.auth ? `${options.proxy.auth.username}:${options.proxy.auth.password}` : "";
    const proxyUrl = `${options.proxy.host}:${options.proxy.port}`;
    requestOptions.agent = isHttps ? new HttpsProxyAgent(`http://${proxyAuth ? `${proxyAuth}@` : ""}${proxyUrl}`) : new HttpProxyAgent(`http://${proxyAuth ? `${proxyAuth}@` : ""}${proxyUrl}`);
  }
  const dataString = options.body ? JSON.stringify(options.body) : null;
  if (dataString) {
    if (options.maxBodyLength && Buffer.byteLength(dataString) > options.maxBodyLength) {
      return Promise.reject(new ErrorHandler({
        statusCode: 413,
        message: `Request body size exceeds maxBodyLength of ${options.maxBodyLength} bytes`,
        name: "Request",
        requestOptions: options
      }));
    }
    requestOptions.headers["Content-Length"] = Buffer.byteLength(dataString).toString();
  }
  const startTimestamp = Date.now();
  return new Promise((resolve, reject) => {
    const req = lib.request(fullUrl, requestOptions, (res) => {
      const chunks = [];
      let totalLength = 0;
      let responseSize = 0;
      let lastTimestamp = startTimestamp;
      const connectionReused = getReusedSocket(res);
      const serverIp = getServerIp(res);
      res.on("data", (chunk) => {
        totalLength += chunk.length;
        responseSize += chunk.length;
        const currentTimestamp = Date.now();
        const timeElapsed = (currentTimestamp - lastTimestamp) / 1e3;
        lastTimestamp = currentTimestamp;
        const rate = chunk.length / timeElapsed;
        if (options.maxContentLength && responseSize > options.maxContentLength) {
          req.destroy();
          reject(new ErrorHandler({
            statusCode: 413,
            message: `Response size exceeds maxContentLength of ${options.maxContentLength} bytes`,
            name: "Request",
            requestOptions: options
          }));
          return;
        }
        if (options.maxRate && rate > options.maxRate) {
          res.pause();
          setTimeout(() => {
            res.resume();
          }, chunk.length / options.maxRate * 1e3);
        }
        chunks.push(chunk);
      });
      res.on("end", () => {
        const endTime = Date.now();
        const responseTime = endTime - startTimestamp;
        let rawData = Buffer.concat(chunks);
        if (options.decompress !== false) {
          const encoding = res.headers["content-encoding"];
          if (encoding === "gzip") {
            rawData = zlib.gunzipSync(rawData);
          } else if (encoding === "deflate") {
            rawData = zlib.inflateSync(rawData);
          } else if (encoding === "br") {
            rawData = zlib.brotliDecompressSync(rawData);
          }
        }
        const validateStatus = options.validateStatus || ((status) => status >= 200 && status < 300);
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && currentRedirects < (options.maxRedirects || 5)) {
          const newUrl = new URL(res.headers.location, fullUrl);
          options.url = newUrl.href;
          resolve(Core(options, currentRedirects + 1));
          return;
        }
        let responseData;
        if (options.responseType === "json") {
          try {
            responseData = JSON.parse(rawData.toString(options.responseEncoding || "utf8"));
          } catch (e) {
            responseData = rawData.toString(options.responseEncoding || "utf8");
          }
        } else if (options.responseType === "text") {
          responseData = rawData.toString(options.responseEncoding || "utf8");
        } else if (options.responseType === "blob") {
          responseData = rawData;
        } else if (options.responseType === "stream") {
          responseData = res;
        } else if (options.responseType === "arrayBuffer") {
          responseData = Buffer.from(rawData);
        } else if (options.responseType === "document") {
          responseData = rawData.toString(options.responseEncoding || "utf8");
        }
        if (!validateStatus(res.statusCode || 0)) {
          reject(new ErrorHandler({
            statusCode: res.statusCode || 0,
            message: `Request failed with status code ${res.statusCode}`,
            name: "Request",
            requestOptions: options
          }));
          return;
        }
        const response = {
          request: req,
          response: res,
          headers: res.headers,
          config: options,
          requestInfo: {
            method: options.method,
            url: options.url,
            fullUrl: fullUrl.href,
            headers: options.headers || {},
            body: options.body,
            httpVersion: res.httpVersion,
            startTimestamp,
            timeout: options.timeout,
            contentLength: dataString ? Buffer.byteLength(dataString) : 0
          },
          body: responseData,
          statusCode: res.statusCode,
          statusText: res.statusMessage || "",
          timestamp: {
            startTimestamp,
            endTimestamp: endTime
          },
          responseTime,
          responseSize,
          serverIp,
          connectionReused: connectionReused || false
        };
        resolve(response);
      });
    });
    req.on("error", (err) => {
      reject(new ErrorHandler({
        statusCode: 500,
        message: err.message,
        name: "Request",
        requestOptions: options
      }));
    });
    if (options.signal) {
      options.signal.addEventListener("abort", () => {
        req.destroy();
        reject(new ErrorHandler({
          statusCode: 499,
          message: "Request cancelled",
          name: "Request",
          requestOptions: options
        }));
      });
    }
    req.setTimeout(options.timeout || 0, () => {
      req.destroy();
      reject(new ErrorHandler({
        statusCode: 408,
        message: options.timeoutErrorMessage || "Timeout exceeded",
        name: "Request",
        requestOptions: options
      }));
    });
    if (dataString) {
      req.write(dataString);
    }
    req.end();
  });
}
__name(Core, "Core");
var engine_default = Core;
/* Package */

export { engine_default as default };
//# sourceMappingURL=engine.mjs.map
//# sourceMappingURL=engine.mjs.map