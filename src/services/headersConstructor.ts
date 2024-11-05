import { Headers as HeadersInterface } from './engine';

export default class Headers {
    private headers: (HeadersInterface & Record<string,string>) = { };

    public constructor(headers?: HeadersInterface) {
        if (headers) {
            this.setFromObject(headers);
        }
    }

    public toJSON(): { [key: string]: string } {
        return this.headers;
    };

    public set(key: (keyof HeadersInterface & string), value: string): this {
        if (!this.headers[key]) {
            this.headers[key] = value;
        }
        return this;
    }

    public get(key: (keyof HeadersInterface & string)): string | undefined {
        return this.headers[key];
    }

    public delete(key: (keyof HeadersInterface & string)): this {
        delete this.headers[key];
        return this;
    }

    public all(): HeadersInterface {
        return this.headers;
    }

    public clear(): this {
        this.headers = {};
        return this;
    }

    public has(key: (keyof HeadersInterface & string)): boolean {
        return this.headers.hasOwnProperty(key);
    }

    public setFromObject(headers: HeadersInterface): this {
        this.headers = { ...this.headers, ...headers };
        return this;
    }

    public setFromHeaders(headers: Headers): this {
        this.setFromObject(headers.all());
        return this;
    }

    public setUserAgent(userAgent: string): this {
        return this.set('User-Agent', userAgent);
    }

    public setContentType(contentType: string): this {
        return this.set('Content-Type', contentType);
    }

    public setAccept(accept: string): this {
        return this.set('Accept', accept);
    }

    public setAuthorization(authorization: string): this {
        return this.set('Authorization', authorization);
    }

    public setBearerToken(token: string): this {
        return this.setAuthorization(`Bearer ${token}`);
    }

    public setBasicAuth(username: string, password: string): this {
        return this.setAuthorization(`Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`);
    }

    public setBearerAuth(token: string): this {
        return this.setAuthorization(`Bearer ${token}`);
    }

    public setReferer(referer: string): this {
        return this.set('Referer', referer);
    }

    public setOrigin(origin: string): this {
        return this.set('Origin', origin);
    }

    public setHost(host: string): this {
        return this.set('Host', host);
    }

    public setConnection(connection: string): this {
        return this.set('Connection', connection);
    }

    public setAcceptEncoding(acceptEncoding: string): this {
        return this.set('Accept-Encoding', acceptEncoding);
    }

    public setAcceptLanguage(acceptLanguage: string): this {
        return this.set('Accept-Language', acceptLanguage);
    }

    public setResponseType(responseType: string): this {
        return this.set('Response-Type', responseType);
    }

    public setCacheControl(cacheControl: string): this {
        return this.set('Cache-Control', cacheControl);
    }

    public setCookie(cookie: string): this {
        return this.set('Cookie', cookie);
    }

    public setDNT(dnt: string): this {
        return this.set('DNT', dnt);
    }

    public setPragma(pragma: string): this {
        return this.set('Pragma', pragma);
    }
}