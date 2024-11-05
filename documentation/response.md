[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Response

The `HttpResponse` interface represents the structure of a response object returned by `nyro` requests. It contains detailed information about the HTTP response, including the request and response metadata, the response body, headers, and other details for comprehensive insight into each HTTP interaction.

### Response Structure

- **requestId: `string`**
  - [x] A unique identifier associated with the request for tracking purposes.

- **body: `(BodyFromSchema<B, RequestOptions>)`**
  - [x] Contains the main content of the response, structured according to the body schema defined in `RequestOptions`.

- **statusCode: `number`**
  - [x] The HTTP status code of the response (e.g., 200 for success, 404 for not found).

- **statusText: `string`**
  - [x] The HTTP status text associated with the status code (e.g., "OK" for 200).

- **headers: `(Headers & Record<string, string | string[]>)`**
  - [x] An object containing the response headers.

- **config: `RequestOptions<B>`**
  - [x] The configuration options that were used for the request.

- **request: `http.ClientRequest`**
  - [x] The underlying HTTP request object.

- **requestInfo: `RequestInfo`**
  - [x] Information about the request, such as URL and method.

- **response: `http.IncomingMessage`**
  - [x] The HTTP response message object containing the raw response data.

- **timestamp: `{ startTimestamp: number; endTimestamp: number; }`**
  - [x] Timestamps marking the start and end of the request.

- **responseTime: `number`**
  - [x] The time taken to receive the response, in milliseconds.

- **responseSize: `number`**
  - [x] The size of the response content, in bytes.

- **serverIp?: `string`**
  - [x] The IP address of the server that provided the response.

- **connectionReused: `boolean`**
  - [x] Indicates if the connection was reused for the request.

- **isStream?: `boolean`**
  - [x] Specifies if the response was received as a stream.

- **isCached?: `boolean`**
  - [x] Indicates if the response was served from cache.