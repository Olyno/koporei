# koporei

![GitHub](https://img.shields.io/github/license/Olyno/koporei?style=for-the-badge)

Koporei is an easy router for any [Express](https://expressjs.com) or [Koa](https://koajs.com) applications. As [Sapper](https://sapper.svelte.dev), Koporei use directly your path as route.

```
Pages
|- abc
    |- hey.html        <----- GET /abc/hey
|- hola.html           <----- GET /hola
|- index.html          <----- GET /
```

## Install

**Npm:**

```
npm i koporei
```

**Yarn:**
```
yarn add koporei
```

## Usage

Create a ``koporei.json`` at the root dir of your project. This file should contain a configuration.

```json
{
    // The path to the directory where your html pages are.
    // Default: src/pages
    "pages": "tests/pages"
}
```

After that, add Koporei as middleware:

**Express:**

```js
import ExpressApp from 'express';
import { express } from 'koporei';

const app = ExpressApp();

app.use(express());

app.listen(3000);
```

**Koa:**

```js
import KoaApp from 'koa';
import { koa } from 'koporei';

const app = new KoaApp();

app.use(koa());

app.listen(3000);
```

To know: koporei should support body of requests as POST requests.

All html file are "GET" requests. But what about "POST" request? Easy to do:

```js
// pages/hey.js
exports.default = (ctx) => {
    ctx.body = "So easy routing!";
}
```

Depending your framework, you will get more informations as parameters:

**Koa:** ctx, data
**Express:** req, res, data

Need more example? Have a look into working examples in the ``tests`` directory!

## Contributing

Thanks a lot! To make your contribution, I'm just asking that you don't make your pull request on the master branch, but any other branch. If it's a new feature, you can name it ``feature/myAwesomeFeature`` for example.

## License

Code released under GPL-3.0 license.

Copyright ©, [Olyno](https://github.com/Olyno).