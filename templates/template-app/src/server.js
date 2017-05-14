import Koa from 'koa';
import * as api from './api';

const port = process.env.PORT || 8888;
const app = new Koa();

//app.use(koaMount('/api', api.controller));

app.listen(port);
console.log(`Server is listening on ${port}`);
