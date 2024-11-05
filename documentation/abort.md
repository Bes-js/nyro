[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Abort / Cancel Request

The `nyro` library provides support for canceling ongoing requests using the `AbortController` interface. This feature allows you to abort a request if it is no longer needed, helping to manage resources effectively and improve the responsiveness of your application.

Here’s how to use the `AbortController` to cancel a request:

```js
import nyro from 'nyro';

var cancelSignal = new AbortController();

// Set a timeout to cancel the request after 5 seconds
setTimeout(() => {
   cancelSignal.abort('Operation canceled by the user.');
}, 5000);

const { body } = await nyro({
   url: 'https://api.ipify.org', // The URL to request
   method: 'GET', // HTTP method
   signal: cancelSignal.signal // Attach the cancel signal
});

console.log(body);
```