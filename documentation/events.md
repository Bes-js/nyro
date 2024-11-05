[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Events & Callbacks

The `nyro` library provides a robust events and callbacks system that allows you to hook into various stages of the HTTP request and response lifecycle. This feature enhances your ability to manage requests, track progress, and handle errors effectively.

### Example Usage

Here’s an example of how to use events and callbacks with `nyro`:

```js
import nyro from 'nyro';

const { body } = await nyro({
    url: 'https://api.ipify.org',
    method: 'GET',
    onChunk(chunk) {
        console.log(chunk); // Log each chunk of data received
    },
    onDownloadProgress(progress) {
        console.log(
            progress.percent,         // Percentage of download completion
            progress.totalBytes,     // Total bytes to be downloaded
            progress.transferredBytes // Bytes already downloaded
        );
    },
    onRedirect(response) {
        console.log(response); // Log the redirect response
    },
    onRequest(options) {
        console.log(options); // Log the request options before sending

        options.isStream = true; // Set the request to return a stream
        
        return options; // Return the modified options
    },
    onResponse(response) {
        response.body = response.body.split('\n')[0]; // Process the response body
        return response; // Return the modified response
    },
    onRetry(req, error) {
        console.log(req, error); // Log the request and error information on retry
        return true; // Return true to retry the request
    },
    onTimeout() {
        console.log('Request timed out'); // Log a message when the request times out
    },
});

// Global event listeners
nyro.on('beforeRequest', (options) => {
    console.log('beforeRequest', options); // Log options before any request is sent
});

nyro.on('afterResponse', (response) => {
    console.log('afterResponse', response); // Log the response after it is received
});

nyro.on('error', (error) => {
    console.log('error', error.message); // Log error messages
});
```