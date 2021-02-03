import Koa from "koa";
import serve from "koa-static";

export default class Server {
  constructor() {
    this.init();
  }

  init() {
    const app = new Koa();
    app.use(serve('dist'));
    app.listen(3000);
  }
}