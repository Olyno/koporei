# koporei

![GitHub](https://img.shields.io/github/license/Olyno/koporei?style=for-the-badge)

Koporei is an easy router for any [Express](https://expressjs.com) or [Koa](https://koajs.com) applications. As [Sapper](https://sapper.svelte.dev), Koporei use directly your path as route.

```
Pages
|- abc
    |- hey.html        <----- GET  /abc/hey
    |- hey.js          <----- POST /abc/hey
|- test.js             <----- POST /test
|- hola.html           <----- GET  /hola
|- index.html          <----- GET  /
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

Add Koporei as middleware:

**Express:**

```js
import ExpressApp from 'express';
import { express } from 'koporei';

const app = ExpressApp();

const options = {
    pages: __dirname + '../src/pages'
}

app.use(express(options));

app.listen(3000);
```

**Koa:**

```js
import KoaApp from 'koa';
import { koa } from 'koporei';

const app = new KoaApp();

const options = {
    pages: __dirname + '../src/pages'
}

app.use(koa(options));

app.listen(3000);
```

**Configuration:**

```js
const options = {
    // Where your pages are
    pages: __dirname + '../src/pages',

    // (optionnal) Make the path to lower case
    isLowerCase: true,

    // /!\ EXPERIMENTAL /!\ (not implemented yet)
    // (optionnal) If you use React, Vue, Svelte, or other tools like that.
    // It will compile for you files. Just precise the function it must execute.
    // code argument is the path to the file
    preprocessor: (code) => require('@babel/core').transform(code, {
        presets: ['@babel/preset-react'],
    })
}
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