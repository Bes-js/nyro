import * as http from 'http';
import { PassThrough } from 'stream';
import { EventEmitter as EventEmitter$1 } from 'events';
export { Anonymity, Country, Format, OmitedProxyAPIResponse, Protocol, default as Proxy, ProxyAPIOptions, ProxyAPIResponse, ProxyFetchOptions, ProxyFilterOptions, ProxyFormat, ProxyObject } from 'fastgate';

/**
 * Interface representing the options for handling errors.
 *
 * @interface ErrorHandlerOptions
 *
 * @property {string} message - The error message to be displayed.
 * @property {any} [requestOptions] - Optional request options associated with the error.
 * @property {number} statusCode - The HTTP status code associated with the error.
 * @property {string} name - The name of the error.
 * @property {Error} [error] - Optional original error object.
 */
interface NyroErrorInterface {
    message: string;
    requestOptions?: any;
    statusCode: number;
    name: string;
    error?: Error;
}
/**
* Interface representing the error response object.
*
* @interface NyroErrorResponse
*
* @property {string} message - The error message to be displayed.
* @property {any} [requestOptions] - Optional request options associated with the error.
* @property {string} [statusText] - The status text associated with the error.
* @property {number} statusCode - The HTTP status code associated with the error.
* @property {string} name - The name of the error.
* @property {Error} [error] - Optional original error object.
*/
interface NyroErrorResponse {
    message: string;
    requestOptions?: any;
    statusText?: string;
    statusCode: number;
    name: string;
    error?: Error;
}
declare function isNyroError(error: any): error is ErrorHandler;
declare class ErrorHandler extends Error {
    requestOptions?: any;
    statusText?: string;
    statusCode: number;
    constructor(errorHandlerOptions: NyroErrorInterface);
}

interface Plugin {
    name: string;
    onRequest?: <B>(options: RequestOptions<B>) => RequestOptions<B> | void;
    onResponse?: <T, B>(response: HttpResponse<T, B>) => HttpResponse<T, B> | void;
    onError?: (error: ErrorHandler) => ErrorHandler | void;
}
declare class PluginManager {
    private plugins;
    use(plugin: Plugin, notification?: boolean): void;
    applyOnRequest<B>(options: RequestOptions<B>): RequestOptions<B>;
    applyOnResponse<T, B>(response: HttpResponse<T, B>): HttpResponse<T, B>;
    applyOnError(error: ErrorHandler): ErrorHandler;
}

/**
* @file /Users/berkanx/Desktop/Projects/requester/src/helpers/types.ts
* @description This file contains various TypeScript enums used for HTTP request and response handling.
*/
interface Headers$1 {
    'User-Agent'?: string;
    'Response-Type'?: string;
    'Content-Encoding'?: string;
    'Content-Length'?: string;
    'Content-Range'?: string;
    'Content-Type'?: string;
    'Authorization'?: string;
    'Accept'?: string;
    'Accept-Encoding'?: string;
    'Accept-Language'?: string;
    'Cache-Control'?: string;
    'Connection'?: string;
    'Cookie'?: string;
    'DNT'?: string;
    'Host'?: string;
    'Origin'?: string;
    'Pragma'?: string;
    'Referer'?: string;
    'TE'?: string;
    'Upgrade-Insecure-Requests'?: string;
    'Via'?: string;
    'Warning'?: string;
    'X-Requested-With'?: string;
    'X-Forwarded-For'?: string;
    'X-Forwarded-Host'?: string;
    'X-Forwarded-Proto'?: string;
    'Front-End-Https'?: string;
    'X-Http-Method-Override'?: string;
    'X-ATT-DeviceId'?: string;
    'X-Wap-Profile'?: string;
    'Proxy-Connection'?: string;
    'X-UIDH'?: string;
    'X-Csrf-Token'?: string;
    'X-Request-ID'?: string;
    'X-Correlation-ID'?: string;
    'X-DeviceUserAgent'?: string;
    'X-Device-ID'?: string;
    'X-Device-OS'?: string;
    'X-Device-OS-Version'?: string;
    'X-Device-Model'?: string;
    'X-Device-Brand'?: string;
    'X-Device-Name'?: string;
    'X-Device-Carrier'?: string;
    'X-Device-Country'?: string;
    'X-Device-Locale'?: string;
    'X-Device-App'?: string;
    'X-Device-App-Version'?: string;
    'X-Device-App-Name'?: string;
    'X-Device-App-Installer'?: string;
    'X-Device-App-Install-Time'?: string;
    'X-Device-App-Update-Time'?: string;
    'X-Device-App-Store'?: string;
    'X-Device-App-Store-Version'?: string;
    'X-Device-App-Store-Name'?: string;
}
type UserAgentDevice = ('SM-T210' | 'SM-G900F' | 'SM-G920F' | 'SM-G930F' | 'SM-G950F' | 'SM-G960F' | 'SM-G970F' | 'SM-G973F' | 'SM-G975F' | 'SM-G980F' | 'SM-G985F' | 'SM-G988B' | 'SM-N9005' | 'SM-N910F' | 'SM-N920C' | 'SM-N950F' | 'SM-N960F' | 'SM-N970F' | 'SM-N975F' | 'SM-N980F' | 'SM-N985F' | 'SM-N986B' | 'iPhone' | 'iPad' | 'iPod touch' | 'Nexus 5' | 'Nexus 7' | 'Nexus 10' | 'Nexus 4' | 'Nexus 6' | 'Nexus 9' | 'Nexus 5X' | 'Nexus 6P' | 'Nexus 7 (2013)' | 'Nexus 9 (2014)' | 'Nexus 10 (2012)' | 'Nexus 4 (2012)' | 'Nexus 6 (2014)' | 'Nexus 5X (2015)' | 'Nexus 6P (2015)' | 'Mi 9' | 'Mi 9 SE' | 'Mi 9T' | 'Mi 9T Pro' | 'Mi 10' | 'Mi 10 Pro' | 'Mi 10T' | 'Mi 10T Pro' | 'Mi 11' | 'Mi 11 Lite' | 'Mi 11 Ultra' | 'Redmi Note 8' | 'Redmi Note 8 Pro' | 'Redmi Note 9' | 'Redmi Note 9 Pro' | 'Redmi Note 10' | 'Redmi Note 10 Pro' | 'Redmi Note 11' | 'Redmi Note 11 Pro' | 'Poco F1' | 'Poco F2 Pro' | 'Poco X3' | 'Poco X3 Pro' | 'Poco M3' | 'Poco M3 Pro' & Record<string, string>);
type UserAgentOS = ('Windows' | 'Mac OS' | 'Linux' | 'Android' | 'iOS' & string);
type UserAgentBrowser = ('Chrome' | 'Firefox' | 'Safari' | 'Opera' | 'Edge' | 'IE' & Record<string, string>);
interface GenerateUserAgentOptions {
    browser?: (UserAgentBrowser & string);
    version?: string;
    os?: (UserAgentOS & string);
    device?: (UserAgentDevice);
}
/**
 * @enum {string} Method
 * @description Enum representing HTTP methods.
 * @property {string} Get - HTTP GET method.
 * @property {string} Post - HTTP POST method.
 * @property {string} Put - HTTP PUT method.
 * @property {string} Patch - HTTP PATCH method.
 * @property {string} Delete - HTTP DELETE method.
 * @property {string} Head - HTTP HEAD method.
 * @property {string} Options - HTTP OPTIONS method.
 * @property {string} Connect - HTTP CONNECT method.
 * @property {string} Trace - HTTP TRACE method.
 */
