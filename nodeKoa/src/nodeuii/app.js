import Koa from 'koa-convert'// koa1 > koa2
import render from 'koa-swig'
import path from 'path'
import config from './config/index.js'
import co from 'co' // koa2 for koa-swig
import server from 'koa-static'
import initRouter from './controllers/index.js'
import errorHandler from './middleware/errorHandler.js'
import log4js from 'log4js'
const app = new Koa()

//require("./controllers")(app);
app.context.render = co.wrap(render({ // koa2 for koa-swig
  root: config.viewDir,
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  varControls: ["[[","]]"], // vue
  writeBody: false
}));


log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/zhouzhou.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese'); // object

// error
errorHandler.error(app, logger); // use error middleware 我们可以让最外层的中间件，负责所有中间件的错误处理。
app.on('error', function (err) {
    console.log('app.js onError, error: ', err.message)
});

// router
initRouter.getAllRouter(app);
// app.use(server(path.join(__dirname, '/assert'), ));
app.use(server(config.staticDir));
app.listen(config.prot, ()=>{
  console.log(process.env.NODE_ENV);
});