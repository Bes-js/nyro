<br/>
<p align="center">
<img src="./assets/nyro_logo_transparent.png" align="center">
</p>
<h4 align="center">A simple and effective promise-based HTTP request library that supports all HTTP methods.</h6>
<p align="center">
<img src="https://img.shields.io/npm/v/nyro?style=for-the-badge&logo=npm&logoColor=red">
<img src="https://img.shields.io/github/repo-size/Bes-js/nyro?style=for-the-badge&logo=github&logoColor=white"> 
<img src="https://img.shields.io/npm/l/nyro?style=for-the-badge">
<img src="https://img.shields.io/npm/unpacked-size/nyro?style=for-the-badge"> 
<img src="https://img.shields.io/npm/dt/nyro?style=for-the-badge&logoColor=blue"> 
<img src="https://img.shields.io/github/package-json/dependency-version/Bes-js/nyro/sequelize?style=for-the-badge">
<a href="https://discord.gg/luppux" target="_blank"> 
<img alt="Discord" src="https://img.shields.io/badge/Support-Click%20here-7289d9?style=for-the-badge&logo=discord"> 
</a>
<a href="https://www.buymeacoffee.com/beykant" target="_blank">
<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="120px" height="30px" alt="Buy Me A Coffee">
</a>
</p>


## Installation

Using npm:
```shell
$ npm install nyro
```

Other Installations:

```bash
$ yarn add nyro
```

```bash
$ pnpm add nyro
```

## Usage
```js
import nyro, { ContentType, ResponseEncoding, ResponseType, StatusCode, Method } from 'nyro';

(async() => {

 var response = await nyro({
    url: 'https://hercai.onrender.com/v3/hercai',
    params: {
        question: 'Hi How Are You?'
    }
    method: Method.Get,
    responseType: ResponseType.Json,
    headers: {
        'Authorization': '...someOneSecretKey',
        'User-Agent': 'Nyro'
    },
    bodySchema: {
        content: String,
        reply: String
    }
 });

  var body = response.body;

  console.log('Your Question; ' + body.content);
  console.log('AI Reply; ' + body.reply);


})();
```
<br>

#### For Fake UserAgent
```js
import nyro, { userAgentGenerator } from 'nyro';

nyro({
    url: 'https://someoneapi.com',
    method: 'GET',
    headers: {
        'User-Agent': userAgentGenerator()
    }
}).then((response) => {
    console.log(response.config.headers);
    console.log(response.body);
});
```

## License

nyro is licensed under the **MIT** License. See the [LICENSE](./LICENSE.md) file for details.

## Support

[![Discord Banner](https://api.weblutions.com/discord/invite/luppux/)](https://discord.gg/luppux)