const getDataModel = require('../model/getDataModel.js')
const homeController = {
	index () {
		return async(ctx, next) => {
			// ctx.throw(500,'Error Message');
			// // ctx.app.emit('errorHandler', err, ctx)
		 	ctx.body = 'hello'
		}
	}
}
module.exports = homeController;