declare enum Method {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Patch = "PATCH",
    Delete = "DELETE",
    Head = "HEAD",
    Options = "OPTIONS",
    Connect = "CONNECT",
    Trace = "TRACE"
}
/**
* @enum {string} ResponseEncoding
* @description Enum representing possible response encodings.
* @property {string} Utf8 - UTF-8 encoding.
* @property {string} Ascii - ASCII encoding.
* @property {string} Base64 - Base64 encoding.
* @property {string} Hex - Hexadecimal encoding.
* @property {string} Latin1 - Latin-1 encoding.
* @property {string} Binary - Binary encoding.
* @property {string} Utf16Le - UTF-16 Little Endian encoding.
* @property {string} Utf16Le2 - UTF-16 Little Endian encoding (alternative).
* @property {string} Ucs2 - UCS-2 encoding.
* @property {string} Ucs22 - UCS-2 encoding (alternative).
* @property {string} Base64Url - Base64 URL encoding.
*/
declare enum ResponseEncoding {
    Utf8 = "utf8",
    Ascii = "ascii",
    Base64 = "base64",
    Hex = "hex",
    Latin1 = "latin1",
    Binary = "binary",
    Utf16Le = "utf16le",
    Utf16Le2 = "utf-16le",
    Ucs2 = "ucs2",
    Ucs22 = "ucs-2",
    Base64Url = "base64url"
}
/**
 * @enum {string} ContentType
 * @description Enum representing possible content types for HTTP requests.
 * @property {string} Json - application/json content type.
 * @property {string} Xml - application/xml content type.
 * @property {string} UrlEncoded - application/x-www-form-urlencoded content type.
 * @property {string} FormData - multipart/form-data content type.
 * @property {string} Text - text/plain content type.
 * @property {string} OctetStream - application/octet-stream content type.
 * @property {string} Default - Default content type (application/json).
 */
