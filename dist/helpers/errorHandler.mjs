/* Package */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/helpers/errorHandler.ts
var _ErrorHandler = class _ErrorHandler extends Error {
  constructor(errorHandlerOptions) {
    var _a;
    super(errorHandlerOptions.message);
    this.name = "NyroError";
    this.requestOptions = errorHandlerOptions.requestOptions;
    this.statusCode = errorHandlerOptions.statusCode;
    this.stack = (_a = errorHandlerOptions.error) == null ? void 0 : _a.stack;
  }
};
__name(_ErrorHandler, "ErrorHandler");
var ErrorHandler = _ErrorHandler;
/* Package */

export { ErrorHandler as default };
//# sourceMappingURL=errorHandler.mjs.map
//# sourceMappingURL=errorHandler.mjs.map