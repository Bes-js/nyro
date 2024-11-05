[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Error Handling

The `nyro` library provides mechanisms for error handling that help you manage and respond to errors during HTTP requests. This includes both catching errors directly from request calls and listening for global error events.

Here's how to handle errors with `nyro`:

```js
import nyro from 'nyro';

// Handling errors from a specific request
await nyro.post('https://httpbin.org/get').catch((error) => {
    console.log(error.message); // Log the error message
});

// Global error listener
nyro.on('error', (error) => {
    console.log(error.statusCode, error.statusText); // Log the error status code and status text
});
```