declare enum ContentType {
    Json = "application/json",
    Xml = "application/xml",
    UrlEncoded = "application/x-www-form-urlencoded",
    FormData = "multipart/form-data",
    Text = "text/plain",
    OctetStream = "application/octet-stream",
    Default = "application/json"
}
/**
* @enum {string} ResponseType
* @description Enum representing possible response types.
* @property {string} Json - JSON response type.
* @property {string} Text - Text response type.
* @property {string} Blob - Blob response type.
* @property {string} Stream - Stream response type.
* @property {string} ArrayBuffer - ArrayBuffer response type.
* @property {string} Document - Document response type.
* @property {string} Default - Default response type (json).
*/
declare enum ResponseType {
    Json = "json",
    Text = "text",
    Blob = "blob",
    Stream = "stream",
    ArrayBuffer = "arrayBuffer",
    Document = "document",
    Default = "json"
}
/**
* @enum {number} StatusCode
* @description Enum representing HTTP status codes.
* @property {number} Continue - 100 Continue.
* @property {number} SwitchingProtocols - 101 Switching Protocols.
* @property {number} Processing - 102 Processing.
* @property {number} EarlyHints - 103 Early Hints.
* @property {number} Ok - 200 OK.
* @property {number} Created - 201 Created.
* @property {number} Accepted - 202 Accepted.
* @property {number} NonAuthoritativeInformation - 203 Non-Authoritative Information.
* @property {number} NoContent - 204 No Content.
* @property {number} ResetContent - 205 Reset Content.
* @property {number} PartialContent - 206 Partial Content.
* @property {number} MultiStatus - 207 Multi-Status.
* @property {number} AlreadyReported - 208 Already Reported.
* @property {number} ImUsed - 226 IM Used.
* @property {number} MultipleChoices - 300 Multiple Choices.
* @property {number} MovedPermanently - 301 Moved Permanently.
* @property {number} Found - 302 Found.
* @property {number} SeeOther - 303 See Other.
* @property {number} NotModified - 304 Not Modified.
* @property {number} UseProxy - 305 Use Proxy.
* @property {number} Unused - 306 Unused.
* @property {number} TemporaryRedirect - 307 Temporary Redirect.
* @property {number} PermanentRedirect - 308 Permanent Redirect.
* @property {number} BadRequest - 400 Bad Request.
* @property {number} Unauthorized - 401 Unauthorized.
* @property {number} PaymentRequired - 402 Payment Required.
* @property {number} Forbidden - 403 Forbidden.
* @property {number} NotFound - 404 Not Found.
* @property {number} MethodNotAllowed - 405 Method Not Allowed.
* @property {number} NotAcceptable - 406 Not Acceptable.
* @property {number} ProxyAuthenticationRequired - 407 Proxy Authentication Required.
* @property {number} RequestTimeout - 408 Request Timeout.
* @property {number} Conflict - 409 Conflict.
* @property {number} Gone - 410 Gone.
* @property {number} LengthRequired - 411 Length Required.
* @property {number} PreconditionFailed - 412 Precondition Failed.
* @property {number} PayloadTooLarge - 413 Payload Too Large.
* @property {number} UriTooLong - 414 URI Too Long.
* @property {number} UnsupportedMediaType - 415 Unsupported Media Type.
* @property {number} RangeNotSatisfiable - 416 Range Not Satisfiable.
* @property {number} ExpectationFailed - 417 Expectation Failed.
* @property {number} ImATeapot - 418 I'm a teapot.
* @property {number} MisdirectedRequest - 421 Misdirected Request.
* @property {number} UnprocessableEntity - 422 Unprocessable Entity.
* @property {number} Locked - 423 Locked.
* @property {number} FailedDependency - 424 Failed Dependency.
* @property {number} TooEarly - 425 Too Early.
* @property {number} UpgradeRequired - 426 Upgrade Required.
* @property {number} PreconditionRequired - 428 Precondition Required.
* @property {number} TooManyRequests - 429 Too Many Requests.
* @property {number} RequestHeaderFieldsTooLarge - 431 Request Header Fields Too Large.
* @property {number} UnavailableForLegalReasons - 451 Unavailable For Legal Reasons.
* @property {number} InternalServerError - 500 Internal Server Error.
* @property {number} NotImplemented - 501 Not Implemented.
* @property {number} BadGateway - 502 Bad Gateway.
* @property {number} ServiceUnavailable - 503 Service Unavailable.
* @property {number} GatewayTimeout - 504 Gateway Timeout.
* @property {number} HttpVersionNotSupported - 505 HTTP Version Not Supported.
* @property {number} VariantAlsoNegotiates - 506 Variant Also Negotiates.
* @property {number} InsufficientStorage - 507 Insufficient Storage.
* @property {number} LoopDetected - 508 Loop Detected.
* @property {number} NotExtended - 510 Not Extended.
* @property {number} NetworkAuthenticationRequired - 511 Network Authentication Required.
*/
declare enum StatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,
    EarlyHints = 103,
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultiStatus = 207,
    AlreadyReported = 208,
    ImUsed = 226,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    Unused = 306,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    TooManyRedirects = 310,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    UriTooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeapot = 418,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    TooEarly = 425,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    UnavailableForLegalReasons = 451,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511
}

