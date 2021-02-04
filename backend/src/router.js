const Router = require("@koa/router");

const router = new Router();


router.get('/demand', (ctx, next) => {
  const db = global.mirage.db;
  const result = db
    .collection("demand")
    .find({})
    .project({id:0});
  if (Object.keys(result).length > 0) {
    ctx.body = result;
  } else {
    ctx.body = {
      message: "No Demand Yet";
    }
  }
});

router.post('/demand', (ctx, next) => {
  const db = global.mirage.db;
  console.log(ctx.request.query);
  db.collection("demand")
    .insertOne(ctx.request.query);
});

module.exports = router;