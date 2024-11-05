[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Layer7 Attack 🤪 (Anonymous Request 👻)

**Warning: Using `nyro` to perform Layer7 attacks is strictly prohibited. The authors of `nyro` are not responsible for any malicious activities or illegal actions carried out using this library. Please ensure that your use of this library complies with applicable laws and regulations.**

Here's an example of how to use `nyro` for making a request with a randomly selected proxy and a user agent header. This example is provided for educational purposes only:

```js
import nyro, { UserAgent, Proxy } from 'nyro';

// Fetch a proxy
const proxy = await Proxy.getProxy();
if(!proxy) return; // Exit if no proxy is available

// Make a request through the proxy
const { body } = await nyro({
    url: 'https://jsonplaceholder.typicode.com/posts', // Target URL
    method: 'POST', // Request method
    headers: {
        "User-Agent": UserAgent.generate({
            browser: 'Chrome' // Set the user agent to mimic a Chrome browser
        })
    },
    proxy: {
        host: proxy.ip, // Proxy IP
        port: proxy.port, // Proxy port
        protocol: proxy?.protocol, // Proxy protocol (e.g., http, https)
    }
});

console.log(body); // Log the response body
```