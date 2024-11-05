/* Nyro */
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AndroidVersions: () => androidWebkitVersions,
  Anonymity: () => proxyManager_exports.Anonymity,
  ChromeVersions: () => chromeWebkitVersions,
  ContentType: () => ContentType,
  Country: () => proxyManager_exports.Country,
  Format: () => proxyManager_exports.Format,
  Headers: () => Headers2,
  Method: () => Method,
  Nyro: () => Nyro,
  NyroError: () => ErrorHandler,
  OmitedProxyAPIResponse: () => proxyManager_exports.OmitedProxyAPIResponse,
  Options: () => Options,
  Plugin: () => PluginManager,
  Protocol: () => proxyManager_exports.Protocol,
  Proxy: () => proxyManager_default,
  ProxyAPIOptions: () => proxyManager_exports.ProxyAPIOptions,
  ProxyAPIResponse: () => proxyManager_exports.ProxyAPIResponse,
  ProxyFetchOptions: () => proxyManager_exports.ProxyFetchOptions,
  ProxyFilterOptions: () => proxyManager_exports.ProxyFilterOptions,
  ProxyFormat: () => proxyManager_exports.ProxyFormat,
  ProxyObject: () => proxyManager_exports.ProxyObject,
  ResponseEncoding: () => ResponseEncoding,
  ResponseType: () => ResponseType,
  SafariVersions: () => safariWebkitVersions,
  StatusCode: () => StatusCode,
  UserAgent: () => UserAgent,
  connect: () => connect,
  default: () => src_default,
  delete: () => _delete,
  extend: () => extend,
  generateAndroid: () => generateAndroid,
  generateChrome: () => generateChrome,
  generateEdge: () => generateEdge,
  generateFirefox: () => generateFirefox,
  generateSafari: () => generateSafari,
  get: () => get,
  getRandomVersion: () => getRandomVersion,
  head: () => head,
  isNyroError: () => isNyroError,
  options: () => options,
  patch: () => patch,
  post: () => post,
  put: () => put,
  request: () => request4,
  trace: () => trace,
  version: () => version
});
module.exports = __toCommonJS(src_exports);

// src/services/engine.ts
var http = __toESM(require("http"));
var https = __toESM(require("https"));
var http2 = __toESM(require("http2-wrapper"));
var zlib = __toESM(require("zlib"));
var import_url = require("url");

// package.json
var package_default = {
  name: "nyro",
  version: "2.0.0",
  main: "./dist/index.js",
  types: "./dist/index.d.ts",
  typings: "./dist/index.d.ts",
  module: "./dist/index.mjs",
  description: "A simple and effective promise-based HTTP & HTTP/2 request library that supports all HTTP methods.",
  scripts: {
    test: "ts-node test.ts",
    build: "tsup"
  },
  keywords: [
    "http",
    "https",
    "request",
    "response",
    "proxy",
    "fastgate",
    "agent",
    "http-proxy-agent",
    "https-proxy-agent",
    "get",
    "post",
    "put",
    "delete",
    "head",
    "options",
    "trace",
    "connect",
    "patch",
    "promise",
    "got",
    "url",
    "uri",
    "simple",
    "curl",
    "wget",
    "request-promise",
    "request-promise-native",
    "net",
    "network",
    "gzip",
    "node-fetch",
    "fetch",
    "ky",
    "requests",
    "human-friendly",
    "axios",
    "superagent",
    "hercai",
    "proxy-agent",
    "http-proxy",
    "https-proxy",
    "http-proxy-agent",
    "https-proxy-agent",
    "socks-proxy-agent",
    "http2",
    "http2-wrapper",
    "http2-agent",
    "http2-proxy-agent",
    "user-agent",
    "cookie",
    "cookies",
    "user-agent-generator",
    "layer7"
  ],
  author: {
    name: "Bes-js",
    url: "https://github.com/Bes-js"
  },
  homepage: "https://github.com/Bes-js/nyro",
  repository: {
    type: "git",
    url: "https://github.com/Bes-js/nyro.git"
  },
  bugs: {
    url: "https://github.com/Bes-js/nyro/issues"
  },
  funding: {
    type: "github",
    url: "https://github.com/sponsors/Bes-js"
  },
  license: "LGPL-3.0-or-later",
  devDependencies: {
    "ts-node": "^10.9.2",
    tsup: "^8.3.0"
  },
  dependencies: {
    fastgate: "^6.1.0",
    http: "^0.0.1-security",
    "http-proxy-agent": "^7.0.2",
    "http2-wrapper": "^2.2.1",
    https: "^1.0.0",
    "https-proxy-agent": "^7.0.5",
    "socks-proxy-agent": "^8.0.4"
  }
};

// src/services/utils.ts
var import_os = __toESM(require("os"));
function getReusedSocket(res) {
  return res?.reusedSocket;
}
function getServerIp(res) {
  const socket = res?.socket || res?.connection;
  return socket ? socket.remoteAddress : void 0;
}
function getDefaultUserAgent() {
  const platform = import_os.default.platform();
  const arch = import_os.default.arch();
  const nodeVersion = process.version;
  return `Nyro/${package_default.version} (${platform}; ${arch} ${nodeVersion})`;
}
function generateUniqueId() {
  return "nyro-" + Date.now() + "-" + Math.floor(Math.random() * 1e6);
}

// src/helpers/combineUrl.ts
function combineUrl(baseUrl, url, path) {
  var fullUrl = `${baseUrl || ""}${url || ""}${path || ""}`;
  if (fullUrl.trim().endsWith("/")) fullUrl = fullUrl.slice(0, -1);
  return fullUrl;
}
var combineUrl_default = combineUrl;

// src/helpers/errorHandler.ts
var StatusText = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "103": "Early Hints",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "306": "Unused",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "309": "Resume Incomplete",
  "310": "Too Many Redirects",
  "311": "Blocked by Windows Parental Controls",
  "312": "Redirect",
  "313": "Redirect Method",
  "314": "Requested URI Too Long",
  "315": "Moved Temporarily",
  "316": "Switch Proxy",
  "317": "Switch Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "510": "Not Extended",
  "511": "Network Authentication Required",
  "unknown": "Unknown Error"
};
function isNyroError(error) {
  return error instanceof ErrorHandler;
}
var ErrorHandler = class extends Error {
  constructor(errorHandlerOptions) {
    super(errorHandlerOptions.message);
    this.name = "NyroError";
    this.statusText = StatusText[errorHandlerOptions.statusCode] || StatusText["unknown"];
    this.requestOptions = errorHandlerOptions.requestOptions;
    this.statusCode = errorHandlerOptions.statusCode;
    this.stack = errorHandlerOptions.error?.stack;
  }
};

// src/services/pluginManager.ts
var PluginManager = class {
  constructor() {
    this.plugins = [];
  }
  use(plugin, notification) {
    if (!plugin.name) throw new Error("Plugin must have a name.");
    if (this.plugins.find((p) => p.name === plugin.name)) throw new Error(`Plugin with name "${plugin.name}" already exists.`);
    if (!plugin.onRequest && !plugin.onResponse && !plugin.onError) throw new Error("Plugin must have at least one method.");
    if (plugin.onRequest && typeof plugin.onRequest !== "function") throw new Error("onRequest must be a function.");
    if (plugin.onResponse && typeof plugin.onResponse !== "function") throw new Error("onResponse must be a function.");
    if (plugin.onError && typeof plugin.onError !== "function") throw new Error("onError must be a function.");
    if (notification === void 0) notification = true;
    if (notification) console.log(
      `\x1B[95;5;5mPlugin\x1B[0m \x1B[38;5;119m'${plugin.name}'\x1B[0m \x1B[95;5;5mhas been successfully loaded and activated.\x1B[0m`
    );
    this.plugins.push(plugin);
  }
  applyOnRequest(options2) {
    for (const plugin of this.plugins) {
      if (plugin.onRequest) {
        options2 = plugin.onRequest(options2) || options2;
      }
    }
    return options2;
  }
  applyOnResponse(response) {
    for (const plugin of this.plugins) {
      if (plugin.onResponse) {
        response = plugin.onResponse(response) || response;
      }
    }
    return response;
  }
  applyOnError(error) {
    for (const plugin of this.plugins) {
      if (plugin.onError) {
        error = plugin.onError(error) || error;
      }
    }
    return error;
  }
};

// src/services/engine.ts
var import_http_proxy_agent = require("http-proxy-agent");
var import_https_proxy_agent = require("https-proxy-agent");
var import_socks_proxy_agent = require("socks-proxy-agent");
var import_stream = require("stream");
var import_events = require("events");

