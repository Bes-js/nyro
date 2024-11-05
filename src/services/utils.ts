import packageJson from '../../package.json'; 

/**
 * @file Utility functions for handling HTTP responses and system information.
 */

import { IncomingMessage } from 'http';
import os from 'os';

/**
 * Checks if the socket used for the response was reused.
 * 
 * @param res - The HTTP response object.
 * @returns A boolean indicating if the socket was reused, or undefined if the information is not available.
 */
export function getReusedSocket(res: any): boolean | undefined {
    return res?.reusedSocket;
};

/**
 * Retrieves the IP address of the server from the HTTP response.
 * 
 * @param res - The HTTP response object.
 * @returns The server's IP address as a string, or undefined if the information is not available.
 */
export function getServerIp(res: IncomingMessage): string | undefined {
    const socket = res?.socket || res?.connection;
    return socket ? socket.remoteAddress : undefined;
};

/**
 * Generates a default User-Agent string based on the current system's platform, architecture, and Node.js version.
 * 
 * @returns A string representing the default User-Agent.
 */
export function getDefaultUserAgent(): string {
    const platform = os.platform();
    const arch = os.arch();
    const nodeVersion = process.version;

    return `Nyro/${packageJson.version} (${platform}; ${arch} ${nodeVersion})`;
};

/**
 * Generates a unique ID based on the current timestamp and a random number.
 * 
 * @returns A unique ID string.
 * @example generateUniqueId() // 'id-1633456789000-123456'
 */
export function generateUniqueId(): string {
    return 'nyro-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
};