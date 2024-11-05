[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Proxy Support

The `nyro` library allows you to make HTTP requests through a proxy server. This feature can be useful for various scenarios, such as enhancing privacy, accessing geo-restricted content, or managing network traffic.

Here’s how to configure a proxy with `nyro`:

```js
import nyro from 'nyro';

const { body } = await nyro({
   url: 'https://api.ipify.org', // The URL to request
   method: 'GET', // HTTP method
   proxy: {
      host: '192.168.1.1', // Proxy server host
      port: 8080, // Proxy server port
      protocol: 'http', // Proxy protocol (http or https)
      auth: {
         username: 'user', // Proxy authentication username
         password: 'password' // Proxy authentication password
      }
   }
});

console.log(body);
```