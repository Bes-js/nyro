[`=> Back To Homepage`](../readme.md)

<br>
<br>

# SSL Options

The `sslOptions` feature in the `nyro` library allows you to configure secure socket layer (SSL) settings for your HTTP requests. This is particularly useful when interacting with APIs that require secure connections and proper certificate validation.

Here’s how to use the `sslOptions` property to specify SSL settings for a request:

```js
import nyro from 'nyro';

const { body } = await nyro({
   url: 'https://api.ipify.org', // The URL to which the request is made
   method: 'GET', // HTTP method for the request
   sslOptions: {
      ca: require('fs').readFileSync('path/to/ca.pem'), // Path to the Certificate Authority file
      cert: require('fs').readFileSync('path/to/cert.pem'), // Path to the client's certificate
      key: require('fs').readFileSync('path/to/key.pem'), // Path to the client's private key
      passphrase: 'password', // Passphrase for the private key, if applicable
      ciphers: 'ECDHE-RSA-AES128-GCM-SHA256', // Specify the cipher suites to be used
      rejectUnauthorized: true, // Reject unauthorized connections (true/false)
      secureProtocol: 'TLSv1_2_method', // Specify the TLS protocol version to use
   }
});

console.log(body); // Log the response body
```