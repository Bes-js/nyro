import Core from './services/engine.js';
export { ContentType, Method, ResponseEncoding, ResponseType, StatusCode } from './helpers/types.js';
export { userAgentGenerator } from './helpers/userAgentGenerator.js';
import 'http';

/**
 * @fileoverview Entry point for the requester module.
 *
 * This file imports the main engine from the services directory and exports it as the default export.
 * Additionally, it re-exports all types from the helpers/types module.
 *
 * @module requester
 */

export { Core as default };
