const Koa = require("koa");
const serve = require("koa-static");
const router = require("./router");
const db = require("./db");

class Server {
  constructor() {
    this.init();
  }

  init() {
    this.setupServer();
  }

  setupServer() {
    const app = new Koa();
    app.use(serve('dist'));
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(3000);
  }
}

module.exports = Server;