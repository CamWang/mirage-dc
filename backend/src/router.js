const Router = require("@koa/router");

const router = new Router();


router.get('/demand', async (ctx, next) => {
  const query = ctx.request.query;
  let start = 0;
  if (query.start && Number.isInteger(start)) {
    start = Number.parseInt(query.start);
  }
  const db = global.mirage.db;
  const demand = db.collection("demand");
  let count = 0;
  await demand
    .estimatedDocumentCount()
    .then(value => {
      count = value;
    });
  await demand
    .find({}).sort({_id:-1}).skip(start).limit(20)
    .toArray()
    .then(value => {
      if (value.length > 0) {
        ctx.body = {
          status: 0,
          total: count,
          skip: start,
          content: value
        };
      } else {
        ctx.body = {
          status: 1,
          message: "No Demand Yet"
        }
      }
    })
});

router.post('/demand', async (ctx, next) => {
  const db = global.mirage.db;
  const query = ctx.request.query;

  if (query.nickname) {
    if (query.content) {
      if (query.nickname.length > 20 || query.content.length > 200) {
        ctx.body = {
          status: 1,
          message: "Nickname or content is too long"
        }
      }
      const record = await db.collection("demand")
        .countDocuments({$and:[{nickname:query.nickname},{content:query.content}]});
      if (record > 0) {
        ctx.body = {
          status: 1,
          message: "Don't submit same content twice"
        }
        return;
      }
      await db.collection("demand")
        .insertOne(query);
      ctx.body = {
        status: 0,
        message: "Submit successfully"
      }
    } else {
      ctx.body = {
        status: 1,
        message: "Must enter an content"
      }
    }
  } else {
    ctx.body = {
      message: "Must enter an Nickname"
    }
  }
});

module.exports = router;