// src/helpers/types.ts
var Method = /* @__PURE__ */ ((Method2) => {
  Method2["Get"] = "GET";
  Method2["Post"] = "POST";
  Method2["Put"] = "PUT";
  Method2["Patch"] = "PATCH";
  Method2["Delete"] = "DELETE";
  Method2["Head"] = "HEAD";
  Method2["Options"] = "OPTIONS";
  Method2["Connect"] = "CONNECT";
  Method2["Trace"] = "TRACE";
  return Method2;
})(Method || {});
var ResponseEncoding = /* @__PURE__ */ ((ResponseEncoding2) => {
  ResponseEncoding2["Utf8"] = "utf8";
  ResponseEncoding2["Ascii"] = "ascii";
  ResponseEncoding2["Base64"] = "base64";
  ResponseEncoding2["Hex"] = "hex";
  ResponseEncoding2["Latin1"] = "latin1";
  ResponseEncoding2["Binary"] = "binary";
  ResponseEncoding2["Utf16Le"] = "utf16le";
  ResponseEncoding2["Utf16Le2"] = "utf-16le";
  ResponseEncoding2["Ucs2"] = "ucs2";
  ResponseEncoding2["Ucs22"] = "ucs-2";
  ResponseEncoding2["Base64Url"] = "base64url";
  return ResponseEncoding2;
})(ResponseEncoding || {});
var ContentType = /* @__PURE__ */ ((ContentType2) => {
  ContentType2["Json"] = "application/json";
  ContentType2["Xml"] = "application/xml";
  ContentType2["UrlEncoded"] = "application/x-www-form-urlencoded";
  ContentType2["FormData"] = "multipart/form-data";
  ContentType2["Text"] = "text/plain";
  ContentType2["OctetStream"] = "application/octet-stream";
  ContentType2["Default"] = "application/json";
  return ContentType2;
})(ContentType || {});
var ResponseType = /* @__PURE__ */ ((ResponseType2) => {
  ResponseType2["Json"] = "json";
  ResponseType2["Text"] = "text";
  ResponseType2["Blob"] = "blob";
  ResponseType2["Stream"] = "stream";
  ResponseType2["ArrayBuffer"] = "arrayBuffer";
  ResponseType2["Document"] = "document";
  ResponseType2["Default"] = "json";
  return ResponseType2;
})(ResponseType || {});
var StatusCode = /* @__PURE__ */ ((StatusCode2) => {
  StatusCode2[StatusCode2["Continue"] = 100] = "Continue";
  StatusCode2[StatusCode2["SwitchingProtocols"] = 101] = "SwitchingProtocols";
  StatusCode2[StatusCode2["Processing"] = 102] = "Processing";
  StatusCode2[StatusCode2["EarlyHints"] = 103] = "EarlyHints";
  StatusCode2[StatusCode2["Ok"] = 200] = "Ok";
  StatusCode2[StatusCode2["Created"] = 201] = "Created";
  StatusCode2[StatusCode2["Accepted"] = 202] = "Accepted";
  StatusCode2[StatusCode2["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
  StatusCode2[StatusCode2["NoContent"] = 204] = "NoContent";
  StatusCode2[StatusCode2["ResetContent"] = 205] = "ResetContent";
  StatusCode2[StatusCode2["PartialContent"] = 206] = "PartialContent";
  StatusCode2[StatusCode2["MultiStatus"] = 207] = "MultiStatus";
  StatusCode2[StatusCode2["AlreadyReported"] = 208] = "AlreadyReported";
  StatusCode2[StatusCode2["ImUsed"] = 226] = "ImUsed";
  StatusCode2[StatusCode2["MultipleChoices"] = 300] = "MultipleChoices";
  StatusCode2[StatusCode2["MovedPermanently"] = 301] = "MovedPermanently";
  StatusCode2[StatusCode2["Found"] = 302] = "Found";
  StatusCode2[StatusCode2["SeeOther"] = 303] = "SeeOther";
  StatusCode2[StatusCode2["NotModified"] = 304] = "NotModified";
  StatusCode2[StatusCode2["UseProxy"] = 305] = "UseProxy";
  StatusCode2[StatusCode2["Unused"] = 306] = "Unused";
  StatusCode2[StatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
  StatusCode2[StatusCode2["PermanentRedirect"] = 308] = "PermanentRedirect";
  StatusCode2[StatusCode2["TooManyRedirects"] = 310] = "TooManyRedirects";
  StatusCode2[StatusCode2["BadRequest"] = 400] = "BadRequest";
  StatusCode2[StatusCode2["Unauthorized"] = 401] = "Unauthorized";
  StatusCode2[StatusCode2["PaymentRequired"] = 402] = "PaymentRequired";
  StatusCode2[StatusCode2["Forbidden"] = 403] = "Forbidden";
  StatusCode2[StatusCode2["NotFound"] = 404] = "NotFound";
  StatusCode2[StatusCode2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
  StatusCode2[StatusCode2["NotAcceptable"] = 406] = "NotAcceptable";
  StatusCode2[StatusCode2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
  StatusCode2[StatusCode2["RequestTimeout"] = 408] = "RequestTimeout";
  StatusCode2[StatusCode2["Conflict"] = 409] = "Conflict";
  StatusCode2[StatusCode2["Gone"] = 410] = "Gone";
  StatusCode2[StatusCode2["LengthRequired"] = 411] = "LengthRequired";
  StatusCode2[StatusCode2["PreconditionFailed"] = 412] = "PreconditionFailed";
  StatusCode2[StatusCode2["PayloadTooLarge"] = 413] = "PayloadTooLarge";
  StatusCode2[StatusCode2["UriTooLong"] = 414] = "UriTooLong";
  StatusCode2[StatusCode2["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
  StatusCode2[StatusCode2["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
  StatusCode2[StatusCode2["ExpectationFailed"] = 417] = "ExpectationFailed";
  StatusCode2[StatusCode2["ImATeapot"] = 418] = "ImATeapot";
  StatusCode2[StatusCode2["MisdirectedRequest"] = 421] = "MisdirectedRequest";
  StatusCode2[StatusCode2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
  StatusCode2[StatusCode2["Locked"] = 423] = "Locked";
  StatusCode2[StatusCode2["FailedDependency"] = 424] = "FailedDependency";
  StatusCode2[StatusCode2["TooEarly"] = 425] = "TooEarly";
  StatusCode2[StatusCode2["UpgradeRequired"] = 426] = "UpgradeRequired";
  StatusCode2[StatusCode2["PreconditionRequired"] = 428] = "PreconditionRequired";
  StatusCode2[StatusCode2["TooManyRequests"] = 429] = "TooManyRequests";
  StatusCode2[StatusCode2["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
  StatusCode2[StatusCode2["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
  StatusCode2[StatusCode2["InternalServerError"] = 500] = "InternalServerError";
  StatusCode2[StatusCode2["NotImplemented"] = 501] = "NotImplemented";
  StatusCode2[StatusCode2["BadGateway"] = 502] = "BadGateway";
  StatusCode2[StatusCode2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
  StatusCode2[StatusCode2["GatewayTimeout"] = 504] = "GatewayTimeout";
  StatusCode2[StatusCode2["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
  StatusCode2[StatusCode2["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
  StatusCode2[StatusCode2["InsufficientStorage"] = 507] = "InsufficientStorage";
  StatusCode2[StatusCode2["LoopDetected"] = 508] = "LoopDetected";
  StatusCode2[StatusCode2["NotExtended"] = 510] = "NotExtended";
  StatusCode2[StatusCode2["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
  return StatusCode2;
})(StatusCode || {});

// src/services/engine.ts
var cacheStore = /* @__PURE__ */ new Map();
var Core = class _Core extends import_events.EventEmitter {
  constructor(baseRequestOptions) {
    super();
    this.pluginManager = new PluginManager();
    this.baseRequestOptions = baseRequestOptions || {};
  }
  use(plugin) {
    return this.pluginManager.use(plugin);
  }
  on(event, listener) {
    return super.on(event, listener);
  }
  once(event, listener) {
    return super.once(event, listener);
  }
  off(event, listener) {
    return super.off(event, listener);
  }
  emit(event, ...args) {
    return super.emit(event, ...args);
  }
  static {
    /**
     * The version of the Nyro library.
     */
    this.version = `${package_default.version}`;
  }
  static {
    /**
     * The package.json file for the Nyro library.
     */
    this.pkg = package_default;
  }
  /**
   * @param url
   * @returns this
   * @example Nyro.setURL('https://jsonplaceholder.typicode.com/posts');
   * @description This function sets the URL for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setURL(url) {
    this.baseRequestOptions.url = url;
    return this;
  }
  /**
   * @param baseURL
   * @returns this
   * @example Nyro.setBaseURL('https://jsonplaceholder.typicode.com');
   * @description This function sets the base URL for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setBaseURL(baseURL) {
    this.baseRequestOptions.baseURL = baseURL;
    return this;
  }
  /**
   * @param path
   * @returns this
   * @example Nyro.setPath('/posts');
   * @description This function sets the path for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setPath(path) {
    this.baseRequestOptions.path = path;
    return this;
  }
  /**
   * @param bodySchema
   * @returns this
   * @example Nyro.setBodySchema({ title: String, body: String });
   * @description This function sets the body schema for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setBodySchema(bodySchema) {
    this.baseRequestOptions.bodySchema = bodySchema;
    return this;
  }
  /**
   * @param auth
   * @returns this
   * @example Nyro.setAuth({ username: 'user', password: 'pass' });
   * @description This function sets the authentication credentials for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setAuth(auth) {
    this.baseRequestOptions.auth = auth;
    return this;
  }
  /**
   * @param proxy
   * @returns this
   * @example Nyro.setProxy({ host: 'localhost', port: 8080, protocol: 'http' });
   * @description This function sets the proxy for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setProxy(proxy) {
    this.baseRequestOptions.proxy = proxy;
    return this;
  }
  /**
   * @param method
   * @returns this
   * @example Nyro.setMethod('GET');
   * @description This function sets the method for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setMethod(method) {
    this.baseRequestOptions.method = method;
    return this;
  }
  /**
   * @param headers
   * @returns this
   * @example Nyro.setHeaders({ 'Content-Type': 'application/json' });
   * @description This function sets the headers for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setHeaders(headers) {
    this.baseRequestOptions.headers = headers;
    return this;
  }
  /**
   * @param params
   * @returns this
   * @example Nyro.setParams({ id: '1' });
   * @description This function sets the query parameters for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setParams(params) {
    this.baseRequestOptions.params = params;
    return this;
  }
  /**
   * @param query
   * @returns this
   * @example Nyro.setQuery({ id: '1' });
   * @description This function sets the query parameters for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setQuery(query) {
    this.baseRequestOptions.query = query;
    return this;
  }
  /**
   * @param body
   * @returns this
   * @example Nyro.setBody({ title: 'foo', body: 'bar', userId: 1 });
   * @description This function sets the body for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setBody(body) {
    this.baseRequestOptions.body = body;
    return this;
  }
  /**
   * @param timeout
   * @returns this
   * @example Nyro.setTimeout(5000);
   * @description This function sets the timeout for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setTimeout(timeout) {
    this.baseRequestOptions.timeout = timeout;
    return this;
  }
  /**
   * @param retryOn
   * @returns this
   * @example Nyro.setRetryOn((req, error) => error.code === 'ETIMEDOUT');
   * @description This function sets the retry condition for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setRetryOn(retryOn) {
    this.baseRequestOptions.onRetry = retryOn;
    return this;
  }
  /**
   * @param retries
   * @returns this
   * @example Nyro.setRetries(3);
   * @description This function sets the number of retries for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setRetries(retries) {
    this.baseRequestOptions.retries = retries;
    return this;
  }
  /**
   * @param validateStatus
   * @returns this
   * @example Nyro.setValidateStatus((status) => status >= 200 && status < 300);
   * @description This function sets the status validation for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setValidateStatus(validateStatus) {
    this.baseRequestOptions.validateStatus = validateStatus;
    return this;
  }
  /**
   * @param maxBodyLength
   * @returns this
   * @example Nyro.setMaxBodyLength(1000);
   * @description This function sets the maximum body length for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setMaxBodyLength(maxBodyLength) {
    this.baseRequestOptions.maxBodyLength = maxBodyLength;
    return this;
  }
  /**
   * @param maxContentLength
   * @returns this
   * @example Nyro.setMaxContentLength(1000);
   * @description This function sets the maximum content length for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setMaxContentLength(maxContentLength) {
    this.baseRequestOptions.maxContentLength = maxContentLength;
    return this;
  }
  /**
   * @param maxRate
   * @returns this
   * @example Nyro.setMaxRate(1000);
   * @description This function sets the maximum rate for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setMaxRate(maxRate) {
    this.baseRequestOptions.maxRate = maxRate;
    return this;
  }
  /**
   * @param signal
   * @returns this
   * @example Nyro.setSignal(signal);
   * @description This function sets the signal for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setSignal(signal) {
    this.baseRequestOptions.signal = signal;
    return this;
  }
  /**
   * @param onDownloadProgress
   * @returns this
   * @example Nyro.setOnDownloadProgress((progress) => console.log(progress));
   * @description This function sets the download progress for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setOnDownloadProgress(onDownloadProgress) {
    this.baseRequestOptions.onDownloadProgress = onDownloadProgress;
    return this;
  }
  /**
   * @param timeoutErrorMessage
   * @returns this
   * @example Nyro.setTimeoutErrorMessage('Request timed out');
   * @description This function sets the timeout error message for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setTimeoutErrorMessage(timeoutErrorMessage) {
    this.baseRequestOptions.timeoutErrorMessage = timeoutErrorMessage;
    return this;
  }
  /**
   * @param responseType
   * @returns this
   * @example Nyro.setResponseType('json');
   * @description This function sets the response type for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setResponseType(responseType) {
    this.baseRequestOptions.responseType = responseType;
    return this;
  }
  /**
   * @param responseEncoding
   * @returns this
   * @example Nyro.setResponseEncoding('utf8');
   * @description This function sets the response encoding for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setResponseEncoding(responseEncoding) {
    this.baseRequestOptions.responseEncoding = responseEncoding;
    return this;
  }
  /**
   * @param maxRedirects
   * @returns this
   * @example Nyro.setMaxRedirects(3);
   * @description This function sets the maximum number of redirects for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setMaxRedirects(maxRedirects) {
    this.baseRequestOptions.maxRedirects = maxRedirects;
    return this;
  }
  /**
   * @param retryDelay
   * @returns this
   * @example Nyro.setRetryDelay(1000);
   * @description This function sets the retry delay for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setRetryDelay(retryDelay) {
    this.baseRequestOptions.retryDelay = retryDelay;
    return this;
  }
  /**
   * @param decompress
   * @returns this
   * @example Nyro.setDecompress(true);
   * @description This function sets the decompress option for the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   */
  setDecompress(decompress) {
    this.baseRequestOptions.decompress = decompress;
    return this;
  }
  /*-------------------------------------------------------*/
  /*----------------LINE-------------BREAK-----------------*/
  /*-------------------------------------------------------*/
  /**
   * Sends a GET request to the specified URL.
   * @param url - The URL to send the request to.
   * @param options - The request options.
   * @returns A promise that resolves with the HTTP response.
   * @example Nyro.get('https://jsonplaceholder.typicode.com/posts');
   * @description This function sends a GET request to the specified URL and returns a promise that resolves with the HTTP response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET|MDN web docs}
   */
  async get(url, options2) {
    let method = "GET";
    if (this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request(!url ? this.baseRequestOptions : { ...options2, method: this.baseRequestOptions.method || method, url });
  }
  /**
   * Sends a POST request to the specified URL.
   * @param url - The URL to send the request to.
   * @param options - The request options.
   * @returns A promise that resolves with the HTTP response.
   * @example Nyro.post('https://jsonplaceholder.typicode.com/posts');
   * @description This function sends a POST request to the specified URL and returns a promise that resolves with the HTTP response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST|MDN web docs}
   */
  async post(url, options2) {
    let method = "POST";
    if (this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request(!url ? this.baseRequestOptions : { ...options2, method: this.baseRequestOptions.method || method, url });
  }
  /**
   * Sends a PUT request to the specified URL.
   * @param url - The URL to send the request to.
   * @param options - The request options.
   * @returns A promise that resolves with the HTTP response.
   * @example Nyro.put('https://jsonplaceholder.typicode.com/posts');
   * @description This function sends a PUT request to the specified URL and returns a promise that resolves with the HTTP response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT|MDN web docs}
   */
  async put(url, options2) {
    let method = "PUT";
    if (this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request(!url ? this.baseRequestOptions : { ...options2, method: this.baseRequestOptions.method || method, url });
  }
  /**
   * Sends a DELETE request to the specified URL.
   * @param url - The URL to send the request to.
   * @param options - The request options.
   * @returns A promise that resolves with the HTTP response.
   * @example Nyro.delete('https://jsonplaceholder.typicode.com/posts');
   * @description This function sends a DELETE request to the specified URL and returns a promise that resolves with the HTTP response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE|MDN web docs}
   */
  async delete(url, options2) {
    let method = "DELETE";
    if (this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request(!url ? this.baseRequestOptions : { ...options2, method: this.baseRequestOptions.method || method, url });
  }
  /**
   * Sends a PATCH request to the specified URL.
   * @param url - The URL to send the request to.
   * @param options - The request options.
   * @returns A promise that resolves with the HTTP response.
   * @example Nyro.patch('https://jsonplaceholder.typicode.com/posts');
   * @description This function sends a PATCH request to the specified URL and returns a promise that resolves with the HTTP response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH|MDN web docs}
   */
  async patch(url, options2) {
    let method = "PATCH";
    if (this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request(!url ? this.baseRequestOptions : { ...options2, method: this.baseRequestOptions.method || method, url });
  }
  /**
   * Sends a HEAD request to the specified URL.
   * @param url - The URL to send the request to.
   * @param options - The request options.
   * @returns A promise that resolves with the HTTP response.
   * @example Nyro.head('https://jsonplaceholder.typicode.com/posts');
   * @description This function sends a HEAD request to the specified URL and returns a promise that resolves with the HTTP response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD|MDN web docs}
   */
  async head(url, options2) {
    let method = "HEAD";
    if (this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request(!url ? this.baseRequestOptions : { ...options2, method: this.baseRequestOptions.method || method, url });
  }
  /**
   * Sends an OPTIONS request to the specified URL.
   * @param url - The URL to send the request to.
   * @param options - The request options.
   * @returns A promise that resolves with the HTTP response.
   * @example Nyro.options('https://jsonplaceholder.typicode.com/posts');
   * @description This function sends an OPTIONS request to the specified URL and returns a promise that resolves with the HTTP response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS|MDN web docs}
   */
  async options(url, options2) {
    let method = "OPTIONS";
    if (this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request(!url ? this.baseRequestOptions : { ...options2, method: this.baseRequestOptions.method || method, url });
  }
  /**
   * Sends a CONNECT request to the specified URL.
   * @param url - The URL to send the request to.
   * @param options - The request options.
   * @returns A promise that resolves with the HTTP response.
   * @example Nyro.connect('https://jsonplaceholder.typicode.com/posts');
   * @description This function sends a CONNECT request to the specified URL and returns a promise that resolves with the HTTP response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT|MDN web docs}
   */
  async connect(url, options2) {
    let method = "CONNECT";
    if (this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request(!url ? this.baseRequestOptions : { ...options2, method: this.baseRequestOptions.method || method, url });
  }
  /**
  * Sends a TRACE request to the specified URL.
  * @param url - The URL to send the request to.
  * @param options - The request options.
  * @returns A promise that resolves with the HTTP response.
  * @example Nyro.trace('https://jsonplaceholder.typicode.com/posts');
  * @description This function sends a TRACE request to the specified URL and returns a promise that resolves with the HTTP response.
  * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE|MDN web docs}
  */
  async trace(url, options2) {
    return this.request(!url ? this.baseRequestOptions : { ...options2, method: "TRACE", url });
  }
  /**
   * Downloads a file from the specified URL.
   * @param url - The URL to download the file from.
   * @param options - The request options.
   * @returns A promise that resolves with the HTTP response.
   * @example Nyro.download('https://jsonplaceholder.typicode.com/posts');
   * @description This function downloads a file from the specified URL and returns a promise that resolves with the HTTP response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type|MDN web docs}
   */
  async download(url, options2) {
    return this.request({ ...options2, responseType: "stream", isStream: true, method: "GET", url });
  }
  /**
   * Sends a request to the specified URL with pagination.
   * @param options - The request options.
   * @param paginationOptions - The pagination options.
   * @returns A promise that resolves with an array of HTTP responses.
   * @example Nyro.pagination({ url: 'https://jsonplaceholder.typicode.com/posts', method: 'GET' }, { pageParam: 'page', limitParam: 'limit', maxPages: 3 });
   * @description This function sends a request to the specified URL with pagination and returns a promise that resolves with an array of HTTP responses.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Response_headers|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link|MDN web docs}
   */
  async pagination(options2, paginationOptions) {
    const results = [];
    let page = 1;
    let hasMore = true;
    while (hasMore) {
      const paginatedOptions = {
        ...options2,
        params: { ...options2?.params, [paginationOptions?.pageParam || "page"]: page }
      };
      const response = await this.request(paginatedOptions);
      if (Array.isArray(response)) {
        results.push(...response);
      } else {
        results.push(response);
      }
      hasMore = Array.isArray(response) && response.length > 0 && (!(paginationOptions?.maxPages ?? 0) || page < (paginationOptions?.maxPages ?? 0));
      page++;
    }
    return results;
  }
  /**
   * Sends multiple requests to the specified URLs.
   * @param requests - The request options.
   * @returns A promise that resolves with an array of HTTP responses.
   * @example Nyro.queue([
   * { url: 'https://jsonplaceholder.typicode.com/posts/1', method: 'GET' },
   * { url: 'https://jsonplaceholder.typicode.com/posts/2', method: 'POST' }
   * ]);
   * @description This function sends multiple requests to the specified URLs and returns a promise that resolves with an array of HTTP responses.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Response_headers|MDN web docs}
   */
  async queue(requests, queueOptions) {
    return Promise.all(requests.map((request5, index) => new Promise((resolve) => setTimeout(() => resolve(this.request(request5)), index * (queueOptions?.delay ?? 0)))));
  }
  /**
  * Extends the default request options with the provided options.
  * 
  * @param extendOptions - The options to extend the default request options with.
  * @returns An object with the execute function to make the request and the options used for the request.
  * @example Nyro.extend({
  * url: 'https://jsonplaceholder.typicode.com/posts',
  * method: 'GET',
  * headers: {
  * 'Content-Type': 'application/json'
  * }
  * });
  * @description This function allows you to create a new request with the provided options, while keeping the default options for future requests.
  */
  async extend(extendOptions) {
    var options2 = { ...this.baseRequestOptions, ...extendOptions };
    return new _Core(options2);
  }
  /**
   * Creates a new instance of the Nyro library with the provided options.
   * 
   * @param options - The request options.
   * @returns A new instance of the Nyro library with the provided options.
   * @example Nyro.create({
   * url: 'https://jsonplaceholder.typicode.com/posts',
   * method: 'GET',
   * headers: {
   * 'Content-Type': 'application/json'
   * }
   * });
   * @description This function creates a new instance of the Nyro library with the provided options.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status|MDN web docs}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Response_headers|MDN web docs}
   */
  async create(options2) {
    return new _Core(options2);
  }
  /**
  * Core function for handling HTTP requests.
  * 
  * @param options - The request options.
  * @param currentRedirects - The number of redirects that have occurred.
  * @returns A promise that resolves with the HTTP response.
  */
  async request(options2, currentRedirects = 0, attempt = 1, visitedUrls = /* @__PURE__ */ new Set()) {
    if (!options2) {
      options2 = { ...this.baseRequestOptions };
    } else {
      options2 = { ...this.baseRequestOptions, ...options2 };
    }
    ;
    const combinedURL = combineUrl_default(options2?.baseURL || "", options2?.url || "", options2?.path || "");
    try {
      var fullUrl = new import_url.URL(combinedURL);
    } catch (error) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: `Invalid URL: ${combinedURL}`,
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: `Invalid URL: ${combinedURL}`,
        name: "Request",
        requestOptions: options2
      }));
    }
    visitedUrls.add(fullUrl.toString());
    if (options2?.signal?.aborted) {
      this.emit("error", new ErrorHandler({
        statusCode: 0,
        message: "Request aborted",
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 0,
        message: "Request aborted",
        name: "Request",
        requestOptions: options2
      }));
    }
    ;
    if (options2?.port) {
      options2.port = options2?.port || (fullUrl.protocol === "https:" ? 443 : 80);
    }
    ;
    if (options2?.path) {
      fullUrl.pathname += options2.path;
    }
    if (options2?.isStream) {
      options2.responseType = "stream";
    }
    if (options2?.params) {
      const params = new import_url.URLSearchParams(options2.params);
      fullUrl.search = params.toString();
    }
    if (["json", "text", "blob", "stream", "arrayBuffer", "document"].indexOf(options2?.responseType || "json") === -1) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: `Invalid response type: ${options2?.responseType}`,
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: `Invalid response type: ${options2?.responseType}`,
        name: "Request",
        requestOptions: options2
      }));
    }
    ;
    options2.method = options2.method?.toUpperCase() || "GET";
    if (options2 && options2.method && ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS", "CONNECT", "TRACE"].indexOf(options2.method) === -1) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: `Invalid request method: ${options2.method}`,
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: `Invalid request method: ${options2.method}`,
        name: "Request",
        requestOptions: options2
      }));
    }
    ;
    if (options2?.timeout && options2.timeout < 0) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: `Invalid timeout: ${options2.timeout}`,
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: `Invalid timeout: ${options2.timeout}`,
        name: "Request",
        requestOptions: options2
      }));
    }
    ;
    if (options2?.maxRedirects && options2.maxRedirects < 0) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: `Invalid number of redirects: ${options2.maxRedirects}`,
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: `Invalid number of redirects: ${options2.maxRedirects}`,
        name: "Request",
        requestOptions: options2
      }));
    }
    ;
    if (options2?.maxBodyLength && options2.maxBodyLength < 0) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: `Invalid max body length: ${options2.maxBodyLength}`,
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: `Invalid max body length: ${options2.maxBodyLength}`,
        name: "Request",
        requestOptions: options2
      }));
    }
    ;
    if (options2?.maxContentLength && options2.maxContentLength < 0) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: `Invalid max content length: ${options2.maxContentLength}`,
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: `Invalid max content length: ${options2.maxContentLength}`,
        name: "Request",
        requestOptions: options2
      }));
    }
    ;
    if (options2?.maxRate && options2.maxRate < 0) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: `Invalid max rate: ${options2.maxRate}`,
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: `Invalid max rate: ${options2.maxRate}`,
        name: "Request",
        requestOptions: options2
      }));
    }
    ;
    if (options2?.retryDelay && options2.retryDelay < 0) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: `Invalid retry delay: ${options2.retryDelay}`,
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: `Invalid retry delay: ${options2.retryDelay}`,
        name: "Request",
        requestOptions: options2
      }));
    }
    ;
    if (options2?.retries && options2.retries < 0) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: `Invalid number of retries: ${options2.retries}`,
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: `Invalid number of retries: ${options2.retries}`,
        name: "Request",
        requestOptions: options2
      }));
    }
    ;
    if (options2?.query) {
      const query = new import_url.URLSearchParams();
      for (const key in options2.query) {
        if (Object.prototype.hasOwnProperty.call(options2.query, key)) {
          query.append(key, String(options2.query[key]));
        }
      }
      fullUrl.search += (fullUrl.search ? "&" : "") + query.toString();
    }
    if (options2.useHttp2 == void 0) options2.useHttp2 = true;
    if (options2.useHttp2 && !http2) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: "http2 is not available in this environment",
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: "http2 is not available in this environment",
        name: "Request",
        requestOptions: options2
      }));
    }
    var isHttps = fullUrl.protocol === "https:";
    if (!isHttps && options2.sslOptions?.passphrase || options2.sslOptions?.ca || options2.sslOptions?.cert || options2.sslOptions?.key || options2.sslOptions?.rejectUnauthorized || options2.sslOptions?.secureProtocol) {
      this.emit("error", new ErrorHandler({
        statusCode: 400,
        message: "SSL options are only supported for HTTPS requests",
        name: "Request",
        requestOptions: options2
      }));
      return Promise.reject(new ErrorHandler({
        statusCode: 400,
        message: "SSL options are only supported for HTTPS requests",
        name: "Request",
        requestOptions: options2
      }));
    }
    if (!options2.headers) options2.headers = {};
    if (options2?.headers) {
      if (!options2.headers["User-Agent"]) options2.headers["User-Agent"] = getDefaultUserAgent();
      if (!options2.headers["Accept"]) options2.headers["Accept"] = `*/*`;
      if (!options2.headers["Content-Type"]) options2.headers["Content-Type"] = "application/json";
      if (!options2.headers["Content-Length"]) options2.headers["Content-Length"] = "0";
    }
    if (options2 && !options2?.responseType) {
      options2.responseType = "json";
    }
    if (options2?.auth && options2?.headers) {
      const { username, password } = options2.auth;
      const token = Buffer.from(`${username}:${password}`).toString("base64");
      options2.headers["Authorization"] = `Basic ${token}`;
    }
    const onRequest = options2?.onRequest || ((requestOptions2) => requestOptions2);
    const validateStatus = options2?.validateStatus || ((status) => status >= 200 && status < 300);
    const onResponse = options2?.onResponse || ((response) => response);
    const onTimeout = options2?.onTimeout || (() => {
    });
    const onRedirect = options2?.onRedirect || ((response) => response);
    const onChunk = options2?.onChunk || ((chunk) => chunk);
    if (!options2?.requestId) options2.requestId = generateUniqueId();
    if (!options2?.defaultMode) {
      var onRequestOptions = onRequest(options2);
      if (onRequestOptions) options2 = { ...onRequest(options2), ...options2 };
      if (this.pluginManager) options2 = this.pluginManager.applyOnRequest(options2);
      this.emit("beforeRequest", options2);
    }
    ;
    var requestOptions = {
      method: options2.method,
      headers: options2?.headers,
      ...options2.sslOptions
    };
    if (options2?.timeout) {
      requestOptions.timeout = options2.timeout;
    }
    if (options2?.signal) {
      requestOptions.signal = options2.signal;
    }
    if (options2?.proxy) {
      var proxyAuth = options2.proxy.auth ? `${options2.proxy.auth.username}:${options2.proxy.auth.password}` : "";
      var proxyUrl = `${options2.proxy.host}:${options2.proxy.port}`;
      var protocol = options2.proxy?.protocol ? options2.proxy.protocol : "http";
      requestOptions.agent = protocol.includes("socks") ? new import_socks_proxy_agent.SocksProxyAgent(`${protocol}://${proxyAuth ? `${proxyAuth}@` : ""}${proxyUrl}`) : isHttps ? new import_https_proxy_agent.HttpsProxyAgent(`${protocol}://${proxyAuth ? `${proxyAuth}@` : ""}${proxyUrl}`) : new import_http_proxy_agent.HttpProxyAgent(`${protocol}://${proxyAuth ? `${proxyAuth}@` : ""}${proxyUrl}`);
    }
    const dataString = options2?.body ? JSON.stringify(options2.body) : null;
    if (dataString) {
      if (options2?.maxBodyLength && Buffer.byteLength(dataString) > options2.maxBodyLength) {
        return Promise.reject(new ErrorHandler({
          statusCode: 413,
          message: `Request body size exceeds maxBodyLength of ${options2.maxBodyLength} bytes`,
          name: "Request",
          requestOptions: options2
        }));
      }
      requestOptions.headers["Content-Length"] = Buffer.byteLength(dataString).toString();
    }
    const startTimestamp = Date.now();
    var lib = options2.useHttp2 && isHttps ? http2.request(fullUrl.toString(), requestOptions) : isHttps ? https.request(fullUrl.toString(), requestOptions) : http.request(fullUrl.toString(), requestOptions);
    return new Promise((resolve, reject) => {
      const req = lib.on("response", (res) => {
        var cacheKey = `${options2.method}:${fullUrl.toString()}`;
        if (options2.cache && cacheStore.has(cacheKey)) {
          const cachedItem = cacheStore.get(cacheKey);
          if (cachedItem && Date.now() < cachedItem.expiry) {
            cachedItem.response.isCached = true;
            resolve(cachedItem.response);
          } else {
            cacheStore.delete(cacheKey);
          }
        }
        var chunks = [];
        let responseData;
        let totalLength = 0;
        let responseSize = 0;
        let downloaded = 0;
        let lastTimestamp = startTimestamp;
        const contentLength = parseInt(res.headers["content-length"] ?? "0", 10) || null;
        const connectionReused = getReusedSocket(res);
        const serverIp = getServerIp(res);
        if (options2?.responseType === "stream") {
          if (options2.cache) reject(new ErrorHandler({
            statusCode: 400,
            message: `Stream responses cannot be cached`,
            name: "Request",
            requestOptions: options2
          }));
          const stream = new import_stream.PassThrough();
          res.pipe(stream);
          const response = {
            request: req,
            response: res,
            headers: res.headers,
            config: options2,
            requestInfo: {
              method: options2?.method,
              url: options2?.url,
              fullUrl: fullUrl.href,
              headers: options2?.headers || {},
              body: options2?.body,
              httpVersion: res.httpVersion,
              startTimestamp,
              timeout: options2?.timeout,
              contentLength: dataString ? Buffer.byteLength(dataString) : 0
            },
            body: stream,
            statusCode: res.statusCode,
            statusText: res.statusMessage || "",
            timestamp: {
              startTimestamp,
              endTimestamp: Date.now()
            },
            responseTime: Date.now() - startTimestamp,
            responseSize: 0,
            serverIp,
            connectionReused: connectionReused || false,
            isStream: true,
            isCached: false
          };
          if (!options2?.defaultMode) {
            stream.on("data", (chunk) => {
              onChunk(chunk);
            });
            this.emit("afterResponse", response);
          }
          ;
          resolve(response);
        } else {
          res.on("data", (chunk) => {
            totalLength += chunk.length;
            responseSize += chunk.length;
            downloaded += chunk.length;
            const currentTimestamp = Date.now();
            const timeElapsed = (currentTimestamp - lastTimestamp) / 1e3;
            lastTimestamp = currentTimestamp;
            const rate = chunk.length / timeElapsed;
            if (contentLength && options2?.onDownloadProgress) {
              const progress = Math.min(1, downloaded / contentLength);
              options2.onDownloadProgress({
                percent: progress * 100,
                transferredBytes: downloaded,
                totalBytes: contentLength
              });
            }
            ;
            if (options2?.maxContentLength && responseSize > options2.maxContentLength) {
              req.destroy();
              this.emit("error", new ErrorHandler({
                statusCode: 413,
                message: `Response size exceeds maxContentLength of ${options2.maxContentLength} bytes`,
                name: "Request",
                requestOptions: options2
              }));
              reject(new ErrorHandler({
                statusCode: 413,
                message: `Response size exceeds maxContentLength of ${options2.maxContentLength} bytes`,
                name: "Request",
                requestOptions: options2
              }));
              return;
            }
            ;
            if (options2?.maxRate && rate > options2.maxRate) {
              res.pause();
              setTimeout(() => {
                res.resume();
              }, chunk.length / options2.maxRate * 1e3);
            }
            ;
            chunks.push(chunk);
          });
          res.on("end", async () => {
            const endTime = Date.now();
            const responseTime = endTime - startTimestamp;
            let rawData = Buffer.concat(chunks);
            if (!options2?.decompress) {
              const encoding = res.headers["content-encoding"];
              if (encoding === "gzip") {
                rawData = zlib.gunzipSync(rawData);
              } else if (encoding === "deflate") {
                rawData = zlib.inflateSync(rawData);
              } else if (encoding === "br") {
                rawData = zlib.brotliDecompressSync(rawData);
              }
            }
            if (res.statusCode && [301, 302, 303, 307, 308].includes(res.statusCode)) {
              if (currentRedirects >= (options2?.maxRedirects || 5)) {
                this.emit("error", new ErrorHandler({
                  statusCode: 310,
                  message: `Exceeded maximum number of redirects: ${options2?.maxRedirects || 5}`,
                  name: "Request",
                  requestOptions: options2
                }));
                reject(new ErrorHandler({
                  statusCode: 310,
                  message: `Exceeded maximum number of redirects: ${options2?.maxRedirects || 5}`,
                  name: "Request",
                  requestOptions: options2
                }));
                return;
              }
              if (!options2.defaultMode) {
                onRedirect(res);
              }
              if (!res.headers.location) {
                this.emit("error", new ErrorHandler({
                  statusCode: 310,
                  message: `Redirect location header missing`,
                  name: "Request",
                  requestOptions: options2
                }));
                reject(new ErrorHandler({
                  statusCode: 310,
                  message: `Redirect location header missing`,
                  name: "Request",
                  requestOptions: options2
                }));
                return;
              }
              var newUrl = new import_url.URL(res.headers.location);
              if (visitedUrls.has(newUrl.toString())) {
                this.emit("error", new ErrorHandler({
                  statusCode: 508,
                  message: `Redirect loop detected`,
                  name: "Request",
                  requestOptions: options2
                }));
                reject(new ErrorHandler({
                  statusCode: 508,
                  message: `Redirect loop detected`,
                  name: "Request",
                  requestOptions: options2
                }));
                return;
              }
              try {
                if (res.headers.location?.startsWith("http://") || res.headers.location?.startsWith("https://")) {
                  newUrl = new import_url.URL(res.headers.location);
                } else {
                  newUrl = new import_url.URL(res.headers.location, fullUrl);
                }
              } catch (error) {
                this.emit("error", new ErrorHandler({
                  statusCode: 310,
                  message: `Invalid redirect URL: ${res.headers.location}`,
                  name: "Request",
                  requestOptions: options2
                }));
                reject(new ErrorHandler({
                  statusCode: 310,
                  message: `Invalid redirect URL: ${res.headers.location}`,
                  name: "Request",
                  requestOptions: options2
                }));
                return;
              }
              var newOptions = {
                ...options2,
                url: newUrl.toString()
              };
              delete newOptions.baseURL;
              delete newOptions.path;
              switch (res.statusCode) {
                case 301:
                // Permanent redirect
                case 302:
                  if (newOptions.method === "POST" || newOptions.method === "PUT") {
                    newOptions.method = "GET";
                    delete newOptions.body;
                    if (newOptions.headers) {
                      delete newOptions.headers["content-length"];
                      delete newOptions.headers["content-type"];
                    }
                  }
                  break;
                case 303:
                  if (newOptions.method === "POST" || newOptions.method === "PUT") {
                    newOptions.method = "GET";
                    delete newOptions.body;
                    if (newOptions.headers) {
                      delete newOptions.headers["content-length"];
                      delete newOptions.headers["content-type"];
                    }
                  }
                  break;
                case 307:
                // Temporary redirect
                case 308:
                  break;
              }
              if (!newUrl.host) {
                newUrl.host = fullUrl.host;
                newUrl.protocol = fullUrl.protocol;
              }
              if (res.headers["set-cookie"]) {
                if (!newOptions.headers) newOptions.headers = {};
                const currentCookies = newOptions.headers.cookie || "";
                const newCookies = res.headers["set-cookie"].map((cookie) => cookie.split(";")[0]).join("; ");
                newOptions.headers["Cookie"] = currentCookies ? `${currentCookies}; ${newCookies}` : newCookies;
              }
              try {
                const redirectResponse = await this.request(
                  newOptions,
                  currentRedirects + 1,
                  attempt,
                  visitedUrls
                );
                resolve(redirectResponse);
              } catch (error) {
                this.emit("error", new ErrorHandler({
                  statusCode: 310,
                  message: `Redirect failed: ${error.message}`,
                  name: "Request",
                  requestOptions: options2
                }));
                reject(new ErrorHandler({
                  statusCode: 310,
                  message: `Redirect failed: ${error.message}`,
                  name: "Request",
                  requestOptions: options2
                }));
              }
              return;
            }
            if (options2?.responseType === "json") {
              try {
                responseData = JSON.parse(rawData.toString(options2.responseEncoding || "utf8"));
              } catch (e) {
                responseData = rawData.toString(options2.responseEncoding || "utf8");
              }
            } else if (options2?.responseType === "text") {
              responseData = rawData.toString(options2.responseEncoding || "utf8");
            } else if (options2?.responseType === "blob") {
              responseData = rawData;
            } else if (options2?.responseType === "arrayBuffer") {
              responseData = Buffer.from(rawData);
            } else if (options2?.responseType === "document") {
              responseData = rawData.toString(options2.responseEncoding || "utf8");
            }
            if (!validateStatus(res.statusCode || 0)) {
              this.emit("error", new ErrorHandler({
                statusCode: res.statusCode || 0,
                message: `Request failed with status code ${res.statusCode}`,
                name: "Request",
                requestOptions: options2
              }));
              reject(new ErrorHandler({
                statusCode: res.statusCode || 0,
                message: `Request failed with status code ${res.statusCode}`,
                name: "Request",
                requestOptions: options2
              }));
              return;
            }
            var response = {
              request: req,
              response: res,
              headers: res.headers,
              config: options2,
              requestInfo: {
                requestId: options2?.requestId || "",
                method: options2?.method,
                url: options2?.url,
                fullUrl: fullUrl.href,
                headers: options2?.headers || {},
                body: options2?.body,
                httpVersion: res.httpVersion,
                startTimestamp,
                timeout: options2?.timeout,
                contentLength: dataString ? Buffer.byteLength(dataString) : 0
              },
              requestId: options2?.requestId || "",
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
              connectionReused: connectionReused || false,
              isStream: false,
              isCached: false
            };
            if (options2.cache) {
              cacheStore.set(cacheKey, {
                response,
                expiry: Date.now() + (options2.cacheTTL ?? 6e4)
              });
            }
            if (!options2?.defaultMode) {
              var returnOnResponse = onResponse(response);
              if (returnOnResponse) response = returnOnResponse;
              var returnApplyOnResponse = this.pluginManager?.applyOnResponse(response);
              if (this.pluginManager && returnApplyOnResponse) response = returnApplyOnResponse;
              this.emit("afterResponse", response);
            }
            ;
            resolve(response);
          });
        }
      });
      req.on("error", (err) => {
        if (options2?.retries && attempt <= options2.retries && (options2.onRetry?.(req, err) ?? true)) {
          var delay = options2.retryDelay || 1e3;
          setTimeout(() => {
            new _Core().request(options2, currentRedirects, attempt + 1);
          }, delay);
        } else {
          this.emit("error", new ErrorHandler({
            statusCode: 500,
            message: err.message,
            name: "Request",
            requestOptions: options2
          }));
          reject(new ErrorHandler({
            statusCode: 500,
            message: err.message,
            name: "Request",
            requestOptions: options2
          }));
        }
        ;
      });
      if (options2?.signal) {
        options2.signal.addEventListener("abort", () => {
          req.destroy();
          this.emit("error", new ErrorHandler({
            statusCode: 499,
            message: "Request cancelled",
            name: "Request",
            requestOptions: options2
          }));
          reject(new ErrorHandler({
            statusCode: 499,
            message: "Request cancelled",
            name: "Request",
            requestOptions: options2
          }));
        });
      }
      req.setTimeout(options2?.timeout || 0, () => {
        onTimeout();
        req.destroy();
        this.emit("error", new ErrorHandler({
          statusCode: 408,
          message: options2?.timeoutErrorMessage || "Timeout exceeded",
          name: "Request",
          requestOptions: options2
        }));
        reject(new ErrorHandler({
          statusCode: 408,
          message: options2?.timeoutErrorMessage || "Timeout exceeded",
          name: "Request",
          requestOptions: options2
        }));
      });
      if (dataString) {
        req.write(dataString);
      }
      req.end();
    });
  }
};
var engine_default = Core;

