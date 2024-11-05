/**
 * @fileoverview Entry point for the requester module.
 * 
 * This file imports the main engine from the services directory and exports it as the default export.
 * Additionally, it re-exports all types from the helpers/types module.
 * 
 * @module requester
 */

import NyroClass, {
    RequestInfo,
    RequestOptions as OptionsInterface,
    HttpResponse as ResponseInterface,
    Headers as HeadersInterface,
    InferBodySchema,
    BodyFromSchema,
    Events,
    QueueOptions,
    PaginationOptions,
    AuthOptions,
    ProxyOptions
} from './services/engine';
import Headers from './services/headersConstructor';
import Options from './services/optionsConstructor';
import NyroError, { isNyroError, NyroErrorInterface, NyroErrorResponse } from './helpers/errorHandler';
import checkVersion from './helpers/checkVersion';
import Proxy, {
    Protocol,
    ProxyAPIOptions,
    ProxyAPIResponse,
    ProxyObject,
    ProxyFetchOptions,
    ProxyFormat,
    ProxyFilterOptions,
    OmitedProxyAPIResponse,
    Anonymity,
    Country,
    Format
} from './services/proxyManager';
import UserAgent, {
    AndroidVersions,
    ChromeVersions,
    SafariVersions,
    UserAgentBrowser,
    UserAgentDevice,
    UserAgentOS,
    GenerateUserAgentOptions,
    generateAndroid,
    generateChrome,
    generateEdge,
    generateFirefox,
    generateSafari,
    getRandomVersion,
} from './services/userAgentConstuctor';
import PluginManager, { Plugin as PluginInterface } from './services/pluginManager';

var Nyro = new NyroClass();

const {
    version,
    pkg
} = NyroClass;
const { 
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
    request,
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
const nyro = Object.assign(async <T, B>(options: OptionsInterface<B>) => {
    return Nyro.request({ ...Nyro.baseRequestOptions, ...options}) as Promise<ResponseInterface<any, BodyFromSchema<B,OptionsInterface>>>
}, Nyro);


/* Nyro Method Functions */
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
nyro.request = request;
nyro.create = create;
nyro.download = download;
nyro.queue = queue;
nyro.pagination = pagination;
nyro.use = use;

/* Nyro Events */
(nyro as any).on = on;
(nyro as any).off = off;
(nyro as any).once = once;
(nyro as any).emit = emit;
(nyro as any).eventNames = eventNames;
(nyro as any).removeListener = removeListener;
(nyro as any).removeAllListeners = removeAllListeners;
(nyro as any).listenerCount = listenerCount;
(nyro as any).listeners = listeners;
(nyro as any).addListener = addListener;
(nyro as any).getMaxListeners = getMaxListeners;
(nyro as any).rawListeners = rawListeners;
(nyro as any).setMaxListeners = setMaxListeners;
(nyro as any).prependListener = prependListener;
(nyro as any).prependOnceListener = prependOnceListener;


NyroClass.version = version;
NyroClass.pkg = pkg;

/**
 * @description Check for updates to the Nyro package.
 *  
 * @param {NyroClass} nyro - The Nyro instance to check for updates.
 * @param {string} version - The current version of the Nyro package.
 * @param {boolean} checkUpdates - Whether or not to check for updates.
 */
checkVersion(nyro, version, true);

type NyroType = typeof nyro;

export default nyro;
import {
    ContentType,
    StatusCode,
    Method,
    ResponseEncoding,
    ResponseType,
} from './helpers/types';
export { 
    Nyro,
    NyroType,
    request,
    extend,
    get,
    post,
    put,
    patch,
    _delete as delete,
    head,
    options,
    connect,
    trace,
    RequestInfo,
    Options,
    OptionsInterface,
    ResponseInterface,
    Headers,
    HeadersInterface,
    InferBodySchema,
    BodyFromSchema,
    version,
    NyroError,
    NyroErrorInterface,
    NyroErrorResponse,
    isNyroError,
    Proxy,
    Protocol,
    ProxyAPIOptions,
    ProxyAPIResponse,
    ProxyObject,
    ProxyFetchOptions,
    ProxyFormat,
    ProxyFilterOptions,
    OmitedProxyAPIResponse,
    Anonymity,
    Country,
    Format,
    UserAgent,
    AndroidVersions,
    ChromeVersions,
    SafariVersions,
    UserAgentBrowser,
    UserAgentDevice,
    UserAgentOS,
    GenerateUserAgentOptions,
    generateAndroid,
    generateChrome,
    generateEdge,
    generateFirefox,
    generateSafari,
    getRandomVersion,
    PluginManager as Plugin,
    PluginInterface,
    ContentType,
    StatusCode,
    Method,
    ResponseEncoding,
    ResponseType,
    Events,
    QueueOptions,
    PaginationOptions,
    AuthOptions,
    ProxyOptions
 };