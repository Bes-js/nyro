[`=> Back To Homepage`](../readme.md)

<br>
<br>

# Pagination Request

A Pagination Request is useful for handling paginated API endpoints, where data is split across multiple pages. This feature allows you to automatically fetch multiple pages of data, configuring parameters for the page number, limit, and the maximum number of pages to retrieve.

In the example below, `nyro.pagination()` is used to request paginated data from an API endpoint. By providing pagination settings, nyro will automatically append the page and limit parameters to the URL and request each page up to the specified limit.

```js
 import nyro from 'nyro';

 const pageList = await nyro.pagination({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   },{
      pageParam: 'page',
      limitParam: 'limit',
      maxPages: 10
   });

   console.log(pageList.map((res) => res.body));
```