// src/services/headersConstructor.ts
var Headers2 = class {
  constructor(headers) {
    this.headers = {};
    if (headers) {
      this.setFromObject(headers);
    }
  }
  toJSON() {
    return this.headers;
  }
  set(key, value) {
    if (!this.headers[key]) {
      this.headers[key] = value;
    }
    return this;
  }
  get(key) {
    return this.headers[key];
  }
  delete(key) {
    delete this.headers[key];
    return this;
  }
  all() {
    return this.headers;
  }
  clear() {
    this.headers = {};
    return this;
  }
  has(key) {
    return this.headers.hasOwnProperty(key);
  }
  setFromObject(headers) {
    this.headers = { ...this.headers, ...headers };
    return this;
  }
  setFromHeaders(headers) {
    this.setFromObject(headers.all());
    return this;
  }
  setUserAgent(userAgent) {
    return this.set("User-Agent", userAgent);
  }
  setContentType(contentType) {
    return this.set("Content-Type", contentType);
  }
  setAccept(accept) {
    return this.set("Accept", accept);
  }
  setAuthorization(authorization) {
    return this.set("Authorization", authorization);
  }
  setBearerToken(token) {
    return this.setAuthorization(`Bearer ${token}`);
  }
  setBasicAuth(username, password) {
    return this.setAuthorization(`Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`);
  }
  setBearerAuth(token) {
    return this.setAuthorization(`Bearer ${token}`);
  }
  setReferer(referer) {
    return this.set("Referer", referer);
  }
  setOrigin(origin) {
    return this.set("Origin", origin);
  }
  setHost(host) {
    return this.set("Host", host);
  }
  setConnection(connection) {
    return this.set("Connection", connection);
  }
  setAcceptEncoding(acceptEncoding) {
    return this.set("Accept-Encoding", acceptEncoding);
  }
  setAcceptLanguage(acceptLanguage) {
    return this.set("Accept-Language", acceptLanguage);
  }
  setResponseType(responseType) {
    return this.set("Response-Type", responseType);
  }
  setCacheControl(cacheControl) {
    return this.set("Cache-Control", cacheControl);
  }
  setCookie(cookie) {
    return this.set("Cookie", cookie);
  }
  setDNT(dnt) {
    return this.set("DNT", dnt);
  }
  setPragma(pragma) {
    return this.set("Pragma", pragma);
  }
};

