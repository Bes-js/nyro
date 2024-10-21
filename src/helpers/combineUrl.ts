/**
 * Combines a base URL with a relative URL, ensuring that there is exactly one slash between them.
 *
 * @param baseUrl - The base URL to which the relative URL will be appended.
 * @param url - The relative URL to append to the base URL.
 * @returns The combined URL as a string.
 */
function combineUrl(baseUrl: string, url: string): string {
  return url
    ? baseUrl.replace(/\/+$/, '') + `${baseUrl ? '/' : ''}` + url.replace(/^\/+/, '')
    : baseUrl;
};

export default combineUrl;