[`=> Back To Homepage`](../readme.md)

<br>
<br>

# BodySchema (JavaScript & TypeScript Body Type)

The `bodySchema` feature in the `nyro` library allows you to define the expected structure of the request body. This ensures that the data sent to the server conforms to a specified schema, enhancing type safety and data validation in both JavaScript and TypeScript applications.

Here's how to use the `bodySchema` option to validate the structure of the request body:

```js
import nyro from 'nyro';

const { body } = await nyro({
   url: 'https://api.ipify.org', // The URL to which the request is made
   method: 'POST', // HTTP method for the request
   body: {
     id: '12345' // The data being sent in the body
   },
   bodySchema: {
    id: String, // Expected type: String
    timestamp: Number, // Expected type: Number
    arrayUsers: Array // Expected type: Array
   }
});

console.log(body.id.toString()); // Access the id field
console.log(body.timestamp.toFixed(2)); // Access and format the timestamp
console.log(body.arrayUsers.join(', ')); // Join and print the array of users
```