// src/services/optionsConstructor.ts
var Options = class {
  constructor(options2) {
    this.options = {};
  }
  toJSON() {
    return this.options;
  }
  set(key, value) {
    if (!this.options[key]) {
      this.options[key] = value;
    }
    return this;
  }
  get(key) {
    return this.options[key];
  }
  delete(key) {
    delete this.options[key];
    return this;
  }
  all() {
    return this.options;
  }
  clear() {
    this.options = {};
    return this;
  }
  has(key) {
    return this.options.hasOwnProperty(key);
  }
  setFromObject(options2) {
    this.options = { ...this.options, ...options2 };
    return this;
  }
  setFromOptions(options2) {
    this.setFromObject(options2.all());
    return this;
  }
  setURL(url) {
    return this.set("url", url);
  }
  setBaseURL(baseURL) {
    return this.set("baseURL", baseURL);
  }
  setPath(path) {
    return this.set("path", path);
  }
  setBodySchema(bodySchema) {
    return this.set("bodySchema", bodySchema);
  }
  setAuth(auth) {
    return this.set("auth", auth);
  }
  setProxy(proxy) {
    return this.set("proxy", proxy);
  }
  setMethod(method) {
    return this.set("method", method);
  }
  setHeaders(headers) {
    if (typeof headers !== "object") return this;
    return this.set("headers", headers);
  }
  setBody(body) {
    return this.set("body", body);
  }
  setQuery(query) {
    return this.set("query", query);
  }
  setParams(params) {
    return this.set("params", params);
  }
  setResponseEncoding(responseEncoding) {
    return this.set("responseEncoding", responseEncoding);
  }
  setResponseType(responseType) {
    return this.set("responseType", responseType);
  }
  setMaxRedirects(maxRedirects) {
    return this.set("maxRedirects", maxRedirects);
  }
  setRetryDelay(retryDelay) {
    return this.set("retryDelay", retryDelay);
  }
  setTimeout(timeout) {
    return this.set("timeout", timeout);
  }
};

