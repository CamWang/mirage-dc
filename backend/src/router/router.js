/**
 * router.js
 * 
 * @description used to aggregate all routes
 */

const Router = require("@koa/router");
const demand = require("./demand");

const router = new Router();

router.use("/demand", demand.routes(), demand.allowedMethods());

module.exports = router;