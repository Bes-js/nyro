[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Get Alive Proxy & Proxy List

The `nyro` library provides functionality for fetching alive proxies and proxy lists, allowing you to make HTTP requests through these proxies. This can be useful for bypassing geo-restrictions or for scraping purposes where anonymity is needed.

Here's how to retrieve an alive proxy and use it in a `nyro` request:

```js
import nyro, { Proxy } from 'nyro';

// Fetch a single alive proxy
const proxy = await Proxy.getProxy({
    removeProxy: true, // Remove the proxy from the list once used
});

/*
Uncomment to get a list of proxies based on specific criteria
const proxyList = await Proxy.getProxyList({
    country: ['tr', 'us', 'dk'], // List of countries to filter proxies
    anonymity: ['Anonymous', 'Elite'], // Anonymity level
    format: 'json', // Desired response format
    proxy_format: 'protocolipport', // Format for proxy details
    timeout: 7000, // Timeout for proxy requests
});

// Log the list of proxies
console.log(proxyList.proxies?.map((proxy) => `${proxy.protocol}://${proxy.ip}:${proxy.port}`).join('\n'));
*/

// Use the retrieved proxy in a request
const { body } = await nyro({
    url: 'https://jsonplaceholder.typicode.com/posts', // Target URL
    method: 'POST', // Request method
    proxy: {
        host: proxy.ip, // Proxy IP
        port: proxy.port, // Proxy port
        protocol: proxy?.protocol, // Proxy protocol (e.g., http, https)
    }
});

console.log(body); // Log the response body
```