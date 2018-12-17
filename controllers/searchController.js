const getDataModel = require('../model/getDataModel.js')
const searchController = {
	index () {
		return async(ctx, next) => {
			const modelIndex = new getDataModel(ctx, 'http://www.zhouzhou.com/index.php?r=bookss/search&id=2');
			const bodys = await modelIndex.getData();
	  		var arr = [];
			var arr = [];
		  	arr.push(JSON.parse(bodys));
			ctx.body = await ctx.render('index',{
			    user: {
			      name: 'fundon',
			      email: 'cfddream@gmail.com',
			      bo: arr
			    }
			})
		}
	}
}
module.exports  = searchController;