interface ProxyOptions {
    host: string;
    port: number;
    auth?: {
        username: string;
        password: string;
    };
    protocol?: ('http' | 'https' | 'socks' | 'socks4' | 'socks5' | 'socks4a' | 'socks5h' & string);
}
interface AuthOptions {
    username: string;
    password: string;
}
interface PaginationOptions {
    pageParam: string;
    limitParam: string;
    maxPages?: number;
}
interface QueueOptions {
    delay?: number;
}
type InferBodySchema<T> = T extends Record<string, infer U> ? {
    [K in keyof T]: T[K] extends NumberConstructor ? number : T[K] extends StringConstructor ? string : any;
} : any;
interface RequestOptions<B = any> {
    requestId?: string;
    method?: ('GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'connect' | 'trace' & string);
    port?: number;
    url?: string;
    path?: string;
    headers?: (Headers$1 & Record<string, string>);
    body?: any;
    timeout?: number;
    params?: Record<string, string>;
    baseURL?: string;
    query?: Record<string, string | number | boolean>;
    responseType?: ('json' | 'text' | 'blob' | 'stream' | 'arrayBuffer' | 'document' & string);
    responseEncoding?: BufferEncoding;
    timeoutErrorMessage?: string;
    onTimeout?: () => void;
    isStream?: boolean;
    useHttp2?: boolean;
    validateStatus?: (status: number) => boolean;
    decompress?: boolean;
    proxy?: ProxyOptions;
    maxRedirects?: number;
    auth?: AuthOptions;
    maxBodyLength?: number;
    maxContentLength?: number;
    maxRate?: number;
    signal?: AbortSignal;
    bodySchema?: B;
    cache?: boolean;
    cacheTTL?: number;
    retries?: number;
    retryDelay?: number;
    onRetry?: (req: http.RequestOptions, error: Error) => boolean;
    onDownloadProgress?: (progress: {
        percent: number;
        transferredBytes: number;
        totalBytes: number;
    }) => void;
    onRequest?: (options: RequestOptions<B>) => RequestOptions<B> | void;
    onResponse?: (response: HttpResponse<any, BodyFromSchema<B, RequestOptions>>) => HttpResponse<any, BodyFromSchema<B, RequestOptions>> | void;
    onChunk?: (chunk: Buffer) => Buffer | void;
    onRedirect?: (response: http.IncomingMessage) => void;
    sslOptions?: {
        key?: Buffer;
        cert?: Buffer;
        ca?: Buffer;
        rejectUnauthorized?: boolean;
        secureProtocol?: ('SSLv2_method' | 'SSLv3_method' | 'TLSv1_method' | 'TLSv1_1_method' | 'TLSv1_2_method' | 'TLSv1_3_method' & string);
        ciphers?: string;
        passphrase?: string;
    };
    defaultMode?: boolean;
}
interface RequestInfo {
    requestId: string;
    method?: string;
    url?: string;
    fullUrl: string;
    headers: (Headers$1 & Record<string, string>);
    body?: BodyFromSchema<any, RequestOptions>;
    httpVersion?: string;
    startTimestamp: number;
    timeout?: number;
    contentLength?: number;
}
type BodyFromSchema<B, Options> = Options extends {
    responseType: 'stream';
} | {
    isStream: true;
} ? PassThrough : B extends typeof Number ? number : B extends typeof String ? string : B extends Record<string, unknown> ? {
    [K in keyof B]: B[K] extends typeof Number ? number : B[K] extends typeof String ? string : B[K] extends typeof Array ? any[] : B[K];
} : B extends ArrayConstructor ? any[] : B;
interface HttpResponse<T, B = any> {
    requestId: string;
    body: (BodyFromSchema<B, RequestOptions>);
    statusCode: number;
    statusText: string;
    headers: (Headers$1 & Record<string, string | string[]>);
    config: RequestOptions<B>;
    request: http.ClientRequest;
    requestInfo: RequestInfo;
    response: http.IncomingMessage;
    timestamp: {
        startTimestamp: number;
        endTimestamp: number;
    };
    responseTime: number;
    responseSize: number;
    serverIp?: string;
    connectionReused: boolean;
    isStream?: boolean;
    isCached?: boolean;
}
type OmitedCreate = Omit<Core, 'create'>;
type OmitedExtend = Omit<Core, 'create'>;
interface Events {
    ['beforeRequest']: (requestOptions: RequestOptions<any>) => void;
    ['afterResponse']: (res: HttpResponse<any, any>) => void;
    ['error']: (error: ErrorHandler) => void;
}
declare class Core extends EventEmitter$1 {
    baseRequestOptions: RequestOptions;
    pluginManager: PluginManager;
    constructor(baseRequestOptions?: RequestOptions);
    use(plugin: Plugin): void;
    on<K extends keyof Events>(event: K, listener: Events[K]): this;
    once<K extends keyof Events>(event: K, listener: Events[K]): this;
    off<K extends keyof Events>(event: K, listener: Events[K]): this;
    emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): boolean;
    /**
     * The version of the Nyro library.
     */
    static version: string;
    /**
     * The package.json file for the Nyro library.
     */
    static pkg: {
        name: string;
        version: string;
        main: string;
        types: string;
        typings: string;
        module: string;
        description: string;
        scripts: {
            test: string;
            build: string;
        };
        keywords: string[];
        author: {
            name: string;
            url: string;
        };
        homepage: string;
        repository: {
            type: string;
            url: string;
        };
        bugs: {
            url: string;
        };
        funding: {
            type: string;
            url: string;
        };
        license: string;
        devDependencies: {
            "ts-node": string;
            tsup: string;
        };
        dependencies: {
            fastgate: string;
            http: string;
            "http-proxy-agent": string;
            "http2-wrapper": string;
            https: string;
            "https-proxy-agent": string;
            "socks-proxy-agent": string;
        };
    };
    /**
     * @param url
     * @returns this
     * @example Nyro.setURL('https://jsonplaceholder.typicode.com/posts');
     * @description This function sets the URL for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setURL(url: string): this;
    /**
     * @param baseURL
     * @returns this
     * @example Nyro.setBaseURL('https://jsonplaceholder.typicode.com');
     * @description This function sets the base URL for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setBaseURL(baseURL: string): this;
    /**
     * @param path
     * @returns this
     * @example Nyro.setPath('/posts');
     * @description This function sets the path for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setPath(path: string): this;
    /**
     * @param bodySchema
     * @returns this
     * @example Nyro.setBodySchema({ title: String, body: String });
     * @description This function sets the body schema for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setBodySchema(bodySchema: any): this;
    /**
     * @param auth
     * @returns this
     * @example Nyro.setAuth({ username: 'user', password: 'pass' });
     * @description This function sets the authentication credentials for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setAuth(auth: AuthOptions): this;
    /**
     * @param proxy
     * @returns this
     * @example Nyro.setProxy({ host: 'localhost', port: 8080, protocol: 'http' });
     * @description This function sets the proxy for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setProxy(proxy: ProxyOptions): this;
    /**
     * @param method
     * @returns this
     * @example Nyro.setMethod('GET');
     * @description This function sets the method for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'): this;
    /**
     * @param headers
     * @returns this
     * @example Nyro.setHeaders({ 'Content-Type': 'application/json' });
     * @description This function sets the headers for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setHeaders(headers: (Headers$1 & Record<string, string>)): this;
    /**
     * @param params
     * @returns this
     * @example Nyro.setParams({ id: '1' });
     * @description This function sets the query parameters for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setParams(params: Record<string, string>): this;
    /**
     * @param query
     * @returns this
     * @example Nyro.setQuery({ id: '1' });
     * @description This function sets the query parameters for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setQuery(query: Record<string, string | number | boolean>): this;
    /**
     * @param body
     * @returns this
     * @example Nyro.setBody({ title: 'foo', body: 'bar', userId: 1 });
     * @description This function sets the body for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setBody(body: any): this;
    /**
     * @param timeout
     * @returns this
     * @example Nyro.setTimeout(5000);
     * @description This function sets the timeout for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setTimeout(timeout: number): this;
    /**
     * @param retryOn
     * @returns this
     * @example Nyro.setRetryOn((req, error) => error.code === 'ETIMEDOUT');
     * @description This function sets the retry condition for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setRetryOn(retryOn: (req: http.RequestOptions, error: Error) => boolean): this;
    /**
     * @param retries
     * @returns this
     * @example Nyro.setRetries(3);
     * @description This function sets the number of retries for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setRetries(retries: number): this;
    /**
     * @param validateStatus
     * @returns this
     * @example Nyro.setValidateStatus((status) => status >= 200 && status < 300);
     * @description This function sets the status validation for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setValidateStatus(validateStatus: (status: number) => boolean): this;
    /**
     * @param maxBodyLength
     * @returns this
     * @example Nyro.setMaxBodyLength(1000);
     * @description This function sets the maximum body length for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setMaxBodyLength(maxBodyLength: number): this;
    /**
     * @param maxContentLength
     * @returns this
     * @example Nyro.setMaxContentLength(1000);
     * @description This function sets the maximum content length for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setMaxContentLength(maxContentLength: number): this;
    /**
     * @param maxRate
     * @returns this
     * @example Nyro.setMaxRate(1000);
     * @description This function sets the maximum rate for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setMaxRate(maxRate: number): this;
    /**
     * @param signal
     * @returns this
     * @example Nyro.setSignal(signal);
     * @description This function sets the signal for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setSignal(signal: AbortSignal): this;
    /**
     * @param onDownloadProgress
     * @returns this
     * @example Nyro.setOnDownloadProgress((progress) => console.log(progress));
     * @description This function sets the download progress for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setOnDownloadProgress(onDownloadProgress: (progress: {
        percent: number;
        transferredBytes: number;
        totalBytes: number;
    }) => void): this;
    /**
     * @param timeoutErrorMessage
     * @returns this
     * @example Nyro.setTimeoutErrorMessage('Request timed out');
     * @description This function sets the timeout error message for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setTimeoutErrorMessage(timeoutErrorMessage: string): this;
    /**
     * @param responseType
     * @returns this
     * @example Nyro.setResponseType('json');
     * @description This function sets the response type for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setResponseType(responseType: ('json' | 'text' | 'blob' | 'stream' | 'arrayBuffer' | 'document' & string)): this;
    /**
     * @param responseEncoding
     * @returns this
     * @example Nyro.setResponseEncoding('utf8');
     * @description This function sets the response encoding for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setResponseEncoding(responseEncoding: BufferEncoding): this;
    /**
     * @param maxRedirects
     * @returns this
     * @example Nyro.setMaxRedirects(3);
     * @description This function sets the maximum number of redirects for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setMaxRedirects(maxRedirects: number): this;
    /**
     * @param retryDelay
     * @returns this
     * @example Nyro.setRetryDelay(1000);
     * @description This function sets the retry delay for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setRetryDelay(retryDelay: number): this;
    /**
     * @param decompress
     * @returns this
     * @example Nyro.setDecompress(true);
     * @description This function sets the decompress option for the request.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
     */
    setDecompress(decompress: boolean): this;
    /**
     * Sends a GET request to the specified URL.
     * @param url - The URL to send the request to.
     * @param options - The request options.
     * @returns A promise that resolves with the HTTP response.
     * @example Nyro.get('https://jsonplaceholder.typicode.com/posts');
     * @description This function sends a GET request to the specified URL and returns a promise that resolves with the HTTP response.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET|MDN web docs}
     */
    get<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
    /**
     * Sends a POST request to the specified URL.
     * @param url - The URL to send the request to.
     * @param options - The request options.
     * @returns A promise that resolves with the HTTP response.
     * @example Nyro.post('https://jsonplaceholder.typicode.com/posts');
     * @description This function sends a POST request to the specified URL and returns a promise that resolves with the HTTP response.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST|MDN web docs}
     */
    post<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
    /**
     * Sends a PUT request to the specified URL.
     * @param url - The URL to send the request to.
     * @param options - The request options.
     * @returns A promise that resolves with the HTTP response.
     * @example Nyro.put('https://jsonplaceholder.typicode.com/posts');
     * @description This function sends a PUT request to the specified URL and returns a promise that resolves with the HTTP response.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT|MDN web docs}
     */
    put<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
    /**
     * Sends a DELETE request to the specified URL.
     * @param url - The URL to send the request to.
     * @param options - The request options.
     * @returns A promise that resolves with the HTTP response.
     * @example Nyro.delete('https://jsonplaceholder.typicode.com/posts');
     * @description This function sends a DELETE request to the specified URL and returns a promise that resolves with the HTTP response.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE|MDN web docs}
     */
    delete<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
    /**
     * Sends a PATCH request to the specified URL.
     * @param url - The URL to send the request to.
     * @param options - The request options.
     * @returns A promise that resolves with the HTTP response.
     * @example Nyro.patch('https://jsonplaceholder.typicode.com/posts');
     * @description This function sends a PATCH request to the specified URL and returns a promise that resolves with the HTTP response.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH|MDN web docs}
     */
    patch<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
    /**
     * Sends a HEAD request to the specified URL.
     * @param url - The URL to send the request to.
     * @param options - The request options.
     * @returns A promise that resolves with the HTTP response.
     * @example Nyro.head('https://jsonplaceholder.typicode.com/posts');
     * @description This function sends a HEAD request to the specified URL and returns a promise that resolves with the HTTP response.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD|MDN web docs}
     */
    head<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
    /**
     * Sends an OPTIONS request to the specified URL.
     * @param url - The URL to send the request to.
     * @param options - The request options.
     * @returns A promise that resolves with the HTTP response.
     * @example Nyro.options('https://jsonplaceholder.typicode.com/posts');
     * @description This function sends an OPTIONS request to the specified URL and returns a promise that resolves with the HTTP response.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS|MDN web docs}
     */
    options<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
    /**
     * Sends a CONNECT request to the specified URL.
     * @param url - The URL to send the request to.
     * @param options - The request options.
     * @returns A promise that resolves with the HTTP response.
     * @example Nyro.connect('https://jsonplaceholder.typicode.com/posts');
     * @description This function sends a CONNECT request to the specified URL and returns a promise that resolves with the HTTP response.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT|MDN web docs}
     */
    connect<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
    /**
    * Sends a TRACE request to the specified URL.
    * @param url - The URL to send the request to.
    * @param options - The request options.
    * @returns A promise that resolves with the HTTP response.
    * @example Nyro.trace('https://jsonplaceholder.typicode.com/posts');
    * @description This function sends a TRACE request to the specified URL and returns a promise that resolves with the HTTP response.
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE|MDN web docs}
    */
    trace<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
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
    download<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
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
    pagination<T, B>(options?: RequestOptions<B>, paginationOptions?: PaginationOptions): Promise<Array<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>>;
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
    queue<T, B>(requests: Array<RequestOptions<B>>, queueOptions?: QueueOptions): Promise<Array<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>>;
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
    extend<T, B>(extendOptions: RequestOptions<B>): Promise<OmitedExtend>;
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
    create<T, B>(options: RequestOptions<B>): Promise<OmitedCreate>;
    /**
    * Core function for handling HTTP requests.
    *
    * @param options - The request options.
    * @param currentRedirects - The number of redirects that have occurred.
    * @returns A promise that resolves with the HTTP response.
    */
    request<T, B>(options?: RequestOptions<B>, currentRedirects?: number, attempt?: number, visitedUrls?: Set<string>): Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
}

