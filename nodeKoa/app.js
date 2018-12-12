const Koa = require('koa')
const convert = require('koa-convert') // koa1 > koa2
const render = require('koa-swig')
const path = require('path')
const config = require('./config/index.js')
const co = require('co') // koa2 for koa-swig
const server = require('koa-static')
const app = new Koa()
const initRouter = require('./controllers/index.js')
const errorHandler = require('./middleware/errorHandler.js')
const log4js = require('log4js');




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