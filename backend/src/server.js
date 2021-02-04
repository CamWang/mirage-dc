import Koa from "koa";
import serve from "koa-static";
import router from "./router.js";

export default class Server {
  constructor() {
    this.init();
  }

  init() {
    const app = new Koa();
    app.use(serve('dist'));
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(3000);
  }
}