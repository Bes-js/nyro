[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Queue Request

A Queue Request allows you to send multiple requests in a specified sequence, managing them as a batch. This feature is helpful when you need to perform several HTTP requests and handle their responses together.

In the example below, `nyro.queue()` is used to send an array of requests sequentially. Each request can be configured individually, including url, method, responseType, and headers. After all requests are completed, the responseList will contain each response, allowing easy access to their body properties.

```js
 import nyro from 'nyro';

 const responseList = await nyro.queue([
      {
         url: 'https://api.ipify.org?format=json',
         method: 'GET',
         responseType: 'json',
         headers: {
            'Content-Type': 'application/json'
         }
      },
      {
         url: 'https://api.ipify.org?format=text',
         method: 'GET',
      }
 ],{ delay: 2000 });

  console.log(responseList.map((res) => res.body));
```