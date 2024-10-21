/**
* @file /Users/berkanx/Desktop/Projects/requester/src/helpers/types.ts
* @description This file contains various TypeScript enums used for HTTP request and response handling.
*/
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

export { ContentType, Method, ResponseEncoding, ResponseType, StatusCode };
