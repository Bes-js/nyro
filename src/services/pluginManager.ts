import { RequestOptions, HttpResponse } from './engine';
import ErrorHandler from '../helpers/errorHandler';

export interface Plugin {
    name: string;
    onRequest?: <B>(options: RequestOptions<B>) => RequestOptions<B> | void;
    onResponse?: <T,B>(response: HttpResponse<T,B>) => HttpResponse<T,B> | void;
    onError?: (error: ErrorHandler) => ErrorHandler | void;
}

export default class PluginManager {
    private plugins: Plugin[] = [];

    use(plugin: Plugin, notification?: boolean): void {
        if(!plugin.name) throw new Error('Plugin must have a name.');
        if(this.plugins.find(p => p.name === plugin.name)) throw new Error(`Plugin with name "${plugin.name}" already exists.`);
        if(!plugin.onRequest && !plugin.onResponse && !plugin.onError) throw new Error('Plugin must have at least one method.');
        if(plugin.onRequest && typeof plugin.onRequest !== 'function') throw new Error('onRequest must be a function.');
        if(plugin.onResponse && typeof plugin.onResponse !== 'function') throw new Error('onResponse must be a function.');
        if(plugin.onError && typeof plugin.onError !== 'function') throw new Error('onError must be a function.');
        if(notification === undefined) notification = true;
        if(notification) console.log(
           `\x1b[95;5;5mPlugin\x1b[0m \x1b[38;5;119m'${plugin.name}'\x1b[0m \x1b[95;5;5mhas been successfully loaded and activated.\x1b[0m`
        );

        this.plugins.push(plugin);
    };

    applyOnRequest<B>(options: RequestOptions<B>): RequestOptions<B> {
        for (const plugin of this.plugins) {
            if (plugin.onRequest) {
                options = plugin.onRequest(options) || options;
            }
        }
        return options;
    }

    applyOnResponse<T,B>(response: HttpResponse<T,B>): HttpResponse<T,B> {
        for (const plugin of this.plugins) {
            if (plugin.onResponse) {
                response = plugin.onResponse(response) || response;
            }
        }
        return response;
    }

    applyOnError(error: ErrorHandler): ErrorHandler {
        for (const plugin of this.plugins) {
            if (plugin.onError) {
                error = plugin.onError(error) || error;
            }
        }
        return error;
    }

};