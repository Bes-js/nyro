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

export { combineUrl_default as default };
//# sourceMappingURL=combineUrl.mjs.map
//# sourceMappingURL=combineUrl.mjs.map