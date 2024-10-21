import os from 'os';

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
  const platform = os.platform();
  const arch = os.arch();
  const nodeVersion = process.version;
  return `Nyro/0.0.1 (${platform}; ${arch} ${nodeVersion})`;
}
__name(getDefaultUserAgent, "getDefaultUserAgent");
/* Package */

export { getDefaultUserAgent, getReusedSocket, getServerIp };
//# sourceMappingURL=utils.mjs.map
//# sourceMappingURL=utils.mjs.map