// src/helpers/checkVersion.ts
async function checkVersion(client, version2, checkUpdates) {
  if (!checkUpdates) return;
  try {
    var { body } = await client.get(
      `https://registry.npmjs.com/-/v1/search?text=nyro`,
      { responseType: "json", defaultMode: true }
    );
    var latestVersion = body.objects[0].package.version;
    if (version2.split(".")[0] !== latestVersion.split(".")[0]) {
      console.log(
        `\r
\r
`,
        `\x1B[95;5;5m
                  =--------                                                                         
                 =----------- ====-                                                                 
                =====--------=======     :::::     :::.                                             
               =======+------=======     ::...:    .::::.:      ::. :..  .:.   .::::                
               ------=**=----=+++++=     ::.:...:  :...:.::    :..: :..::.:: :.......:              
               -------***+---=++++++     ::.:::::: :.:. :.::  :.::  :..::  .:.::   ::.::            
               -------*****--=++++++     ::.:  ::.::.:.  :... :.::  :.:.   :.::     ::.:            
               -------******==*****+     ::.:   ::...::  ::.::.:.   :..:   .:.:     ::.:            
               :::::::**************     ::.:     ::.::   .:..::    :..:    :.::::::.::             
               :::::::+*************     .:::      :::     :..:     :..       :::::::               
                :::::: ***********                        :..:                                      
                          ******                         ::::\x1B[0m`,
        `\r
\r
`,
        `\x1B[31;1;4m You are using an outdated version of\x1B[0m`,
        `\x1B[38;5;4m Nyro.\x1B[0m \r
`,
        `\x1B[31;1;4m Please update to the latest version\x1B[0m`,
        `\x1B[38;5;119m (${latestVersion})\x1B[0m`,
        `\x1B[31;1;4m by running \x1B[0m`,
        `\x1B[38;5;119m ' npm install nyro@latest '\x1B[0m`,
        `\r
\r
`
      );
    }
  } catch (error) {
  }
  ;
}

