import * as http from 'http';
import * as https from 'https';
import * as zlib from 'zlib';
import { URL, URLSearchParams } from 'url';
import { getReusedSocket, getServerIp, getDefaultUserAgent } from './utils';
import combineURL from '../helpers/combineUrl';
import ErrorHandler from '../helpers/errorHandler';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';

interface ProxyOptions {
    host: string;
    port: number;
    auth?: {
        username: string;
        password: string;
    };
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
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';
    url: string;
    path?: string;
    headers?: Headers;
    body?: any;
    timeout?: number;
    params?: Record<string, string>;
    baseURL?: string;
    query?: Record<string, string | number | boolean>;
    responseType?: ('json' | 'text' | 'blob' | 'stream' | 'arrayBuffer' | 'document' & string);
    responseEncoding?: BufferEncoding;
    timeoutErrorMessage?: string;
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
}

interface RequestInfo {
    method: string;
    url: string;
    fullUrl: string;
    headers: Headers;
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
  B extends typeof Number[] ? number[] : 
  B extends typeof String[] ? string[] : 
  B extends typeof Array ? any[] :
  B;

interface HttpResponse<T, B = any> {
    body: BodyFromSchema<B>;
    statusCode: number;
    statusText: string;
    headers: Headers;
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


/**
* Core function for handling HTTP requests.
* 
* @param options - The request options.
* @param currentRedirects - The number of redirects that have occurred.
* @returns A promise that resolves with the HTTP response.
*/
async function Core<T, B>(options: RequestOptions<B>, currentRedirects = 0): Promise<HttpResponse<T, BodyFromSchema<B>>> {
    const combinedURL = combineURL(options.baseURL || '', options.url || options.path || '');
    const fullUrl = new URL(combinedURL);

    if (options.path) {
        fullUrl.pathname += options.path;
    }

    if (options.params) {
        const params = new URLSearchParams(options.params);
        fullUrl.search = params.toString();
    }

    if(['json', 'text', 'blob', 'stream', 'arrayBuffer', 'document'].indexOf(options.responseType || 'json') === -1) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid response type: ${options.responseType}`,
            name: 'Request',
            requestOptions: options,
        }));
    };

    if(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'CONNECT', 'TRACE'].indexOf(options.method) === -1) {
        return Promise.reject(new ErrorHandler({
            statusCode: 400,
            message: `Invalid request method: ${options.method}`,
            name: 'Request',
            requestOptions: options,
        }));
    };

    if (options.query) {
        const query = new URLSearchParams();
        for (const key in options.query) {
            if (Object.prototype.hasOwnProperty.call(options.query, key)) {
                query.append(key, String(options.query[key]));
            }
        }
        fullUrl.search += (fullUrl.search ? '&' : '') + query.toString();
    }

    const isHttps = fullUrl.protocol === 'https:';
    const lib = isHttps ? https : http;

    if(options.headers) {
    if (!options.headers['User-Agent']) options.headers['User-Agent'] = getDefaultUserAgent();
    if (!options.headers['Content-Type']) options.headers['Content-Type'] = 'application/json';
    }

    if (!options.responseType) {
        options.responseType = 'json';
    }

    if (options.auth && options.headers) {
        const { username, password } = options.auth;
        const token = Buffer.from(`${username}:${password}`).toString('base64');
        options.headers['Authorization'] = `Basic ${token}`;
    }

    const requestOptions: http.RequestOptions = {
        method: options.method,
        headers: options.headers as http.OutgoingHttpHeaders,
    };

    if (options.proxy) {
        const proxyAuth = options.proxy.auth ? `${options.proxy.auth.username}:${options.proxy.auth.password}` : '';
        const proxyUrl = `${options.proxy.host}:${options.proxy.port}`;

        requestOptions.agent = isHttps
            ? new HttpsProxyAgent(`http://${proxyAuth ? `${proxyAuth}@` : ''}${proxyUrl}`)
            : new HttpProxyAgent(`http://${proxyAuth ? `${proxyAuth}@` : ''}${proxyUrl}`);
    }

    const dataString = options.body ? JSON.stringify(options.body) : null;
    if (dataString) {
        if (options.maxBodyLength && Buffer.byteLength(dataString) > options.maxBodyLength) {
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

    return new Promise((resolve, reject) => {
        const req = lib.request(fullUrl, requestOptions, (res) => {
            const chunks: any[] = [];
            let totalLength = 0;
            let responseSize = 0;
            let lastTimestamp = startTimestamp;
            const connectionReused = getReusedSocket(res);
            const serverIp = getServerIp(res);

            res.on('data', (chunk) => {
                totalLength += chunk.length;
                responseSize += chunk.length;

                const currentTimestamp = Date.now();
                const timeElapsed = (currentTimestamp - lastTimestamp) / 1000;
                lastTimestamp = currentTimestamp;

                const rate = chunk.length / timeElapsed;

                if (options.maxContentLength && responseSize > options.maxContentLength) {
                    req.destroy();
                    reject(new ErrorHandler({
                        statusCode: 413,
                        message: `Response size exceeds maxContentLength of ${options.maxContentLength} bytes`,
                        name: 'Request',
                        requestOptions: options,
                    }));
                    return;
                }

                if (options.maxRate && rate > options.maxRate) {
                    res.pause();

                    setTimeout(() => {
                        res.resume();
                    }, (chunk.length / options.maxRate) * 1000);
                }

                chunks.push(chunk);
            });

            res.on('end', () => {
                const endTime = Date.now();
                const responseTime = endTime - startTimestamp;
                let rawData = Buffer.concat(chunks);

                if (options.decompress !== false) {
                    const encoding = res.headers['content-encoding'];
                    if (encoding === 'gzip') {
                        rawData = zlib.gunzipSync(rawData);
                    } else if (encoding === 'deflate') {
                        rawData = zlib.inflateSync(rawData);
                    } else if (encoding === 'br') {
                        rawData = zlib.brotliDecompressSync(rawData);
                    }
                }

                const validateStatus = options.validateStatus || ((status) => status >= 200 && status < 300);

                if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && currentRedirects < (options.maxRedirects || 5)) {
                    const newUrl = new URL(res.headers.location, fullUrl);
                    options.url = newUrl.href;
                    resolve(Core<T,B>(options, currentRedirects + 1));
                    return;
                }

                let responseData: any;
                if (options.responseType === 'json') {
                    try {
                        responseData = JSON.parse(rawData.toString(options.responseEncoding || 'utf8'));
                    } catch (e) {
                        responseData = rawData.toString(options.responseEncoding || 'utf8');
                    }
                } else if (options.responseType === 'text') {
                    responseData = rawData.toString(options.responseEncoding || 'utf8');
                } else if (options.responseType === 'blob') {
                    responseData = rawData;
                } else if (options.responseType === 'stream') {
                    responseData = res;
                } else if (options.responseType === 'arrayBuffer') {
                    responseData = Buffer.from(rawData);
                } else if (options.responseType === 'document') {
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
                        method: options.method,
                        url: options.url,
                        fullUrl: fullUrl.href,
                        headers: options.headers || {},
                        body: options.body,
                        httpVersion: res.httpVersion,
                        startTimestamp,
                        timeout: options.timeout,
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
        });

        req.on('error', (err) => {
            reject(new ErrorHandler({
                statusCode: 500,
                message: err.message,
                name: 'Request',
                requestOptions: options,
            }));
        });

        if (options.signal) {
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

        req.setTimeout(options.timeout || 0, () => {
            req.destroy();
            reject(new ErrorHandler({
                statusCode: 408,
                message: options.timeoutErrorMessage || 'Timeout exceeded',
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

export default Core;
