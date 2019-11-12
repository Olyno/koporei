import KoaApp from 'koa';
import koa from '../src/koa';

const app = new KoaApp();

app.use(koa());

app.listen(3000);