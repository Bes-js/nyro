import * as http from 'http';

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
type BodyFromSchema<B> = B extends typeof Number ? number : B extends typeof String ? string : B extends Record<string, infer T> ? {
    [K in keyof B]: B[K] extends typeof Number ? number : B[K] extends typeof String ? string : T;
} : B extends typeof Number[] ? number[] : B extends typeof String[] ? string[] : B extends typeof Array ? any[] : B;
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
declare function Core<T, B>(options: RequestOptions<B>, currentRedirects?: number): Promise<HttpResponse<T, BodyFromSchema<B>>>;

export { Core as default };
