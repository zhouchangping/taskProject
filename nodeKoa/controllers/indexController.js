const Index = require('../model/Index')
const indexController = {
	index () {
		return async(ctx, next) => {
			const modelIndex = new Index('http://www.zhouzhou.com/index.php?r=books/index', {});
			const result = await modelIndex.getData();
			ctx.body = await ctx.render('index',{
			    user: {
			      bo: result.data
			    }
			});
		}
	},

	create () {
		return async(ctx, next) => {
			ctx.body = await ctx.render('create');
		}
	},

	data () {
		return (ctx, next)=> {
			ctx.body = {
				result: 'data'
			}
		}
	},
	saveData() {
		return async(ctx, next) => {
			const { URLSearchParams } = require('url');
			const params = new URLSearchParams();
			params.append("Books[bookname]", "ceshi");
			params.append("Books[booktime]", "2018-12-17");
			params.append("Books[booktitle]", "nihao");
			const modelIndex = new Index('http://www.zhouzhou.com/index.php?r=books/create', {
				method: "POST",
				body: params
			});
			const result = await modelIndex.saveData();
			ctx.body = result;
		}
	},

	test () {
		return async(ctx, next) => {
			ctx.body = await ctx.render('test');
		}
	},
}

module.exports  = indexController;