import ExpressApp from 'express';
import express from '../src/express';

const app = ExpressApp();

app.use(express());

app.listen(3000);