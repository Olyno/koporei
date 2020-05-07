import ExpressApp from 'express';
import { express } from '../src';
import IKoporeiConfig from '../src/koporei/KoporeiConfig';

const app = ExpressApp();

const options: IKoporeiConfig = {
    pages: 'tests/pages'
}

app.use(express(options));

app.listen(3000);