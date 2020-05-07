import KoaApp from 'koa';
import { koa } from '../src';
import IKoporeiConfig from '../src/koporei/KoporeiConfig';

const app = new KoaApp();

const options: IKoporeiConfig = {
    pages: 'pages'
}

app.use(koa(options));

app.listen(3000, () => console.log('> Server listening at http://localhost:3000'));