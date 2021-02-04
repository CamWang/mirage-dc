import Router from '@koa/router';

const router = new Router();

router.get('/user', (ctx, next) => {
  ctx.body = "I am a user.";
});

export default router;