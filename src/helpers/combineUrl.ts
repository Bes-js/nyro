/**
 * Combines a base URL with a relative URL, ensuring that there is exactly one slash between them.
 *
 * @param baseUrl - The base URL to which the relative URL will be appended.
 * @param url - The relative URL to append to the base URL.
 * @param path - The path to append to the combined URL.
 * @returns The combined URL as a string.
 */
function combineUrl(baseUrl: string, url: string, path: string): string {
  var fullUrl = `${baseUrl || ''}${url || ''}${path || ''}`;

    if (fullUrl.trim().endsWith('/')) fullUrl = fullUrl.slice(0,-1);
    
    return fullUrl;
};

export default combineUrl;