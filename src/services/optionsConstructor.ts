import { 
    RequestOptions as RequestInterface,
    Headers as HeadersInterface,
    AuthOptions as AuthInterface,
    ProxyOptions as ProxyInterface,
    } from './engine';
import { ResponseEncoding } from '../helpers/types';

export default class Options {
    private options: RequestInterface = { };

    public constructor(options?: RequestInterface) {
    }

    public toJSON(): RequestInterface {
        return this.options;
    };

    public set(key: (keyof RequestInterface & string), value: any): this {
        if (!this.options[key]) {
            this.options[key] = value;
        }
        return this;
    }

    public get(key: (keyof RequestInterface & string)): any | undefined {
        return this.options[key];
    }

    public delete(key: (keyof RequestInterface & string)): this {
        delete this.options[key];
        return this;
    }

    public all(): RequestInterface {
        return this.options;
    }

    public clear(): this {
        this.options = {};
        return this;
    }

    public has(key: (keyof RequestInterface & string)): boolean {
        return this.options.hasOwnProperty(key);
    }

    public setFromObject(options: RequestInterface): this {
        this.options = { ...this.options, ...options };
        return this;
    }

    public setFromOptions(options: Options): this {
        this.setFromObject(options.all());
        return this;
    }

    public setURL(url: string): this {
        return this.set('url', url);
    }

    public setBaseURL(baseURL: string): this {
        return this.set('baseURL', baseURL);
    }

    public setPath(path: string): this {
        return this.set('path', path);
    }

    public setBodySchema(bodySchema: string): this {
        return this.set('bodySchema', bodySchema);
    }

    public setAuth(auth: AuthInterface): this {
        return this.set('auth', auth);
    }

    public setProxy(proxy: ProxyInterface): this {
        return this.set('proxy', proxy);
    }

    public setMethod(method: 
        'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'
    ): this {
        return this.set('method', method);
    }

    public setHeaders(headers: (HeadersInterface & Record<string,string>)): this {
        if(typeof headers !== 'object') return this;
        return this.set('headers', (headers as any));
    }

    public setBody(body: string): this {
        return this.set('body', body);
    }

    public setQuery(query: string): this {
        return this.set('query', query);
    }

    public setParams(params: string): this {
        return this.set('params', params);
    }

    public setResponseEncoding(responseEncoding: ResponseEncoding): this {
        return this.set('responseEncoding', responseEncoding);
    }

    public setResponseType(responseType: 'json' | 'text' | 'blob' | 'stream' | 'arrayBuffer' | 'document'): this {
        return this.set('responseType', responseType);
    }

    public setMaxRedirects(maxRedirects: number): this {
        return this.set('maxRedirects', maxRedirects);
    }

    public setRetryDelay(retryDelay: number): this {
        return this.set('retryDelay', retryDelay);
    }

    public setTimeout(timeout: number): this {
        return this.set('timeout', timeout);
    }

   
}