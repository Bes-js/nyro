import * as http from 'http';
import * as https from 'https';
import * as http2 from 'http2';
import * as zlib from 'zlib';
import { URL, URLSearchParams } from 'url';
import { getReusedSocket, getServerIp, getDefaultUserAgent } from './utils';
import combineURL from '../helpers/combineUrl';
import ErrorHandler from '../helpers/errorHandler';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { PassThrough } from 'stream';
import packageJson from '../../package.json';

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

interface Headers {
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

type InferBodySchema<T> = T extends Record<string, infer U> ? { [K in keyof T]: T[K] extends NumberConstructor ? number : T[K] extends StringConstructor ? string : any } : any;

interface RequestOptions<B = any> {
    method?: ('GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'connect' | 'trace' & string);
    port?: number;
    url?: string;
    path?: string;
    headers?: (Headers & Record<string, string>);
    body?: any;
    timeout?: number;
    params?: Record<string, string>;
    baseURL?: string;
    query?: Record<string, string | number | boolean>;
    responseType?: ('json' | 'text' | 'blob' | 'stream' | 'arrayBuffer' | 'document' & string);
    responseEncoding?: BufferEncoding;
    timeoutErrorMessage?: string;
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
    retries?: number;
    retryDelay?: number;
    retryOn?: (req: http.RequestOptions, error: Error) => boolean;
    onDownloadProgress?: (progress: { 
        percent: number;
        transferredBytes: number;
        totalBytes: number;
    }) => void;
}

interface RequestInfo {
    method?: string;
    url?: string;
    fullUrl: string;
    headers: (Headers & Record<string, string>);
    body?: BodyFromSchema<any>;
    httpVersion?: string;
    startTimestamp: number;
    timeout?: number;
    contentLength?: number;
}

type BodyFromSchema<B> = 
  B extends typeof Number ? number :
  B extends typeof String ? string :
  B extends Record<string, infer T> ? 
  { [K in keyof B]: B[K] extends typeof Number ? number : B[K] extends typeof String ? string : T }:
  B extends typeof Array ? any[] :
  B;

interface HttpResponse<T, B = any> {
    body: (BodyFromSchema<B> & PassThrough);
    statusCode: number;
    statusText: string;
    headers: (Headers & Record<string, string | string[]>);
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
}

type OmitedCreate = Omit<Core, 'create'>;
type OmitedExtend = Omit<Core, 'create'>;

class Core {

public baseRequestOptions: RequestOptions;
constructor(baseRequestOptions?: RequestOptions) {
    this.baseRequestOptions = baseRequestOptions || { };
};

/**
 * The version of the Nyro library.
 */
static version = `${packageJson.version}`;

/**
 * The package.json file for the Nyro library.
 */
static pkg = packageJson;

/**
 * @param url
 * @returns this
 * @example Nyro.setURL('https://jsonplaceholder.typicode.com/posts');
 * @description This function sets the URL for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setURL(url: string): this {
    this.baseRequestOptions.url = url;
    return this;
};

/**
 * @param baseURL
 * @returns this
 * @example Nyro.setBaseURL('https://jsonplaceholder.typicode.com');
 * @description This function sets the base URL for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setBaseURL(baseURL: string): this {
    this.baseRequestOptions.baseURL = baseURL;
    return this;
};

/**
 * @param path
 * @returns this
 * @example Nyro.setPath('/posts');
 * @description This function sets the path for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setPath(path: string): this {
    this.baseRequestOptions.path = path;
    return this;
};

/**
 * @param bodySchema
 * @returns this
 * @example Nyro.setBodySchema({ title: String, body: String });
 * @description This function sets the body schema for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setBodySchema(bodySchema: any): this {
    this.baseRequestOptions.bodySchema = bodySchema;
    return this;
};

/**
 * @param auth
 * @returns this
 * @example Nyro.setAuth({ username: 'user', password: 'pass' });
 * @description This function sets the authentication credentials for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setAuth(auth: AuthOptions): this {
    this.baseRequestOptions.auth = auth;
    return this;
};

/**
 * @param port
 * @returns this
 * @example Nyro.setPort(443);
 * @description This function sets the port for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setProxy(proxy: ProxyOptions): this {
    this.baseRequestOptions.proxy = proxy;
    return this;
};

/**
 * @param port
 * @returns this
 * @example Nyro.setPort(443);
 * @description This function sets the port for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'): this {
    this.baseRequestOptions.method = method;
    return this;
};

/**
 * @param headers
 * @returns this
 * @example Nyro.setHeaders({ 'Content-Type': 'application/json' });
 * @description This function sets the headers for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setHeaders(headers: (Headers & Record<string, string>)): this {
    this.baseRequestOptions.headers = headers;
    return this;
};

/**
 * @param params
 * @returns this
 * @example Nyro.setParams({ id: '1' });
 * @description This function sets the query parameters for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setParams(params: Record<string, string>): this {
    this.baseRequestOptions.params = params;
    return this;
};

/**
 * @param query
 * @returns this
 * @example Nyro.setQuery({ id: '1' });
 * @description This function sets the query parameters for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setQuery(query: Record<string, string | number | boolean>): this {
    this.baseRequestOptions.query = query;
    return this;
};

/**
 * @param body
 * @returns this
 * @example Nyro.setBody({ title: 'foo', body: 'bar', userId: 1 });
 * @description This function sets the body for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setBody(body: any): this {
    this.baseRequestOptions.body = body;
    return this;
};

/**
 * @param timeout
 * @returns this
 * @example Nyro.setTimeout(5000);
 * @description This function sets the timeout for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setTimeout(timeout: number): this {
    this.baseRequestOptions.timeout = timeout;
    return this;
};

/**
 * @param responseType
 * @returns this
 * @example Nyro.setResponseType('json');
 * @description This function sets the response type for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setRetryOn(retryOn: (req: http.RequestOptions, error: Error) => boolean): this {
    this.baseRequestOptions.retryOn = retryOn;
    return this;
};

/**
 * @param retries
 * @returns this
 * @example Nyro.setRetries(3);
 * @description This function sets the number of retries for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setRetries(retries: number): this {
    this.baseRequestOptions.retries = retries;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setValidateStatus(validateStatus: (status: number) => boolean): this {
    this.baseRequestOptions.validateStatus = validateStatus;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setMaxBodyLength(maxBodyLength: number): this {
    this.baseRequestOptions.maxBodyLength = maxBodyLength;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setMaxContentLength(maxContentLength: number): this {
    this.baseRequestOptions.maxContentLength = maxContentLength;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setMaxRate(maxRate: number): this {
    this.baseRequestOptions.maxRate = maxRate;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setSignal(signal: AbortSignal): this {
    this.baseRequestOptions.signal = signal;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setOnDownloadProgress(onDownloadProgress: (progress: { percent: number; transferredBytes: number; totalBytes: number }) => void): this {
    this.baseRequestOptions.onDownloadProgress = onDownloadProgress;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setTimeoutErrorMessage(timeoutErrorMessage: string): this {
    this.baseRequestOptions.timeoutErrorMessage = timeoutErrorMessage;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setResponseType(responseType: ('json' | 'text' | 'blob' | 'stream' | 'arrayBuffer' | 'document' & string)): this {
    this.baseRequestOptions.responseType = responseType;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setResponseEncoding(responseEncoding: BufferEncoding): this {
    this.baseRequestOptions.responseEncoding = responseEncoding;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setMaxRedirects(maxRedirects: number): this {
    this.baseRequestOptions.maxRedirects = maxRedirects;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setRetryDelay(retryDelay: number): this {
    this.baseRequestOptions.retryDelay = retryDelay;
    return this;
};

/**
 * @param retryDelay
 * @returns this
 * @example Nyro.setRetryDelay(1000);
 * @description This function sets the retry delay for the request.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers|MDN web docs}
 */
setDecompress(decompress: boolean): this {
    this.baseRequestOptions.decompress = decompress;
    return this;
};


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
async get<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    let method: any = 'GET';
    if(this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request<T, B>(!url ? this.baseRequestOptions : { ...options, method: this.baseRequestOptions.method || method, url });
};


/**
 * Sends a POST request to the specified URL.
 * @param url - The URL to send the request to.
 * @param options - The request options.
 * @returns A promise that resolves with the HTTP response.
 * @example Nyro.post('https://jsonplaceholder.typicode.com/posts');
 * @description This function sends a POST request to the specified URL and returns a promise that resolves with the HTTP response.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST|MDN web docs}
 */
async post<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    let method: any = 'POST';
    if(this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request<T, B>(!url ? this.baseRequestOptions : { ...options, method: this.baseRequestOptions.method || method, url });
};


/**
 * Sends a PUT request to the specified URL.
 * @param url - The URL to send the request to.
 * @param options - The request options.
 * @returns A promise that resolves with the HTTP response.
 * @example Nyro.put('https://jsonplaceholder.typicode.com/posts');
 * @description This function sends a PUT request to the specified URL and returns a promise that resolves with the HTTP response.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT|MDN web docs}
 */
async put<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    let method: any = 'PUT';
    if(this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request<T, B>(!url ? this.baseRequestOptions : { ...options, method: this.baseRequestOptions.method || method, url });
};


/**
 * Sends a DELETE request to the specified URL.
 * @param url - The URL to send the request to.
 * @param options - The request options.
 * @returns A promise that resolves with the HTTP response.
 * @example Nyro.delete('https://jsonplaceholder.typicode.com/posts');
 * @description This function sends a DELETE request to the specified URL and returns a promise that resolves with the HTTP response.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE|MDN web docs}
 */
async delete<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    let method: any = 'DELETE';
    if(this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request<T, B>(!url ? this.baseRequestOptions : { ...options, method: this.baseRequestOptions.method || method, url });
};


/**
 * Sends a PATCH request to the specified URL.
 * @param url - The URL to send the request to.
 * @param options - The request options.
 * @returns A promise that resolves with the HTTP response.
 * @example Nyro.patch('https://jsonplaceholder.typicode.com/posts');
 * @description This function sends a PATCH request to the specified URL and returns a promise that resolves with the HTTP response.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH|MDN web docs}
 */
async patch<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    let method: any = 'PATCH';
    if(this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request<T, B>(!url ? this.baseRequestOptions : { ...options, method: this.baseRequestOptions.method || method, url });
};


/**
 * Sends a HEAD request to the specified URL.
 * @param url - The URL to send the request to.
 * @param options - The request options.
 * @returns A promise that resolves with the HTTP response.
 * @example Nyro.head('https://jsonplaceholder.typicode.com/posts');
 * @description This function sends a HEAD request to the specified URL and returns a promise that resolves with the HTTP response.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD|MDN web docs}
 */
async head<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    let method: any = 'HEAD';
    if(this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request<T, B>(!url ? this.baseRequestOptions : { ...options, method: this.baseRequestOptions.method || method, url });
};


/**
 * Sends an OPTIONS request to the specified URL.
 * @param url - The URL to send the request to.
 * @param options - The request options.
 * @returns A promise that resolves with the HTTP response.
 * @example Nyro.options('https://jsonplaceholder.typicode.com/posts');
 * @description This function sends an OPTIONS request to the specified URL and returns a promise that resolves with the HTTP response.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS|MDN web docs}
 */
async options<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    let method: any = 'OPTIONS';
    if(this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request<T, B>(!url ? this.baseRequestOptions : { ...options, method: this.baseRequestOptions.method || method, url });
};


/**
 * Sends a CONNECT request to the specified URL.
 * @param url - The URL to send the request to.
 * @param options - The request options.
 * @returns A promise that resolves with the HTTP response.
 * @example Nyro.connect('https://jsonplaceholder.typicode.com/posts');
 * @description This function sends a CONNECT request to the specified URL and returns a promise that resolves with the HTTP response.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT|MDN web docs}
 */
async connect<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    let method: any = 'CONNECT';
    if(this.baseRequestOptions && this.baseRequestOptions.method !== method) this.baseRequestOptions.method = method;
    return this.request<T, B>(!url ? this.baseRequestOptions : { ...options, method: this.baseRequestOptions.method || method, url });
};


/**
* Sends a TRACE request to the specified URL.
* @param url - The URL to send the request to.
* @param options - The request options.
* @returns A promise that resolves with the HTTP response.
* @example Nyro.trace('https://jsonplaceholder.typicode.com/posts');
* @description This function sends a TRACE request to the specified URL and returns a promise that resolves with the HTTP response.
* @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE|MDN web docs}
*/
async trace<T, B>(url?: string, options?: RequestOptions<B>): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    return this.request<T, B>(!url ? this.baseRequestOptions : { ...options, method: 'TRACE', url });
};

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
async extend<T, B>(extendOptions: RequestOptions<B>): Promise<OmitedExtend> {
    var options = { ...this.baseRequestOptions, ...extendOptions };
    return new Core(options);
};

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
async create<T, B>(options: RequestOptions<B>): Promise<OmitedCreate> {
    return new Core(options);
}




/**
* Core function for handling HTTP requests.
* 
* @param options - The request options.
* @param currentRedirects - The number of redirects that have occurred.
* @returns A promise that resolves with the HTTP response.
*/
async request<T, B>(options?: RequestOptions<B>, currentRedirects = 0, attempt = 1, visitedUrls: Set<string> = new Set()): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    if(!options) {
        options = { ...this.baseRequestOptions };
    } else {
        options = { ...this.baseRequestOptions, ...options };
    };

