'use strict';

var os = require('os');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var os__default = /*#__PURE__*/_interopDefault(os);

/* Package */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function getReusedSocket(res) {
  return res == null ? void 0 : res.reusedSocket;
}
__name(getReusedSocket, "getReusedSocket");
function getServerIp(res) {
  const socket = (res == null ? void 0 : res.socket) || (res == null ? void 0 : res.connection);
  return socket ? socket.remoteAddress : void 0;
}
__name(getServerIp, "getServerIp");
function getDefaultUserAgent() {
  const platform = os__default.default.platform();
  const arch = os__default.default.arch();
  const nodeVersion = process.version;
  return `Nyro/0.0.1 (${platform}; ${arch} ${nodeVersion})`;
}
__name(getDefaultUserAgent, "getDefaultUserAgent");
/* Package */

exports.getDefaultUserAgent = getDefaultUserAgent;
exports.getReusedSocket = getReusedSocket;
exports.getServerIp = getServerIp;
//# sourceMappingURL=utils.js.map
//# sourceMappingURL=utils.js.map