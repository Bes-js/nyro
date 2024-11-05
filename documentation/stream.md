[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Stream Request

A Stream Request allows you to handle the response data as it arrives in chunks, instead of waiting for the entire response. This is especially useful for large payloads, enabling efficient data handling by processing each part as soon as it’s received.

In the example below, nyro is used with responseType: 'stream' `(or alternatively, isStream: true)` to initiate a stream request. Once data begins streaming, you can process each chunk using events or a callback function.

<br>

```js
 import nyro from 'nyro';

 const { body } = await nyro({
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'GET',
    responseType: 'stream'
    /* Or You Can Use isStream?: boolean */
 });

 body.on('data',(chunk) => {
    console.log(chunk.toString());
 });
```

<br>

Another Use Stream Request With Callback.

<br>

```js
 import nyro from 'nyro';

 await nyro({
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'GET',
    isStream: true,
    onChunk: (chunk) => {
        console.log(chunk.toString());
    }
 });
```