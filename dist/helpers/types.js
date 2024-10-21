'use strict';

/* Package */

// src/helpers/types.ts
var Method = /* @__PURE__ */ ((Method2) => {
  Method2["Get"] = "GET";
  Method2["Post"] = "POST";
  Method2["Put"] = "PUT";
  Method2["Patch"] = "PATCH";
  Method2["Delete"] = "DELETE";
  Method2["Head"] = "HEAD";
  Method2["Options"] = "OPTIONS";
  Method2["Connect"] = "CONNECT";
  Method2["Trace"] = "TRACE";
  return Method2;
})(Method || {});
var ResponseEncoding = /* @__PURE__ */ ((ResponseEncoding2) => {
  ResponseEncoding2["Utf8"] = "utf8";
  ResponseEncoding2["Ascii"] = "ascii";
  ResponseEncoding2["Base64"] = "base64";
  ResponseEncoding2["Hex"] = "hex";
  ResponseEncoding2["Latin1"] = "latin1";
  ResponseEncoding2["Binary"] = "binary";
  ResponseEncoding2["Utf16Le"] = "utf16le";
  ResponseEncoding2["Utf16Le2"] = "utf-16le";
  ResponseEncoding2["Ucs2"] = "ucs2";
  ResponseEncoding2["Ucs22"] = "ucs-2";
  ResponseEncoding2["Base64Url"] = "base64url";
  return ResponseEncoding2;
})(ResponseEncoding || {});
var ContentType = /* @__PURE__ */ ((ContentType2) => {
  ContentType2["Json"] = "application/json";
  ContentType2["Xml"] = "application/xml";
  ContentType2["UrlEncoded"] = "application/x-www-form-urlencoded";
  ContentType2["FormData"] = "multipart/form-data";
  ContentType2["Text"] = "text/plain";
  ContentType2["OctetStream"] = "application/octet-stream";
  ContentType2["Default"] = "application/json";
  return ContentType2;
})(ContentType || {});
var ResponseType = /* @__PURE__ */ ((ResponseType2) => {
  ResponseType2["Json"] = "json";
  ResponseType2["Text"] = "text";
  ResponseType2["Blob"] = "blob";
  ResponseType2["Stream"] = "stream";
  ResponseType2["ArrayBuffer"] = "arrayBuffer";
  ResponseType2["Document"] = "document";
  ResponseType2["Default"] = "json";
  return ResponseType2;
})(ResponseType || {});
var StatusCode = /* @__PURE__ */ ((StatusCode2) => {
  StatusCode2[StatusCode2["Continue"] = 100] = "Continue";
  StatusCode2[StatusCode2["SwitchingProtocols"] = 101] = "SwitchingProtocols";
  StatusCode2[StatusCode2["Processing"] = 102] = "Processing";
  StatusCode2[StatusCode2["EarlyHints"] = 103] = "EarlyHints";
  StatusCode2[StatusCode2["Ok"] = 200] = "Ok";
  StatusCode2[StatusCode2["Created"] = 201] = "Created";
  StatusCode2[StatusCode2["Accepted"] = 202] = "Accepted";
  StatusCode2[StatusCode2["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
  StatusCode2[StatusCode2["NoContent"] = 204] = "NoContent";
  StatusCode2[StatusCode2["ResetContent"] = 205] = "ResetContent";
  StatusCode2[StatusCode2["PartialContent"] = 206] = "PartialContent";
  StatusCode2[StatusCode2["MultiStatus"] = 207] = "MultiStatus";
  StatusCode2[StatusCode2["AlreadyReported"] = 208] = "AlreadyReported";
  StatusCode2[StatusCode2["ImUsed"] = 226] = "ImUsed";
  StatusCode2[StatusCode2["MultipleChoices"] = 300] = "MultipleChoices";
  StatusCode2[StatusCode2["MovedPermanently"] = 301] = "MovedPermanently";
  StatusCode2[StatusCode2["Found"] = 302] = "Found";
  StatusCode2[StatusCode2["SeeOther"] = 303] = "SeeOther";
  StatusCode2[StatusCode2["NotModified"] = 304] = "NotModified";
  StatusCode2[StatusCode2["UseProxy"] = 305] = "UseProxy";
  StatusCode2[StatusCode2["Unused"] = 306] = "Unused";
  StatusCode2[StatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
  StatusCode2[StatusCode2["PermanentRedirect"] = 308] = "PermanentRedirect";
  StatusCode2[StatusCode2["BadRequest"] = 400] = "BadRequest";
  StatusCode2[StatusCode2["Unauthorized"] = 401] = "Unauthorized";
  StatusCode2[StatusCode2["PaymentRequired"] = 402] = "PaymentRequired";
  StatusCode2[StatusCode2["Forbidden"] = 403] = "Forbidden";
  StatusCode2[StatusCode2["NotFound"] = 404] = "NotFound";
  StatusCode2[StatusCode2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
  StatusCode2[StatusCode2["NotAcceptable"] = 406] = "NotAcceptable";
  StatusCode2[StatusCode2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
  StatusCode2[StatusCode2["RequestTimeout"] = 408] = "RequestTimeout";
  StatusCode2[StatusCode2["Conflict"] = 409] = "Conflict";
  StatusCode2[StatusCode2["Gone"] = 410] = "Gone";
  StatusCode2[StatusCode2["LengthRequired"] = 411] = "LengthRequired";
  StatusCode2[StatusCode2["PreconditionFailed"] = 412] = "PreconditionFailed";
  StatusCode2[StatusCode2["PayloadTooLarge"] = 413] = "PayloadTooLarge";
  StatusCode2[StatusCode2["UriTooLong"] = 414] = "UriTooLong";
  StatusCode2[StatusCode2["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
  StatusCode2[StatusCode2["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
  StatusCode2[StatusCode2["ExpectationFailed"] = 417] = "ExpectationFailed";
  StatusCode2[StatusCode2["ImATeapot"] = 418] = "ImATeapot";
  StatusCode2[StatusCode2["MisdirectedRequest"] = 421] = "MisdirectedRequest";
  StatusCode2[StatusCode2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
  StatusCode2[StatusCode2["Locked"] = 423] = "Locked";
  StatusCode2[StatusCode2["FailedDependency"] = 424] = "FailedDependency";
  StatusCode2[StatusCode2["TooEarly"] = 425] = "TooEarly";
  StatusCode2[StatusCode2["UpgradeRequired"] = 426] = "UpgradeRequired";
  StatusCode2[StatusCode2["PreconditionRequired"] = 428] = "PreconditionRequired";
  StatusCode2[StatusCode2["TooManyRequests"] = 429] = "TooManyRequests";
  StatusCode2[StatusCode2["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
  StatusCode2[StatusCode2["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
  StatusCode2[StatusCode2["InternalServerError"] = 500] = "InternalServerError";
  StatusCode2[StatusCode2["NotImplemented"] = 501] = "NotImplemented";
  StatusCode2[StatusCode2["BadGateway"] = 502] = "BadGateway";
  StatusCode2[StatusCode2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
  StatusCode2[StatusCode2["GatewayTimeout"] = 504] = "GatewayTimeout";
  StatusCode2[StatusCode2["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
  StatusCode2[StatusCode2["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
  StatusCode2[StatusCode2["InsufficientStorage"] = 507] = "InsufficientStorage";
  StatusCode2[StatusCode2["LoopDetected"] = 508] = "LoopDetected";
  StatusCode2[StatusCode2["NotExtended"] = 510] = "NotExtended";
  StatusCode2[StatusCode2["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
  return StatusCode2;
})(StatusCode || {});
/* Package */

exports.ContentType = ContentType;
exports.Method = Method;
exports.ResponseEncoding = ResponseEncoding;
exports.ResponseType = ResponseType;
exports.StatusCode = StatusCode;
//# sourceMappingURL=types.js.map
//# sourceMappingURL=types.js.map