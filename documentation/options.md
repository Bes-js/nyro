[`=> Back To Homepage`](../readme.md)

<br>
<br>


# RequestOptions

This interface allows you to configure the HTTP request with customizable properties. Here’s a breakdown of the available options:

**Returns:** <code>Promise<[HttpResponse<T, B>](response.md)></code>

### Options

- `requestId?: string`
  - [x] **Description:** An optional unique identifier for the request, used for tracking purposes.

- `method?: ('GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE' & string)`
  - [x] **Description:** The HTTP method used in the request, such as 'GET' or 'POST'.

- `port?: number`
  - [x] **Description:** The port number to connect to on the server, if not the default (80 for HTTP, 443 for HTTPS).

- `url?: string`
  - [x] **Description:** The full URL for the request.

- `path?: string`
  - [x] **Description:** A relative path appended to the base URL for the request.

- `headers?: (Headers & Record<string, string>)`
  - [x] **Description:** Headers to include in the request, such as authorization tokens or content type.

- `body?: any`
  - [x] **Description:** The body data to send in a request, applicable for methods like POST and PUT.

- `timeout?: number`
  - [x] **Description:** Sets a timeout (in milliseconds) for the request.

- `params?: Record<string, string>`
  - [x] **Description:** Query parameters to append to the URL.

- `baseURL?: string`
  - [x] **Description:** The base URL for the request. Other parts of the URL will be appended to this.

- `query?: Record<string, string | number | boolean>`
  - [x] **Description:** Additional query parameters, similar to `params`.

- `responseType?: ('json' | 'text' | 'blob' | 'stream' | 'arrayBuffer' | 'document' & string)`
  - [x] **Description:** Specifies the type of response data expected (e.g., JSON, text, blob).

- `responseEncoding?: BufferEncoding`
  - [x] **Description:** Encoding used for the response body.

- `timeoutErrorMessage?: string`
  - [x] **Description:** Custom error message displayed when the request times out.

- `onTimeout?: () => void`
  - [x] **Description:** A callback function that executes if the request times out.

- `isStream?: boolean`
  - [x] **Description:** Set to true if the request should return a stream.

- `useHttp2?: boolean`
  - [x] **Description:** Enables HTTP/2 for the request if supported.

- `validateStatus?: (status: number) => boolean`
  - [x] **Description:** Function to determine whether a response status code is valid.

- `decompress?: boolean`
  - [x] **Description:** Set to false to disable automatic response decompression.

- `proxy?: ProxyOptions`
  - [x] **Description:** Proxy configuration for the request.

- `maxRedirects?: number`
  - [x] **Description:** Sets the maximum number of redirects to follow.

- `auth?: AuthOptions`
  - [x] **Description:** Authentication details to include in the request, such as username and password.

- `maxBodyLength?: number`
  - [x] **Description:** Maximum length for request body, in bytes.

- `maxContentLength?: number`
  - [x] **Description:** Maximum length for response content, in bytes.

- `maxRate?: number`
  - [x] **Description:** Throttle limit for request rate.

- `signal?: AbortSignal`
  - [x] **Description:** An `AbortSignal` object to cancel the request if needed.

- `bodySchema?: B`
  - [x] **Description:** Schema for the request body to ensure data validation.

- `cache?: boolean`
  - [x] **Description:** Enables caching if set to true.

- `cacheTTL?: number`
  - [x] **Description:** Time-to-live for the cache, in milliseconds.

- `retries?: number`
  - [x] **Description:** Number of retry attempts if the request fails.

- `retryDelay?: number`
  - [x] **Description:** Delay between retry attempts, in milliseconds.

- `onRetry?: (req: http.RequestOptions, error: Error) => boolean`
  - [x] **Description:** Callback function that executes before each retry attempt.

- `onDownloadProgress?: (progress: { percent: number; transferredBytes: number; totalBytes: number; }) => void`
  - [x] **Description:** Callback function for tracking download progress.

- `onRequest?: (options: RequestOptions<B>) => RequestOptions<B> | void`
  - [x] **Description:** Hook to modify request options before sending.

- `onResponse?: (response: HttpResponse<any, BodyFromSchema<B, RequestOptions>>) => HttpResponse<any, BodyFromSchema<B, RequestOptions>> | void`
  - [x] **Description:** Hook to modify the response before it’s returned.

- `onRedirect?: (response: http.IncomingMessage) => void`
  - [x] **Description:** Callback function executed upon each redirect.

- `onChunk?: (chunk: Buffer) => Buffer | void`
  - [x] **Description:** The `onChunk` function is a callback that is executed whenever a chunk of data is received. This function is typically used in streaming or data processing scenarios where data is received in segments rather than all at once. The `onChunk` function allows for handling each segment of data as it arrives, enabling real-time processing or incremental data handling.

- `sslOptions?: { key?: Buffer; cert?: Buffer; ca?: Buffer; rejectUnauthorized?: boolean; secureProtocol?: ('SSLv2_method' | 'SSLv3_method' | 'TLSv1_method' | 'TLSv1_1_method' | 'TLSv1_2_method' | 'TLSv1_3_method' & string); ciphers?: string; passphrase?: string; }`
  - [x] **Description:** SSL configuration options, including certificate details, protocols, and passphrase.

- `defaultMode?: boolean`
  - [x] **Description:** Sets the request to default mode if true, If default mode is enabled, events and event functions will not be triggered on the request you send.

