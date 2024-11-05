[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Caching Requests

The `nyro` library supports caching of HTTP requests to improve performance and reduce unnecessary network traffic. By enabling caching, responses can be stored temporarily and reused for subsequent requests, which can be particularly useful for frequently accessed resources.

Here’s how to implement caching with `nyro`:

```js
import nyro from 'nyro';

const { body } = await nyro({
   url: 'https://api.ipify.org',
   method: 'GET',
   cache: true, // Enable caching
   cacheTTL: 30 * 1000, // Cache Time-To-Live in milliseconds (30 seconds)
});

console.log(body);
```