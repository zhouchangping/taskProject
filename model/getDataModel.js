const request = require('request');

function getDataModel (ctx, url) {
	this.url = url;
	this.ctx = ctx;
}

getDataModel.prototype.getData = function () {
	var that = this;
	return new Promise(function (resolve, reject) {
		request(that.url, function (error, response, body) {
	  		resolve(body);
		});
	});
}

getDataModel.prototype.searchData = function () {
	var that = this;
	return new Promise(function (resolve, reject) {
		request(that.url, function (error, response, body) {
	  		resolve(body);
		});
	});
}

getDataModel.prototype.deleteData = function () {
	var that = this;
	return new Promise(function (resolve, reject) {
		request(that.url, function (error, response, body) {
	  		resolve(body);
		});
	});
}

module.exports = getDataModel;