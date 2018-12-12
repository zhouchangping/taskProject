/**
*@fileOverview 
*@author zhouzhou
*/
const SafeRequest = require("../utils/SafeRequest");
/**
* Index
* @class
*/
class Index {
	/**
	* @constructor
	* @param {string} app Koa2
	*/
	constructor(url, options) {
		/**
		*@param {*} url
		*@param {*} options
		*@example
		*return new Promise
		*getData
		*/
		this.url = url;
		this.options = options;
	}
	getData() {
		const safeRequest = new SafeRequest(this.url, this.options);
		return safeRequest.fetch();
	}
	saveData() {
		const safeRequest = new SafeRequest(this.url, this.options);
		return safeRequest.fetch();
	}
}
module.exports = Index;