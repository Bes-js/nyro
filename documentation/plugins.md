[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Plugins & Advanced Callbacks

The `nyro` library supports a powerful plugin system that allows you to extend its functionality and create custom behavior during the request and response lifecycle. This section explains how to create and use plugins effectively, along with advanced callback capabilities.

Here’s an example of how to use built-in plugins and create custom plugins in `nyro`:

```js
import nyro, { Plugin } from 'nyro';


import someOneNyroPlugin from '...'; // Import an external plugin

// Use an external plugin
nyro.use(someOneNyroPlugin);




// Define a custom plugin
nyro.use({
    name: 'bodyJsonOrReturnUndefined',
    onRequest(options) {
        console.log('onRequest', options); // Log request options
    },
    onResponse(response) {
        console.log('onResponse', response); // Log response

        try {
            response.body = JSON.parse(response.body); // Parse response body as JSON
        } catch (error) {
            response.body = undefined; // Set body to undefined if parsing fails
        }

        return response; // Return the modified response
    },
    onError(error) {
        console.log('onError', error.message); // Log any errors
    },
});



// Create a function to manage a plugin package
function nyroPluginPackage() {
    var pluginManager = new Plugin(); // Instantiate the Plugin manager

    pluginManager.use({
        name: 'nyroPluginPackage',
        onRequest(options) {
            console.log('onRequest', options); // Log request options
        },
        onResponse(response) {
            console.log('onResponse', response); // Log response
            return response; // Return the response
        },
        onError(error) {
            console.log('onError', error.message); // Log any errors
        },
    });

    return pluginManager; // Return the plugin manager instance
}
```