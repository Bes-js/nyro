[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Retry

The retry feature in `nyro` allows you to automatically attempt a request again if it fails due to transient issues, such as network errors or server timeouts. This is particularly useful for improving the reliability of your application when dealing with unreliable network conditions or APIs that may temporarily fail.

Here's how to implement the retry feature with `nyro`:

```js
import nyro from 'nyro';

const { body } = await nyro.get('https://httpbin.org/get', {
    retries: 3, // Specify the number of retry attempts
    onRetry: (req, error) { // Retry callback
        console.log(error);
    }
});

console.log(body);
```