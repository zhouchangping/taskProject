// function errorHandler () {
//   return async (ctx, next) => { // error middleware
//     try {
//     await next()
//     } catch (err) {
//       ctx.status = err.statusCode || err.status || 500;
//       ctx.body = {
//         message: err.message,
//         status: err.statusCode
//       };
//     }
//   }
// }

const errorHandler = {
  error(app, logger) {
    app.use(async(ctx, next)=>{
      try {
        await next();
      } catch(error) {
        logger.error(error);
        ctx.status = error.status || 500;
        ctx.body = await ctx.render('404');
      }
    })
    app.use(async(ctx, next)=>{
      await next();
      if (404 != ctx.status) {
        return;
      }
      // ctx.status = 200;
      ctx.status = 400;
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>';
    })
  }
}

module.exports = errorHandler;