// src/services/proxyManager.ts
var proxyManager_exports = {};
__export(proxyManager_exports, {
  default: () => proxyManager_default
});
var import_fastgate = __toESM(require("fastgate"));
__reExport(proxyManager_exports, require("fastgate"));
var proxyManager_default = import_fastgate.default;

// src/services/userAgentConstuctor.ts
var chromeWebkitVersions = {
  "1.0": "528",
  "2.0": "530",
  "3.0": "532",
  "4.0": "532.5",
  "4.1": "49",
  "5.0": "533",
  "6.0": "534.3",
  "7.0": "534.7",
  "8.0": "534.1",
  "9.0": "534.13",
  "10.0": "534.16",
  "11.0": "534.24",
  "12.0": "534.3",
  "13.0": "535.1",
  "14.0": "535.2",
  "15.0": "535.2",
  "16.0": "535.7",
  "17.0": "535.11",
  "18.0": "535.19",
  "19.0": "536.5",
  "20.0": "536.1",
  "21.0": "537.1",
  "22.0": "537.4",
  "23.0": "537.11",
  "24.0": "537.17",
  "25.0": "537.22",
  "26.0": "537.31",
  "27.0": "537.36"
};
var androidWebkitVersions = {
  "1.5": "528.5",
  "1.6": "528.5",
  "2.0": "530.17",
  "2.0.1": "530.17",
  "2.1": "530.17",
  "2.2": "533.1",
  "2.3": "?",
  "2.3.3": "533.1",
  "3.0": "534.13",
  "3.1": "534.13",
  "3.2": "534.13",
  "4.0": "534.30",
  "4.0.3": "534.30",
  "4.1": "534.30",
  "4.2": "534.30",
  "4.3": "534.30",
  "4.4": "537.36"
};
var safariWebkitVersions = {
  "1.0": "85",
  "1.0.3": "85.8.5",
  "1.1": "100",
  "1.2": "125",
  "1.3": "312",
  "1.3.1": "312.3",
  "1.3.2": "312.5",
  "1.3.3": "312.6",
  "2.0": "412",
  "2.0.2": "416.11",
  "2.0.4": "419.3",
  "3.0": "522.11",
  "3.0.2": "522.12",
  "3.0.3": "522.12.1",
  "3.0.4": "523.10",
  "3.1": "525.13",
  "3.1.1": "525.20",
  "3.1.2": "525.21",
  "3.2": "525.26",
  "3.2.1": "525.27",
  "3.2.3": "525.28",
  "4.0": "530.17",
  "4.0.1": "530.18",
  "4.0.2": "530.19",
  "4.0.3": "531.9",
  "4.0.4": "531.21.10",
  "4.0.5": "531.22.7",
  "4.1": "533.16",
  "4.1.1": "533.17.8",
  "4.1.2": "533.18.5",
  "4.1.3": "533.19.4",
  "5.0": "533.16",
  "5.0.1": "533.17.8",
  "5.0.2": "533.18.5",
  "5.0.3": "533.19.4",
  "5.0.4": "533.20.27",
  "5.0.5": "533.21.1",
  "5.0.6": "533.22.3",
  "5.1": "534.48.3",
  "5.1.1": "534.51.22",
  "5.1.2": "534.52.7",
  "5.1.3": "534.53.10",
  "5.1.4": "534.54.16",
  "5.1.5": "534.55.3",
  "5.1.6": "534.56.5",
  "5.1.7": "534.57.2",
  "5.1.8": "534.58.2",
  "5.1.9": "534.59.8",
  "5.1.10": "534.59.10",
  "6.0": "536.25",
  "6.0.1": "536.26",
  "6.0.2": "536.26.17",
  "6.0.3": "536.28.10",
  "6.0.4": "536.29.13",
  "6.0.5": "536.30.1",
  "6.1": "537.43.58",
  "6.1.1": "537.73.11",
  "6.1.6": "537.78.2[24]",
  "6.2.8": "537.85.17",
  "7.0": "537.71",
  "7.0.1": "537.73.11",
  "7.0.3": "537.75.14",
  "7.0.4": "537.76.4",
  "7.0.5": "537.77.4",
  "7.0.6": "537.78.2",
  "7.1.8": "537.85.17",
  "8.0": "538.35.8",
  "8.0.6": "600.6.3",
  "8.0.7": "600.7.12",
  "9.0": "601.1.56",
  "9.0.1": "601.2.7",
  "9.0.2": "601.3.9",
  "9.0.3": "601.4.4",
  "9.1": "601.5.17",
  "9.1.1": "601.6.17",
  "9.1.2": "601.7.1",
  "9.1.3": "601.7.8",
  "10.0": "602.1.50",
  "10.0.1": "602.2.14",
  "10.0.2": "602.3.12",
  "10.0.3": "602.4.8",
  "10.1": "603.1.30",
  "10.1.1": "603.2.4",
  "10.1.2": "603.3.8",
  "11.0.0": "604.1.28"
};
function getRandomVersion(versions) {
  var availableVersions = Object.keys(versions);
  var randomIndex = Math.floor(Math.random() * availableVersions.length);
  return versions[availableVersions[randomIndex]];
}
function generateChrome(version2, os2, device) {
  return `Mozilla/5.0 (${os2}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version2 ?? "537.36"} Safari/537.36`;
}
function generateFirefox(version2, os2, device) {
  return `Mozilla/5.0 (${os2}; rv:${version2 ?? "537.36"}) Gecko/20100101 Firefox/${version2 ?? "537.36"}`;
}
function generateSafari(version2, os2, device) {
  return `Mozilla/5.0 (${os2}) AppleWebKit/${version2 ?? "604.1.28"} (KHTML, like Gecko) Version/${version2 ?? "604.1.28"} Safari/${version2 ?? "604.1.28"}`;
}
function generateAndroid(version2, device, buildVersion) {
  return `Mozilla/5.0 (Linux; Android ${version2 ?? "537.36"}; ${device} Build/${buildVersion ?? "537.36"};) AppleWebKit/${version2 ?? "537.36"} (KHTML, like Gecko) Version/4.0 Chrome/${version2 ?? "537.36"} Mobile Safari/${version2 ?? "537.36"}`;
}
function generateEdge(version2, os2, device) {
  return `Mozilla/5.0 (${os2};) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version2} Safari/537.36 Edge/${version2}`;
}
function parseOS(type) {
  type = type.toLocaleLowerCase();
  return type.startsWith("mac") ? "Mac OS" : type.startsWith("windows") || type.startsWith("win") ? "Windows" : type.startsWith("linux") ? "Linux" : type.startsWith("android") ? "Android" : type.startsWith("ios") || type.startsWith("\u0131os") ? "iOS" : "Windows";
}
var UserAgent = class {
  constructor() {
  }
  static getVersion(os2) {
    if (!os2) os2 = this.getOS();
    switch (os2) {
      case "Windows":
        return getRandomVersion(chromeWebkitVersions);
      case "Mac OS":
        return getRandomVersion(safariWebkitVersions);
      case "Linux":
        return getRandomVersion(chromeWebkitVersions);
      case "Android":
        return getRandomVersion(androidWebkitVersions);
      case "iOS":
        return getRandomVersion(safariWebkitVersions);
      default:
        return getRandomVersion(chromeWebkitVersions);
    }
    ;
  }
  static getOS() {
    var OSList = ["Windows", "Mac OS", "Linux", "Android", "iOS"];
    return OSList[Math.floor(Math.random() * OSList.length)];
  }
  static getBrowser() {
    var BrowserList = ["Chrome", "Firefox", "Safari", "Opera", "Edge"];
    return BrowserList[Math.floor(Math.random() * BrowserList.length)];
  }
  static getDevice() {
    var DeviceList = [
      "SM-T210",
      "SM-G900F",
      "SM-G920F",
      "SM-G930F",
      "SM-G950F",
      "SM-G960F",
      "SM-G970F",
      "SM-G973F",
      "SM-G975F",
      "SM-G980F",
      "SM-G985F",
      "SM-G988B",
      "SM-N9005",
      "SM-N910F",
      "SM-N920C",
      "SM-N950F",
      "SM-N960F",
      "SM-N970F",
      "SM-N975F",
      "SM-N980F",
      "SM-N985F",
      "SM-N986B",
      "iPhone",
      "iPad",
      "iPod touch",
      "Nexus 5",
      "Nexus 7",
      "Nexus 10",
      "Nexus 4",
      "Nexus 6",
      "Nexus 9",
      "Nexus 5X",
      "Nexus 6P",
      "Nexus 7 (2013)",
      "Nexus 9 (2014)",
      "Nexus 10 (2012)",
      "Nexus 4 (2012)",
      "Nexus 6 (2014)",
      "Nexus 5X (2015)",
      "Nexus 6P (2015)",
      "Mi 9",
      "Mi 9 SE",
      "Mi 9T",
      "Mi 9T Pro",
      "Mi 10",
      "Mi 10 Pro",
      "Mi 10T",
      "Mi 10T Pro",
      "Mi 11",
      "Mi 11 Lite",
      "Mi 11 Ultra",
      "Redmi Note 8",
      "Redmi Note 8 Pro",
      "Redmi Note 9",
      "Redmi Note 9 Pro",
      "Redmi Note 10",
      "Redmi Note 10 Pro",
      "Redmi Note 11",
      "Redmi Note 11 Pro",
      "Poco F1",
      "Poco F2 Pro",
      "Poco X3",
      "Poco X3 Pro",
      "Poco M3"
    ];
    return DeviceList[Math.floor(Math.random() * DeviceList.length)];
  }
  static generate(options2) {
    var UserAgentOptions = {};
    if (!options2) {
      UserAgentOptions = {
        os: this.getOS(),
        browser: this.getBrowser(),
        device: this.getDevice(),
        version: this.getVersion("Windows")
      };
    } else {
      var defaultBrowserList = ["Chrome", "Firefox", "Opera", "Edge"];
      var OS = parseOS(options2.os || "Windows");
      var browser = OS == "iOS" || OS == "Mac OS" ? "Safari" : defaultBrowserList[Math.floor(Math.random() * defaultBrowserList.length)];
      var version2 = options2.version || this.getVersion(OS || "Windows");
      UserAgentOptions = {
        os: parseOS(options2?.os || "Windows") || this.getOS(),
        browser: options2?.browser || browser,
        device: options2?.device || this.getDevice(),
        version: version2
      };
    }
    ;
    var os2 = UserAgentOptions.os;
    var parsedOS = os2 == "Windows" ? [
      "Windows NT 6.1; Win64; x64",
      "Windows NT 10.0; Win64; x64",
      "Windows NT 6.3; Win64; x64",
      "Windows NT 6.1; WOW64",
      "Windows NT 10.0",
      "Windows NT 5.1"
    ] : os2 == "Mac OS" ? [
      "Macintosh; Intel Mac OS X 10_10_5",
      "Macintosh; Intel Mac OS X 10_12_2",
      "Macintosh; Intel Mac OS X 10_12_3",
      "Macintosh; Intel Mac OS X 10_9_5",
      "Macintosh; Intel Mac OS X 10_12_0",
      "Macintosh; Intel Mac OS X 10_12_1",
      "Macintosh; Intel Mac OS X 10_11_6"
    ] : os2 == "Linux" ? [
      "X11; Ubuntu; Linux x86_64; rv:53.0",
      "X11; Linux x86_64",
      "X11; Linux x86_64; rv:53.0",
      "X11; Linux x86_64; rv:52.0"
    ] : os2 == "Android" ? [
      `Linux; Android 4.2.2; ${UserAgentOptions.device}`,
      `Linux; Android 4.4; ${UserAgentOptions.device}`,
      `Linux; Android 5.0; ${UserAgentOptions.device}`,
      `Linux; Android 5.1; ${UserAgentOptions.device}`,
      `Linux; Android 6.0; ${UserAgentOptions.device}`,
      `Linux; Android 7.0; ${UserAgentOptions.device}`,
      `Linux; Android 7.1; ${UserAgentOptions.device}`,
      `Linux; Android 8.0; ${UserAgentOptions.device}`,
      `Linux; Android 9.0; ${UserAgentOptions.device}`,
      `Linux; Android 10.0; ${UserAgentOptions.device}`,
      `Linux; Android 11.0; ${UserAgentOptions.device}`,
      `Linux; Android 12.0; ${UserAgentOptions.device}`
    ] : os2 == "iOS" ? [
      `iPad; CPU OS 10_3_2 like Mac OS X`,
      `iPhone; CPU OS 10_3_2 like Mac OS X`,
      `iPod touch; CPU OS 10_3_2 like Mac OS X`,
      `iPad; CPU OS 11_0 like Mac OS X`,
      `iPhone; CPU OS 11_0 like Mac OS X`,
      `iPod touch; CPU OS 11_0 like Mac OS X`,
      `iPad; CPU OS 12_0 like Mac OS X`,
      `iPhone; CPU OS 12_0 like Mac OS X`,
      `iPod touch; CPU OS 12_0 like Mac OS X`,
      `iPad; CPU OS 13_0 like Mac OS X`,
      `iPhone; CPU OS 13_0 like Mac OS X`
    ] : [
      "Windows NT 6.1; Win64; x64",
      "Windows NT 10.0; Win64; x64",
      "Windows NT 6.3; Win64; x64",
      "Windows NT 6.1; WOW64",
      "Windows NT 10.0",
      "Windows NT 5.1",
      "Macintosh; Intel Mac OS X 10_10_5",
      "Macintosh; Intel Mac OS X 10_12_2",
      "Macintosh; Intel Mac OS X 10_12_3",
      "Macintosh; Intel Mac OS X 10_9_5",
      "Macintosh; Intel Mac OS X 10_12_0",
      "Macintosh; Intel Mac OS X 10_12_1",
      "Macintosh; Intel Mac OS X 10_11_6",
      "X11; Ubuntu; Linux x86_64; rv:53.0",
      "X11; Linux x86_64",
      "X11; Linux x86_64; rv:53.0",
      "X11; Linux x86_64; rv:52.0",
      `Linux; Android 4.2.2; ${UserAgentOptions.device}`,
      `Linux; Android 4.4; ${UserAgentOptions.device}`,
      `Linux; Android 5.0; ${UserAgentOptions.device}`,
      `Linux; Android 5.1; ${UserAgentOptions.device}`,
      `Linux; Android 6.0; ${UserAgentOptions.device}`,
      `Linux; Android 7.0; ${UserAgentOptions.device}`,
      `Linux; Android 7.1; ${UserAgentOptions.device}`,
      `Linux; Android 8.0; ${UserAgentOptions.device}`,
      `Linux; Android 9.0; ${UserAgentOptions.device}`,
      `Linux; Android 10.0; ${UserAgentOptions.device}`,
      `Linux; Android 11.0; ${UserAgentOptions.device}`,
      `Linux; Android 12.0; ${UserAgentOptions.device}`,
      `iPad; CPU OS 10_3_2 like Mac OS X`,
      `iPhone; CPU OS 10_3_2 like Mac OS X`,
      `iPod touch; CPU OS 10_3_2 like Mac OS X`,
      `iPad; CPU OS 11_0 like Mac OS X`,
      `iPhone; CPU OS 11_0 like Mac OS X`,
      `iPod touch; CPU OS 11_0 like Mac OS X`,
      `iPad; CPU OS 12_0 like Mac OS X`,
      `iPhone; CPU OS 12_0 like Mac OS X`,
      `iPod touch; CPU OS 12_0 like Mac OS X`,
      `iPad; CPU OS 13_0 like Mac OS X`,
      `iPhone; CPU OS 13_0 like Mac OS X`
    ];
    var getOS = parsedOS[Math.floor(Math.random() * parsedOS.length)];
    var UserAgent2 = "";
    if (UserAgentOptions.browser == "Chrome") {
      UserAgent2 = generateChrome(UserAgentOptions.version, getOS, UserAgentOptions.device);
    } else if (UserAgentOptions.browser == "Firefox") {
      UserAgent2 = generateFirefox(UserAgentOptions.version, getOS, UserAgentOptions.device);
    } else if (UserAgentOptions.browser == "Safari") {
      UserAgent2 = generateSafari(UserAgentOptions.version, getOS, UserAgentOptions.device);
    } else if (UserAgentOptions.os == "Android") {
      UserAgent2 = generateAndroid(UserAgentOptions.version, getOS, UserAgentOptions.version);
    } else if (UserAgentOptions.browser == "Edge") {
      UserAgent2 = generateEdge(UserAgentOptions.version, getOS, UserAgentOptions.device);
    } else if (UserAgentOptions.browser == "Opera") {
      UserAgent2 = generateChrome(UserAgentOptions.version, getOS, UserAgentOptions.device);
    }
    ;
    return UserAgent2;
  }
};

