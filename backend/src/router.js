const Router = require("@koa/router");
const { validate } = require("./util/validate");

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
    .find({}).sort({
      _id: -1
    }).skip(start).limit(20)
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
  const values = {
    nickname: query.nickname,
    demand: query.content
  }

  try {
    validate(values);
  } catch (error) {
    if (error instanceof TypeError) {
      ctx.body = {
        status: 1,
        message: error.message
      }
      return;
    }
  } 

  const record = await db.collection("demand")
    .countDocuments({
      $and: [{
        nickname: values.nickname
      }, {
        content: values.demand
      }]
    });
  if (record > 0) {
    ctx.body = {
      status: 1,
      message: "Don't submit same content twice"
    }
    return;
  }
  await db.collection("demand")
    .insertOne({
      nickname: values.nickname,
      content: values.demand
    });
  ctx.body = {
    status: 0,
    message: "Submit successfully"
  }
});

module.exports = router;