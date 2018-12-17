const getDataModel = require('../model/getDataModel.js')
const fourController = {
	index () {
		return async(ctx, next) => {
		 	ctx.body = await ctx.render('404',{
			    title: 'page not find1'
			})
		}
	}
}
module.exports = fourController;