declare class Headers {
    private headers;
    constructor(headers?: Headers$1);
    toJSON(): {
        [key: string]: string;
    };
    set(key: (keyof Headers$1 & string), value: string): this;
    get(key: (keyof Headers$1 & string)): string | undefined;
    delete(key: (keyof Headers$1 & string)): this;
    all(): Headers$1;
    clear(): this;
    has(key: (keyof Headers$1 & string)): boolean;
    setFromObject(headers: Headers$1): this;
    setFromHeaders(headers: Headers): this;
    setUserAgent(userAgent: string): this;
    setContentType(contentType: string): this;
    setAccept(accept: string): this;
    setAuthorization(authorization: string): this;
    setBearerToken(token: string): this;
    setBasicAuth(username: string, password: string): this;
    setBearerAuth(token: string): this;
    setReferer(referer: string): this;
    setOrigin(origin: string): this;
    setHost(host: string): this;
    setConnection(connection: string): this;
    setAcceptEncoding(acceptEncoding: string): this;
    setAcceptLanguage(acceptLanguage: string): this;
    setResponseType(responseType: string): this;
    setCacheControl(cacheControl: string): this;
    setCookie(cookie: string): this;
    setDNT(dnt: string): this;
    setPragma(pragma: string): this;
}

declare class Options {
    private options;
    constructor(options?: RequestOptions);
    toJSON(): RequestOptions;
    set(key: (keyof RequestOptions & string), value: any): this;
    get(key: (keyof RequestOptions & string)): any | undefined;
    delete(key: (keyof RequestOptions & string)): this;
    all(): RequestOptions;
    clear(): this;
    has(key: (keyof RequestOptions & string)): boolean;
    setFromObject(options: RequestOptions): this;
    setFromOptions(options: Options): this;
    setURL(url: string): this;
    setBaseURL(baseURL: string): this;
    setPath(path: string): this;
    setBodySchema(bodySchema: string): this;
    setAuth(auth: AuthOptions): this;
    setProxy(proxy: ProxyOptions): this;
    setMethod(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'): this;
    setHeaders(headers: (Headers$1 & Record<string, string>)): this;
    setBody(body: string): this;
    setQuery(query: string): this;
    setParams(params: string): this;
    setResponseEncoding(responseEncoding: ResponseEncoding): this;
    setResponseType(responseType: 'json' | 'text' | 'blob' | 'stream' | 'arrayBuffer' | 'document'): this;
    setMaxRedirects(maxRedirects: number): this;
    setRetryDelay(retryDelay: number): this;
    setTimeout(timeout: number): this;
}

declare var chromeWebkitVersions: {
    "1.0": string;
    "2.0": string;
    "3.0": string;
    "4.0": string;
    "4.1": string;
    "5.0": string;
    "6.0": string;
    "7.0": string;
    "8.0": string;
    "9.0": string;
    "10.0": string;
    "11.0": string;
    "12.0": string;
    "13.0": string;
    "14.0": string;
    "15.0": string;
    "16.0": string;
    "17.0": string;
    "18.0": string;
    "19.0": string;
    "20.0": string;
    "21.0": string;
    "22.0": string;
    "23.0": string;
    "24.0": string;
    "25.0": string;
    "26.0": string;
    "27.0": string;
};
declare var androidWebkitVersions: {
    "1.5": string;
    "1.6": string;
    "2.0": string;
    "2.0.1": string;
    "2.1": string;
    "2.2": string;
    "2.3": string;
    "2.3.3": string;
    "3.0": string;
    "3.1": string;
    "3.2": string;
    "4.0": string;
    "4.0.3": string;
    "4.1": string;
    "4.2": string;
    "4.3": string;
    "4.4": string;
};
declare var safariWebkitVersions: {
    "1.0": string;
    "1.0.3": string;
    "1.1": string;
    "1.2": string;
    "1.3": string;
    "1.3.1": string;
    "1.3.2": string;
    "1.3.3": string;
    "2.0": string;
    "2.0.2": string;
    "2.0.4": string;
    "3.0": string;
    "3.0.2": string;
    "3.0.3": string;
    "3.0.4": string;
    "3.1": string;
    "3.1.1": string;
    "3.1.2": string;
    "3.2": string;
    "3.2.1": string;
    "3.2.3": string;
    "4.0": string;
    "4.0.1": string;
    "4.0.2": string;
    "4.0.3": string;
    "4.0.4": string;
    "4.0.5": string;
    "4.1": string;
    "4.1.1": string;
    "4.1.2": string;
    "4.1.3": string;
    "5.0": string;
    "5.0.1": string;
    "5.0.2": string;
    "5.0.3": string;
    "5.0.4": string;
    "5.0.5": string;
    "5.0.6": string;
    "5.1": string;
    "5.1.1": string;
    "5.1.2": string;
    "5.1.3": string;
    "5.1.4": string;
    "5.1.5": string;
    "5.1.6": string;
    "5.1.7": string;
    "5.1.8": string;
    "5.1.9": string;
    "5.1.10": string;
    "6.0": string;
    "6.0.1": string;
    "6.0.2": string;
    "6.0.3": string;
    "6.0.4": string;
    "6.0.5": string;
    "6.1": string;
    "6.1.1": string;
    "6.1.6": string;
    "6.2.8": string;
    "7.0": string;
    "7.0.1": string;
    "7.0.3": string;
    "7.0.4": string;
    "7.0.5": string;
    "7.0.6": string;
    "7.1.8": string;
    "8.0": string;
    "8.0.6": string;
    "8.0.7": string;
    "9.0": string;
    "9.0.1": string;
    "9.0.2": string;
    "9.0.3": string;
    "9.1": string;
    "9.1.1": string;
    "9.1.2": string;
    "9.1.3": string;
    "10.0": string;
    "10.0.1": string;
    "10.0.2": string;
    "10.0.3": string;
    "10.1": string;
    "10.1.1": string;
    "10.1.2": string;
    "11.0.0": string;
};
declare function getRandomVersion(versions: Record<string, string>): string;
declare function generateChrome(version?: string, os?: string, device?: string): string;
declare function generateFirefox(version?: string, os?: string, device?: string): string;
declare function generateSafari(version?: string, os?: string, device?: string): string;
declare function generateAndroid(version?: string, device?: string, buildVersion?: string): string;
declare function generateEdge(version?: string, os?: string, device?: string): string;
declare class UserAgent {
    constructor();
    static getVersion(os?: UserAgentOS): string;
    static getOS(): UserAgentOS;
    static getBrowser(): UserAgentBrowser;
    static getDevice(): UserAgentDevice;
    static generate(options?: GenerateUserAgentOptions): string;
}

declare var Nyro: Core;
declare const version: string;
declare const get: <T, B>(url?: string, options?: RequestOptions<B>) => Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
declare const patch: <T, B>(url?: string, options?: RequestOptions<B>) => Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
declare const post: <T, B>(url?: string, options?: RequestOptions<B>) => Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
declare const put: <T, B>(url?: string, options?: RequestOptions<B>) => Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
declare const _delete: <T, B>(url?: string, options?: RequestOptions<B>) => Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
declare const head: <T, B>(url?: string, options?: RequestOptions<B>) => Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
declare const options: <T, B>(url?: string, options?: RequestOptions<B>) => Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
declare const connect: <T, B>(url?: string, options?: RequestOptions<B>) => Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
declare const trace: <T, B>(url?: string, options?: RequestOptions<B>) => Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
declare const extend: <T, B>(extendOptions: RequestOptions<B>) => Promise<{
    request: <T_1, B_1>(options?: RequestOptions<B_1>, currentRedirects?: number, attempt?: number, visitedUrls?: Set<string>) => Promise<HttpResponse<T_1, BodyFromSchema<B_1, RequestOptions>>>;
    get: <T_1, B_2>(url?: string, options?: RequestOptions<B_2>) => Promise<HttpResponse<T_1, BodyFromSchema<B_2, RequestOptions>>>;
    post: <T_1, B_3>(url?: string, options?: RequestOptions<B_3>) => Promise<HttpResponse<T_1, BodyFromSchema<B_3, RequestOptions>>>;
    put: <T_1, B_4>(url?: string, options?: RequestOptions<B_4>) => Promise<HttpResponse<T_1, BodyFromSchema<B_4, RequestOptions>>>;
    delete: <T_1, B_5>(url?: string, options?: RequestOptions<B_5>) => Promise<HttpResponse<T_1, BodyFromSchema<B_5, RequestOptions>>>;
    head: <T_1, B_6>(url?: string, options?: RequestOptions<B_6>) => Promise<HttpResponse<T_1, BodyFromSchema<B_6, RequestOptions>>>;
    options: <T_1, B_7>(url?: string, options?: RequestOptions<B_7>) => Promise<HttpResponse<T_1, BodyFromSchema<B_7, RequestOptions>>>;
    trace: <T_1, B_8>(url?: string, options?: RequestOptions<B_8>) => Promise<HttpResponse<T_1, BodyFromSchema<B_8, RequestOptions>>>;
    connect: <T_1, B_9>(url?: string, options?: RequestOptions<B_9>) => Promise<HttpResponse<T_1, BodyFromSchema<B_9, RequestOptions>>>;
    patch: <T_1, B_10>(url?: string, options?: RequestOptions<B_10>) => Promise<HttpResponse<T_1, BodyFromSchema<B_10, RequestOptions>>>;
    [EventEmitter.captureRejectionSymbol]?: (<K>(error: Error, event: string | symbol, ...args: any[]) => void) | undefined;
    extend: any;
    download: <T_1, B_11>(url?: string, options?: RequestOptions<B_11>) => Promise<HttpResponse<T_1, BodyFromSchema<B_11, RequestOptions>>>;
    queue: <T_1, B_12>(requests: Array<RequestOptions<B_12>>, queueOptions?: QueueOptions) => Promise<Array<HttpResponse<T_1, BodyFromSchema<B_12, RequestOptions>>>>;
    pagination: <T_1, B_13>(options?: RequestOptions<B_13>, paginationOptions?: PaginationOptions) => Promise<Array<HttpResponse<T_1, BodyFromSchema<B_13, RequestOptions>>>>;
    use: (plugin: Plugin) => void;
    on: <K extends keyof Events>(event: K, listener: Events[K]) => Core;
    off: <K extends keyof Events>(event: K, listener: Events[K]) => Core;
    emit: <K extends keyof Events>(event: K, ...args: Parameters<Events[K]>) => boolean;
    once: <K extends keyof Events>(event: K, listener: Events[K]) => Core;
    eventNames: () => (string | symbol)[];
    removeListener: <K>(eventName: string | symbol, listener: (...args: any[]) => void) => Core;
    removeAllListeners: (eventName?: string | symbol | undefined) => Core;
    listenerCount: <K>(eventName: string | symbol, listener?: Function | undefined) => number;
    listeners: <K>(eventName: string | symbol) => Function[];
    addListener: <K>(eventName: string | symbol, listener: (...args: any[]) => void) => Core;
    getMaxListeners: () => number;
    rawListeners: <K>(eventName: string | symbol) => Function[];
    setMaxListeners: (n: number) => Core;
    prependListener: <K>(eventName: string | symbol, listener: (...args: any[]) => void) => Core;
    prependOnceListener: <K>(eventName: string | symbol, listener: (...args: any[]) => void) => Core;
    baseRequestOptions: RequestOptions;
    pluginManager: PluginManager;
    setURL: (url: string) => Core;
    setBaseURL: (baseURL: string) => Core;
    setPath: (path: string) => Core;
    setBodySchema: (bodySchema: any) => Core;
    setAuth: (auth: AuthOptions) => Core;
    setProxy: (proxy: ProxyOptions) => Core;
    setMethod: (method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE") => Core;
    setHeaders: (headers: (Headers$1 & Record<string, string>)) => Core;
    setParams: (params: Record<string, string>) => Core;
    setQuery: (query: Record<string, string | number | boolean>) => Core;
    setBody: (body: any) => Core;
    setTimeout: (timeout: number) => Core;
    setRetryOn: (retryOn: (req: http.RequestOptions, error: Error) => boolean) => Core;
    setRetries: (retries: number) => Core;
    setValidateStatus: (validateStatus: (status: number) => boolean) => Core;
    setMaxBodyLength: (maxBodyLength: number) => Core;
    setMaxContentLength: (maxContentLength: number) => Core;
    setMaxRate: (maxRate: number) => Core;
    setSignal: (signal: AbortSignal) => Core;
    setOnDownloadProgress: (onDownloadProgress: (progress: {
        percent: number;
        transferredBytes: number;
        totalBytes: number;
    }) => void) => Core;
    setTimeoutErrorMessage: (timeoutErrorMessage: string) => Core;
    setResponseType: (responseType: ("json" | "text" | "blob" | "stream" | "arrayBuffer" | ("document" & string))) => Core;
    setResponseEncoding: (responseEncoding: BufferEncoding) => Core;
    setMaxRedirects: (maxRedirects: number) => Core;
    setRetryDelay: (retryDelay: number) => Core;
    setDecompress: (decompress: boolean) => Core;
}>;
declare const request: <T, B>(options?: RequestOptions<B>, currentRedirects?: number, attempt?: number, visitedUrls?: Set<string>) => Promise<HttpResponse<T, BodyFromSchema<B, RequestOptions>>>;
/**
* @description The main Nyro function.
*
* This function is the main entry point for the Nyro module. It is a wrapper around the request function and can be used to make HTTP requests.
* @async
* @function nyro
* @param {OptionsInterface} options - The options for the request.
* @returns {Promise<ResponseInterface>} A promise that resolves to the response object.
* @example nyro({ url: 'https://jsonplaceholder.typicode.com/posts/1', method: 'GET' }).then(console.log);
* @example nyro.get('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()).then(console.log);
* @example nyro.post('https://jsonplaceholder.typicode.com/posts', { body: { title: 'foo', body: 'bar', userId: 1 } }).then(console.log);
*/
declare const nyro: (<T, B>(options: RequestOptions<B>) => Promise<HttpResponse<any, B extends NumberConstructor ? number : B extends StringConstructor ? string : B extends Record<string, unknown> ? { [K in keyof B]: B[K] extends NumberConstructor ? number : B[K] extends StringConstructor ? string : B[K] extends ArrayConstructor ? any[] : B[K]; } : B extends ArrayConstructor ? any[] : B>>) & Core;
type NyroType = typeof nyro;

export { androidWebkitVersions as AndroidVersions, type AuthOptions, type BodyFromSchema, chromeWebkitVersions as ChromeVersions, ContentType, type Events, type GenerateUserAgentOptions, Headers, type Headers$1 as HeadersInterface, type InferBodySchema, Method, Nyro, ErrorHandler as NyroError, type NyroErrorInterface, type NyroErrorResponse, type NyroType, Options, type RequestOptions as OptionsInterface, type PaginationOptions, PluginManager as Plugin, type Plugin as PluginInterface, type ProxyOptions, type QueueOptions, type RequestInfo, ResponseEncoding, type HttpResponse as ResponseInterface, ResponseType, safariWebkitVersions as SafariVersions, StatusCode, UserAgent, type UserAgentBrowser, type UserAgentDevice, type UserAgentOS, connect, nyro as default, _delete as delete, extend, generateAndroid, generateChrome, generateEdge, generateFirefox, generateSafari, get, getRandomVersion, head, isNyroError, options, patch, post, put, request, trace, version };
