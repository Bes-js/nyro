[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Browser Support (NodeJS Only)

The `nyro` library can be utilized in browser environments by importing it via a module script. This feature is particularly useful for developers who wish to make HTTP requests directly from the client-side, leveraging the same powerful functionality available in Node.js.

Here’s how to use `nyro` in a browser environment:

```html
<script type="module">
import nyro from 'https://unpkg.com/nyro/dist/[your_project_type]'; // Adjust the import path based on your project type

nyro({
   // ... Your Request Option
}).then((response) => {
   console.log(response); // Log the response to the console
});
</script>
```