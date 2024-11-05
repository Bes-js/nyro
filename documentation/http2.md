[`=> Back To Homepage`](../readme.md)

<br>
<br>

# HTTP/2 Support

With HTTP/2 Support, requests can take advantage of the HTTP/2 protocol, which offers performance improvements such as multiplexing, header compression, and efficient resource usage. Enabling HTTP/2 can lead to faster response times and better network utilization, especially for complex requests with multiple assets.

In the example below, the nyro.get() method sends a request with `useHttp2` set to true, explicitly enabling HTTP/2 for this request. However, since HTTP/2 is enabled by default, omitting `useHttp2` will still result in the request using HTTP/2 unless specified otherwise.

```js
 import nyro from 'nyro';

 const { body } = await nyro.get('https://httpbin.org/get',
 {
    useHttp2: true
 });

 console.log(body);
```

If no value is specified for `useHttp2`, it defaults to true, ensuring that HTTP/2 is used whenever the server supports it. This provides automatic performance enhancements without requiring additional configuration.