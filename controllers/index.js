const homeRoute = require('./homeController.js')
const indexRoute = require('./indexController.js')
const searchRoute = require('./searchController.js')
const fourRoute = require('./fourController.js')
const router = require('koa-simple-router')
const initRouter = {
	getAllRouter(app) {
		app.use(router(_ => { 
		 	_.get('/', homeRoute.index());
		 	_.get('/index', indexRoute.index());
		 	_.get('/index/data', indexRoute.data());
		 	_.get('/index/saveData', indexRoute.saveData());
		 	_.get('/index/create', indexRoute.create());
		 	_.get('/index/test', indexRoute.test());
		 	_.get('/search', searchRoute.index());
		 	_.get('/four', fourRoute.index());
		}))
	}
}
module.exports = initRouter;
