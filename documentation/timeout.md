[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Timeout

The timeout feature in `nyro` allows you to specify a maximum duration for a request. If the request exceeds this duration, it will be aborted, and you can handle the timeout accordingly. This is useful for preventing your application from hanging indefinitely when waiting for a response from a server.

Here’s an example of how to use the timeout feature with a custom error message and a timeout callback:

```js
import nyro from 'nyro';

await nyro.get('https://httpbin.org/get', {
    timeout: 7500, // Set the timeout duration to 7500 milliseconds (7.5 seconds)
    timeoutErrorMessage: 'Request timed out', // Custom error message for timeout
    onTimeout() {
        console.log('Request timed out'); // Callback function executed on timeout
    },
}).catch((error) => {
    console.log(error.message); // Logs the timeout error message
    /* Request timed out */
});
```