'use strict';

/* Package */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/helpers/combineUrl.ts
function combineUrl(baseUrl, url) {
  return url ? baseUrl.replace(/\/+$/, "") + `${baseUrl ? "/" : ""}` + url.replace(/^\/+/, "") : baseUrl;
}
__name(combineUrl, "combineUrl");
var combineUrl_default = combineUrl;
/* Package */

module.exports = combineUrl_default;
//# sourceMappingURL=combineUrl.js.map

module.exports = exports.default;
//# sourceMappingURL=combineUrl.js.map