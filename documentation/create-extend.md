[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Create / Extend Request

The `create` method allows you to initialize a new request, while the `extend` method enables you to modify an existing request by adding or updating options like headers.


```js
import nyro from 'nyro';

// Create a new request
var createdRequest = await nyro.create({
    url: 'https://jsonplaceholder.typicode.com/posts'
});

// Send a POST request
createdRequest.post().then(console.log).catch(console.error);

// Extend the request with additional headers
var editedRequestWithHeaders = await createdRequest.extend({
   headers: {
      "User-Agent": "Nyro",
      "Content-Type": "application/json"
   }
});

// Send the modified request
editedRequestWithHeaders.request().then(console.log).catch(console.error);
```