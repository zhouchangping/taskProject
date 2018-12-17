const fetch = require('node-fetch');
class SafeRequest {
	constructor(url, options) {
		this.url = url;
		this.options = options;
	}
	fetch() {
		return new Promise((resolve, reject)=>{ // node-fetch
			var that = this;
			let result = {code: 0, message: 'ask json fail',data: []};
			let zhouzhouFetch = fetch(that.url);
			console.log(that.options.body);
			if (that.options.body) {
				console.log(1)
				zhouzhouFetch = fetch(that.url, that.options)
			}
			zhouzhouFetch
			.then((res)=>{
				try {
					return res.json();
				} catch(error) {
					result.code = 1;
					result.message = 'json fail';
					reject(new Error())
				}
			}).then((json)=>{
				result.data = json;
				resolve(result); // need resolve
			}).catch((error)=>{
				// mail server call phone
				result.code = 2;
				result.message = 'node-fetch error';
				reject(result);
			})

		})
	}
}
module.exports = SafeRequest;