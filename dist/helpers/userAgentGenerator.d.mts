/**
 * A list of predefined User-Agent strings.
 *
 * This list contains various User-Agent strings from different browsers and operating systems.
 * It is used to randomly select a User-Agent string for HTTP requests.
 *
 * @type {string}
 * @constant userAgentList
 * @default userAgentList
 * @returns {string} A list of User-Agent string.
 */
declare function userAgentGenerator(): string;

export { userAgentGenerator };