// src/index.ts
var Nyro = new engine_default();
var {
  version,
  pkg
} = engine_default;
var {
  get,
  patch,
  post,
  put,
  delete: _delete,
  head,
  options,
  connect,
  trace,
  extend,
  create,
  request: request4,
  download,
  queue,
  pagination,
  use,
  on,
  off,
  emit,
  once,
  eventNames,
  removeListener,
  removeAllListeners,
  listenerCount,
  listeners,
  addListener,
  getMaxListeners,
  rawListeners,
  setMaxListeners,
  prependListener,
  prependOnceListener
} = Nyro;
var nyro = Object.assign(async (options2) => {
  return Nyro.request({ ...Nyro.baseRequestOptions, ...options2 });
}, Nyro);
nyro.get = get;
nyro.post = post;
nyro.put = put;
nyro.patch = patch;
nyro.delete = _delete;
nyro.head = head;
nyro.options = options;
nyro.connect = connect;
nyro.trace = trace;
nyro.extend = extend;
nyro.request = request4;
nyro.create = create;
nyro.download = download;
nyro.queue = queue;
nyro.pagination = pagination;
nyro.use = use;
nyro.on = on;
nyro.off = off;
nyro.once = once;
nyro.emit = emit;
nyro.eventNames = eventNames;
nyro.removeListener = removeListener;
nyro.removeAllListeners = removeAllListeners;
nyro.listenerCount = listenerCount;
nyro.listeners = listeners;
nyro.addListener = addListener;
nyro.getMaxListeners = getMaxListeners;
nyro.rawListeners = rawListeners;
nyro.setMaxListeners = setMaxListeners;
nyro.prependListener = prependListener;
nyro.prependOnceListener = prependOnceListener;
engine_default.version = version;
engine_default.pkg = pkg;
checkVersion(nyro, version, true);
var src_default = nyro;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AndroidVersions,
  Anonymity,
  ChromeVersions,
  ContentType,
  Country,
  Format,
  Headers,
  Method,
  Nyro,
  NyroError,
  OmitedProxyAPIResponse,
  Options,
  Plugin,
  Protocol,
  Proxy,
  ProxyAPIOptions,
  ProxyAPIResponse,
  ProxyFetchOptions,
  ProxyFilterOptions,
  ProxyFormat,
  ProxyObject,
  ResponseEncoding,
  ResponseType,
  SafariVersions,
  StatusCode,
  UserAgent,
  connect,
  delete: null,
  extend,
  generateAndroid,
  generateChrome,
  generateEdge,
  generateFirefox,
  generateSafari,
  get,
  getRandomVersion,
  head,
  isNyroError,
  options,
  patch,
  post,
  put,
  request,
  trace,
  version
});
/* Nyro */
//# sourceMappingURL=index.js.map