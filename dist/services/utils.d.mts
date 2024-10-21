import { IncomingMessage } from 'http';

/**
 * @file Utility functions for handling HTTP responses and system information.
 */

/**
 * Checks if the socket used for the response was reused.
 *
 * @param res - The HTTP response object.
 * @returns A boolean indicating if the socket was reused, or undefined if the information is not available.
 */
declare function getReusedSocket(res: any): boolean | undefined;
/**
 * Retrieves the IP address of the server from the HTTP response.
 *
 * @param res - The HTTP response object.
 * @returns The server's IP address as a string, or undefined if the information is not available.
 */
declare function getServerIp(res: IncomingMessage): string | undefined;
/**
 * Generates a default User-Agent string based on the current system's platform, architecture, and Node.js version.
 *
 * @returns A string representing the default User-Agent.
 */
declare function getDefaultUserAgent(): string;

export { getDefaultUserAgent, getReusedSocket, getServerIp };
