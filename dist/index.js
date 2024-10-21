'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var http = require('http');
var https = require('https');
var zlib = require('zlib');
var url = require('url');
var os = require('os');
var httpProxyAgent = require('http-proxy-agent');
var httpsProxyAgent = require('https-proxy-agent');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var http__namespace = /*#__PURE__*/_interopNamespace(http);
var https__namespace = /*#__PURE__*/_interopNamespace(https);
var zlib__namespace = /*#__PURE__*/_interopNamespace(zlib);
var os__default = /*#__PURE__*/_interopDefault(os);

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
  const platform = os__default.default.platform();
  const arch = os__default.default.arch();
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
  const fullUrl = new url.URL(combinedURL);
  if (options.path) {
    fullUrl.pathname += options.path;
  }
  if (options.params) {
    const params = new url.URLSearchParams(options.params);
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
    const query = new url.URLSearchParams();
    for (const key in options.query) {
      if (Object.prototype.hasOwnProperty.call(options.query, key)) {
        query.append(key, String(options.query[key]));
      }
    }
    fullUrl.search += (fullUrl.search ? "&" : "") + query.toString();
  }
  const isHttps = fullUrl.protocol === "https:";
  const lib = isHttps ? https__namespace : http__namespace;
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
    requestOptions.agent = isHttps ? new httpsProxyAgent.HttpsProxyAgent(`http://${proxyAuth ? `${proxyAuth}@` : ""}${proxyUrl}`) : new httpProxyAgent.HttpProxyAgent(`http://${proxyAuth ? `${proxyAuth}@` : ""}${proxyUrl}`);
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
            rawData = zlib__namespace.gunzipSync(rawData);
          } else if (encoding === "deflate") {
            rawData = zlib__namespace.inflateSync(rawData);
          } else if (encoding === "br") {
            rawData = zlib__namespace.brotliDecompressSync(rawData);
          }
        }
        const validateStatus = options.validateStatus || ((status) => status >= 200 && status < 300);
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && currentRedirects < (options.maxRedirects || 5)) {
          const newUrl = new url.URL(res.headers.location, fullUrl);
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

// src/helpers/userAgentGenerator.ts
var userAgentList = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/603.2.5 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.5",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/58.0.3029.110 Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0",
  "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 OPR/45.0.2552.888",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (X11; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.2.5 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.5",
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
  "Mozilla/5.0 (iPad; CPU OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.0 Mobile/14F89 Safari/602.1",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0",
  "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:54.0) Gecko/20100101 Firefox/54.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36 OPR/45.0.2552.812",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0",
  "Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0; Trident/5.0)",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; Trident/5.0)",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:54.0) Gecko/20100101 Firefox/54.0",
  "Mozilla/5.0 (iPad; CPU OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
  "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko",
  "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko"
];
function userAgentGenerator() {
  return userAgentList[Math.floor(Math.random() * userAgentList.length)];
}
__name(userAgentGenerator, "userAgentGenerator");

// src/index.ts
var src_default = engine_default;
/* Package */

exports.ContentType = ContentType;
exports.Method = Method;
exports.ResponseEncoding = ResponseEncoding;
exports.ResponseType = ResponseType;
exports.StatusCode = StatusCode;
exports.default = src_default;
exports.userAgentGenerator = userAgentGenerator;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map