    const combinedURL = combineURL(options?.baseURL || '', options?.url || "", options?.path || '');
    try {
    var fullUrl = new URL(combinedURL);
    } catch (error) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid URL: ${combinedURL}`,
            name: 'Request',
            requestOptions: options,
        }));
    }
    

    visitedUrls.add(fullUrl.toString());

    if (options?.signal?.aborted) {
        return Promise.reject(new ErrorHandler({
            statusCode: 0,
            message: 'Request aborted',
            name: 'Request',
            requestOptions: options,
        }));
    };

    if(options?.port) {
    options.port = options?.port || (fullUrl.protocol === 'https:' ? 443 : 80);
    };

    if (options?.path) {
        fullUrl.pathname += options.path;
    }

    if(options?.isStream) {
        options.responseType = 'stream';
    }

    if (options?.params) {
        const params = new URLSearchParams(options.params);
        fullUrl.search = params.toString();
    }

    if(['json', 'text', 'blob', 'stream', 'arrayBuffer', 'document'].indexOf(options?.responseType || 'json') === -1) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid response type: ${options?.responseType}`,
            name: 'Request',
            requestOptions: options,
        }));
    };

    if(options && options.method && ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'CONNECT', 'TRACE'].indexOf(options.method) === -1) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid request method: ${options.method}`,
            name: 'Request',
            requestOptions: options,
        }));
    };

    if(options?.timeout && options.timeout < 0) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid timeout: ${options.timeout}`,
            name: 'Request',
            requestOptions: options,
        }));
    };

    if(options?.maxRedirects && options.maxRedirects < 0) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid number of redirects: ${options.maxRedirects}`,
            name: 'Request',
            requestOptions: options,
        }));
    };

    if(options?.maxBodyLength && options.maxBodyLength < 0) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid max body length: ${options.maxBodyLength}`,
            name: 'Request',
            requestOptions: options,
        }));
    };

    if(options?.maxContentLength && options.maxContentLength < 0) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid max content length: ${options.maxContentLength}`,
            name: 'Request',
            requestOptions: options,
        }));
    };

    if(options?.maxRate && options.maxRate < 0) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid max rate: ${options.maxRate}`,
            name: 'Request',
            requestOptions: options,
        }));
    };

    if(options?.retryDelay && options.retryDelay < 0) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid retry delay: ${options.retryDelay}`,
            name: 'Request',
            requestOptions: options,
        }));
    };
    
    if(options?.retries && options.retries < 0) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid number of retries: ${options.retries}`,
            name: 'Request',
            requestOptions: options
        }));
    };

    if (options?.query) {
        const query = new URLSearchParams();
        for (const key in options.query) {
            if (Object.prototype.hasOwnProperty.call(options.query, key)) {
                query.append(key, String(options.query[key]));
            }
        }
        fullUrl.search += (fullUrl.search ? '&' : '') + query.toString();
    }

    var isHttps = fullUrl.protocol === 'https:';
    var lib = isHttps ? https : http;
    var http2Lib = options.useHttp2 ? http2 : null;


    if (!options.headers) options.headers = {};

    if (options?.headers) {
    if (!options.headers['User-Agent']) options.headers['User-Agent'] = getDefaultUserAgent();
    if (!options.headers['Accept']) options.headers['Accept'] = `*/*`;
    if (!options.headers['Content-Type']) options.headers['Content-Type'] = 'application/json';
    if (!options.headers['Content-Length']) options.headers['Content-Length'] = '0';
    }

    if (options && !options?.responseType) {
        options.responseType = 'json';
    }

    if (options?.auth && options?.headers) {
        const { username, password } = options.auth;
        const token = Buffer.from(`${username}:${password}`).toString('base64');
        options.headers['Authorization'] = `Basic ${token}`;
    }

    var requestOptions: http.RequestOptions = {
        method: options.method,
        headers: options?.headers as http.OutgoingHttpHeaders,
    };

    if (options?.timeout) {
        requestOptions.timeout = options.timeout;
    }

    if (options?.signal) {
        requestOptions.signal = options.signal;
    }

    

    if (options?.proxy) {
        var proxyAuth = options.proxy.auth ? `${options.proxy.auth.username}:${options.proxy.auth.password}` : '';
        var proxyUrl = `${options.proxy.host}:${options.proxy.port}`;
        var protocol = options.proxy?.protocol ? options.proxy.protocol : 'http';

        requestOptions.agent = protocol.includes('socks') 
            ? new SocksProxyAgent(`${protocol}://${proxyAuth ? `${proxyAuth}@` : ''}${proxyUrl}`)  : isHttps
            ? new HttpsProxyAgent(`${protocol}://${proxyAuth ? `${proxyAuth}@` : ''}${proxyUrl}`)
            : new HttpProxyAgent(`${protocol}://${proxyAuth ? `${proxyAuth}@` : ''}${proxyUrl}`);
    }

    const dataString = options?.body ? JSON.stringify(options.body) : null;
    if (dataString) {
        if (options?.maxBodyLength && Buffer.byteLength(dataString) > options.maxBodyLength) {
            return Promise.reject(new ErrorHandler({
                statusCode: 413,
                message: `Request body size exceeds maxBodyLength of ${options.maxBodyLength} bytes`,
                name: 'Request',
                requestOptions: options
            }));
        }
        requestOptions.headers!['Content-Length'] = Buffer.byteLength(dataString).toString();
    }

    const startTimestamp = Date.now();

    var clientLib = options.useHttp2 ? http2Lib : lib;
    
    return new Promise((resolve, reject) => {
        const req = lib.request(fullUrl, requestOptions, (res) => {
            
            const chunks: any[] = [];
            let responseData: any;
            let totalLength = 0;
            let responseSize = 0;
            let downloaded = 0;
            let lastTimestamp = startTimestamp;
            const contentLength = parseInt(res.headers['content-length'] ?? '0', 10) || null;
            const connectionReused = getReusedSocket(res);
            const serverIp = getServerIp(res);

            if(options?.responseType === 'stream') {
                const stream = new PassThrough();
                res.pipe(stream);

                const response: HttpResponse<T, BodyFromSchema<B>> = {
                    request: req,
                    response: res,
                    headers: res.headers as Record<string, string | string[]>,
                    config: options as RequestOptions<BodyFromSchema<B>>,
                    requestInfo: {
                        method: options?.method,
                        url: options?.url,
                        fullUrl: fullUrl.href,
                        headers: options?.headers || {},
                        body: options?.body,
                        httpVersion: res.httpVersion,
                        startTimestamp,
                        timeout: options?.timeout,
                        contentLength: dataString ? Buffer.byteLength(dataString) : 0,
                    },
                    body: stream,
                    statusCode: res.statusCode!,
                    statusText: res.statusMessage || '',
                    timestamp: {
                        startTimestamp,
                        endTimestamp: Date.now(),
                    },
                    responseTime: Date.now() - startTimestamp,
                    responseSize: 0,
                    serverIp,
                    connectionReused: connectionReused || false,
                } as HttpResponse<T, BodyFromSchema<B>>;
                resolve(response);
            } else {
            res.on('data', (chunk) => {
                totalLength += chunk.length;
                responseSize += chunk.length;
                downloaded += chunk.length;

                const currentTimestamp = Date.now();
                const timeElapsed = (currentTimestamp - lastTimestamp) / 1000;
                lastTimestamp = currentTimestamp;

                const rate = chunk.length / timeElapsed;

                if (contentLength && options?.onDownloadProgress) {
                    const progress = Math.min(1, downloaded / contentLength);
                    options.onDownloadProgress({
                        percent: progress * 100,
                        transferredBytes: downloaded,
                        totalBytes: contentLength,
                    });
                  };

                if (options?.maxContentLength && responseSize > options.maxContentLength) {
                    req.destroy();
                    reject(new ErrorHandler({
                        statusCode: 413,
                        message: `Response size exceeds maxContentLength of ${options.maxContentLength} bytes`,
                        name: 'Request',
                        requestOptions: options,
                    }));
                    return;
                };

                if (options?.maxRate && rate > options.maxRate) {
                    res.pause();

                    setTimeout(() => {
                        res.resume();
                    }, (chunk.length / options.maxRate) * 1000);
                };

                chunks.push(chunk);
            });

            res.on('end', async () => {
                const endTime = Date.now();
                const responseTime = endTime - startTimestamp;
                let rawData = Buffer.concat(chunks);

                if (!options?.decompress) {
                    const encoding = res.headers['content-encoding'];
                    if (encoding === 'gzip') {
                        rawData = zlib.gunzipSync(rawData);
                    } else if (encoding === 'deflate') {
                        rawData = zlib.inflateSync(rawData);
                    } else if (encoding === 'br') {
                        rawData = zlib.brotliDecompressSync(rawData);
                    }
                }

                const validateStatus = options?.validateStatus || ((status) => status >= 200 && status < 300);

                if (res.statusCode && [301, 302, 303, 307, 308].includes(res.statusCode)) {
                    if(currentRedirects >= (options?.maxRedirects || 5)) {
                        reject(new ErrorHandler({
                            statusCode: 310,
                            message: `Exceeded maximum number of redirects: ${options?.maxRedirects || 5}`,
                            name: 'Request',
                            requestOptions: options,
                        }));
                        return;
                    }
                        

                    if(!res.headers.location) {
                        reject(new ErrorHandler({
                            statusCode: 310,
                            message: `Redirect location header missing`,
                            name: 'Request',
                            requestOptions: options,
                        }));
                        return;
                    }

                    var newUrl = new URL(res.headers.location);
                    if (visitedUrls.has(newUrl.toString())) {
                        reject(new ErrorHandler({
                            statusCode: 508,
                            message: `Redirect loop detected`,
                            name: 'Request',
                            requestOptions: options,
                        }));
                        return;
                    }

                    
                    try {
                        if (res.headers.location?.startsWith('http://') || res.headers.location?.startsWith('https://')) {
                            newUrl = new URL(res.headers.location);
                        } else {
                            newUrl = new URL(res.headers.location, fullUrl);
                        }
                    } catch (error) {
                        reject(new ErrorHandler({
                            statusCode: 310,
                            message: `Invalid redirect URL: ${res.headers.location}`,
                            name: 'Request',
                            requestOptions: options,
                        }));
                        return;
                    }

                    
                    var newOptions: RequestOptions<B> = {
                        ...options,
                        url: newUrl.toString(),
                    };

                    delete newOptions.baseURL;
                    delete newOptions.path;
               
                    switch (res.statusCode) {
                        case 301: // Permanent redirect
                        case 302: // Temporary redirect
                            if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
                                newOptions.method = 'GET';
                                delete newOptions.body;
                                if (newOptions.headers) {
                                    delete newOptions.headers['content-length'];
                                    delete newOptions.headers['content-type'];
                                }
                            }
                            break;
                        case 303:
                            if(newOptions.method === 'POST' || newOptions.method === 'PUT') {
                            newOptions.method = 'GET';
                            delete newOptions.body;
                            if (newOptions.headers) {
                                delete newOptions.headers['content-length'];
                                delete newOptions.headers['content-type'];
                            }
                            }
                            break;
                        case 307: // Temporary redirect
                        case 308: // Permanent redirect
                            break;
                    }

                    if (!newUrl.host) {
                        newUrl.host = fullUrl.host;
                        newUrl.protocol = fullUrl.protocol;
                    }

                    if (res.headers['set-cookie']) {
                        if (!newOptions.headers) newOptions.headers = {};
                        const currentCookies = newOptions.headers.cookie || '';
                        const newCookies = res.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
                        newOptions.headers['Cookie'] = currentCookies ? `${currentCookies}; ${newCookies}` : newCookies;
                    }


                    try {
                        const redirectResponse = await this.request<T, B>(
                            newOptions,
                            currentRedirects + 1,
                            attempt,
                            visitedUrls
                        );
                        resolve(redirectResponse);
                    } catch (error) {
                        reject(error);
                    }
                    return;
                }


                if (options?.responseType === 'json') {
                    try {
                        responseData = JSON.parse(rawData.toString(options.responseEncoding || 'utf8'));
                    } catch (e) {
                        responseData = rawData.toString(options.responseEncoding || 'utf8');
                    }
                } else if (options?.responseType === 'text') {
                    responseData = rawData.toString(options.responseEncoding || 'utf8');
                } else if (options?.responseType === 'blob') {
                    responseData = rawData;
                } else if (options?.responseType === 'arrayBuffer') {
                    responseData = Buffer.from(rawData);
                } else if (options?.responseType === 'document') {
                    responseData = rawData.toString(options.responseEncoding || 'utf8');
                }

                if (!validateStatus(res.statusCode || 0)) {
                    reject(new ErrorHandler({
                        statusCode: res.statusCode || 0,
                        message: `Request failed with status code ${res.statusCode}`,
                        name: 'Request',
                        requestOptions: options,
                    }));
                    return;
                }

                const response: HttpResponse<T, BodyFromSchema<B>> = {
                    request: req,
                    response: res,
                    headers: res.headers as Record<string, string | string[]>,
                    config: options as RequestOptions<BodyFromSchema<B>>,
                    requestInfo: {
                        method: options?.method,
                        url: options?.url,
                        fullUrl: fullUrl.href,
                        headers: options?.headers || {},
                        body: options?.body,
                        httpVersion: res.httpVersion,
                        startTimestamp,
                        timeout: options?.timeout,
                        contentLength: dataString ? Buffer.byteLength(dataString) : 0,
                    },
                    body: responseData,
                    statusCode: res.statusCode!,
                    statusText: res.statusMessage || '',
                    timestamp: {
                        startTimestamp,
                        endTimestamp: endTime,
                    },
                    responseTime,
                    responseSize,
                    serverIp,
                    connectionReused: connectionReused || false,
                };

                resolve(response);
            });
        }
        });

        req.on('error', (err) => {
            if (options?.retries && attempt <= options.retries && (options.retryOn?.(req,err) ?? true)) {
                var delay = options.retryDelay || 1000;
                setTimeout(() => {
                    new Core().request<T, B>(options, currentRedirects, attempt + 1);
                    }, delay);
              } else {
            reject(new ErrorHandler({
                statusCode: 500,
                message: err.message,
                name: 'Request',
                requestOptions: options,
            }));
        };
        });

        if (options?.signal) {
            options.signal.addEventListener('abort', () => {
                req.destroy();
                reject(new ErrorHandler({
                    statusCode: 499,
                    message: 'Request cancelled',
                    name: 'Request',
                    requestOptions: options,
                }));
            });
        }

        req.setTimeout(options?.timeout || 0, () => {
            req.destroy();
            reject(new ErrorHandler({
                statusCode: 408,
                message: options?.timeoutErrorMessage || 'Timeout exceeded',
                name: 'Request',
                requestOptions: options,
            }));
        });

        if (dataString) {
            req.write(dataString);
        }

        req.end();
    });
}



};

export default Core;
export {
    RequestInfo,
    RequestOptions,
    HttpResponse,
    Headers,
    ProxyOptions,
    AuthOptions,
    InferBodySchema,
    BodyFromSchema
};
