[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Advanced User Agent Generator

The `nyro` library includes an advanced User Agent generator that allows you to specify custom User Agent strings for your HTTP requests. This feature is particularly useful when you want to simulate requests from different browsers or devices.

Here’s how to use the User Agent generator in a `nyro` request:

```js
import nyro, { UserAgent } from 'nyro';

// Sending a POST request with a custom User Agent
const { body } = await nyro({
    url: 'https://jsonplaceholder.typicode.com/posts', // Target URL
    method: 'POST', // Request method
    headers: {
        "User-Agent": UserAgent.generate({
            browser: 'Chrome', // Specify the browser
            os: 'Android', // Specify the operating system
            // device: 'Mi 11 Ultra' // Optional: specify a device
            // version: '123.123.45'
        })
    }
});

console.log(body); // Log the response body
```