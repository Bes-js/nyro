[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Promise Request

The most common way is to pass the URL as the first argument, then the options as the second.

### <code>nyro(options?: [RequestOptions](#))</code>

**Returns: <code>Promise<[HttpResponse<T,B>](response.md)>**</code>

```js
import nyro from 'nyro';

const { body } = await nyro({
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'GET',
    responseType: 'json',
	headers: {
		'User-Agent': 'Nyro'
	}
});

 console.log(body);
```
<br>
<br>

### [`Get Method`](#)
### <code>nyro.get(url?: [string](#),options?: [RequestOptions](#))</code>
```js
import nyro from 'nyro';

const { body } = await nyro.get('https://jsonplaceholder.typicode.com/todos',{
    responseType: 'json'
});

 console.log(body);
```
<br>

### [`Post Method`](#)
### <code>nyro.post(url?: [string](#),options?: [RequestOptions](#))</code>
```js
import nyro from 'nyro';

const { body } = await nyro.post('https://jsonplaceholder.typicode.com/todos',{
    responseType: 'json',
    body: {
        id: '12345',
        format: 'xml'
    }
});

 console.log(body);
```
<br>

### [`Put Method`](#)
### <code>nyro.put(url?: [string](#),options?: [RequestOptions](#))</code>
```js
import nyro from 'nyro';

const { body } = await nyro.put('https://jsonplaceholder.typicode.com/todos',{
    body: {
        id: '12345',
        format: 'json'
    }
});

 console.log(body);
```
<br>

### [`Delete Method`](#)
### <code>nyro.delete(url?: [string](#),options?: [RequestOptions](#))</code>
```js
import nyro from 'nyro';

const { body } = await nyro.delete('https://jsonplaceholder.typicode.com/todos/1');

 console.log(body);
```
<br>

### [`Head Method`](#)
### <code>nyro.head(url?: [string](#),options?: [RequestOptions](#))</code>
```js
import nyro from 'nyro';

const { headers } = await nyro.head('https://jsonplaceholder.typicode.com/todos');

 console.log(headers);
```
<br>

### [`Options Method`](#)
### <code>nyro.options(url?: [string](#),options?: [RequestOptions](#))</code>
```js
import nyro from 'nyro';

const { headers } = await nyro.options('https://jsonplaceholder.typicode.com/todos');

 console.log(headers);
```
<br>

### [`Connect Method`](#)
### <code>nyro.connect(url?: [string](#),options?: [RequestOptions](#))</code>
```js
import nyro from 'nyro';

const { headers } = await nyro.connect('https://jsonplaceholder.typicode.com/todos');

 console.log(headers);
```
<br>

### [`Trace Method`](#)
### <code>nyro.trace(url?: [string](#),options?: [RequestOptions](#))</code>
```js
import nyro from 'nyro';

const { headers } = await nyro.trace('https://jsonplaceholder.typicode.com/todos');

 console.log(headers);
```
<br>