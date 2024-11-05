 /**
 * @file /Users/berkanx/Desktop/Projects/requester/src/helpers/types.ts
 * @description This file contains various TypeScript enums used for HTTP request and response handling.
 */


 export interface Headers {
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
};


 export type UserAgentDevice = ('SM-T210' | 'SM-G900F' | 'SM-G920F' | 'SM-G930F' | 'SM-G950F' | 'SM-G960F' | 'SM-G970F' | 'SM-G973F' | 'SM-G975F' | 'SM-G980F' | 'SM-G985F' | 'SM-G988B' | 'SM-N9005' | 'SM-N910F' | 'SM-N920C' | 'SM-N950F' | 'SM-N960F' | 'SM-N970F' | 'SM-N975F' | 'SM-N980F' | 'SM-N985F' | 'SM-N986B' | 'iPhone' | 'iPad' | 'iPod touch' | 'Nexus 5' | 'Nexus 7' | 'Nexus 10' | 'Nexus 4' | 'Nexus 6' | 'Nexus 9' | 'Nexus 5X' | 'Nexus 6P' | 'Nexus 7 (2013)' | 'Nexus 9 (2014)' | 'Nexus 10 (2012)' | 'Nexus 4 (2012)' | 'Nexus 6 (2014)' | 'Nexus 5X (2015)' | 'Nexus 6P (2015)' | 'Mi 9' | 'Mi 9 SE' | 'Mi 9T' | 'Mi 9T Pro' | 'Mi 10' | 'Mi 10 Pro' | 'Mi 10T' | 'Mi 10T Pro' | 'Mi 11' | 'Mi 11 Lite' | 'Mi 11 Ultra' | 'Redmi Note 8' | 'Redmi Note 8 Pro' | 'Redmi Note 9' | 'Redmi Note 9 Pro' | 'Redmi Note 10' | 'Redmi Note 10 Pro' | 'Redmi Note 11' | 'Redmi Note 11 Pro' | 'Poco F1' | 'Poco F2 Pro' | 'Poco X3' | 'Poco X3 Pro' | 'Poco M3' | 'Poco M3 Pro' & Record<string,string>);

 export type UserAgentOS = ('Windows' | 'Mac OS' | 'Linux' | 'Android' | 'iOS' & string);

 export type UserAgentBrowser = ('Chrome' | 'Firefox' | 'Safari' | 'Opera' | 'Edge' | 'IE' & Record<string,string>);


 export interface GenerateUserAgentOptions {
    browser?: (UserAgentBrowser & string);
    version?: string;
    os?: (UserAgentOS & string);
    device?: (UserAgentDevice);
 };



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
 export enum Method {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
    Head = 'HEAD',
    Options = 'OPTIONS',
    Connect = 'CONNECT',
    Trace = 'TRACE',
  };


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
 export enum ResponseEncoding {
    Utf8 = 'utf8',
    Ascii = 'ascii',
    Base64 = 'base64',
    Hex = 'hex',
    Latin1 = 'latin1',
    Binary = 'binary',
    Utf16Le = 'utf16le',
    Utf16Le2 = 'utf-16le',
    Ucs2 = 'ucs2',
    Ucs22 = 'ucs-2',
    Base64Url = 'base64url',
  };

  
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
  export enum ContentType {
    Json = 'application/json',
    Xml = 'application/xml',
    UrlEncoded = 'application/x-www-form-urlencoded',
    FormData = 'multipart/form-data',
    Text = 'text/plain',
    OctetStream = 'application/octet-stream',
    Default = 'application/json',
  };


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
 export enum ResponseType {
    Json = 'json',
    Text = 'text',
    Blob = 'blob',
    Stream = 'stream',
    ArrayBuffer = 'arrayBuffer',
    Document = 'document',
    Default = 'json',
  };


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
  export enum StatusCode {
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
    NetworkAuthenticationRequired = 511,
  };