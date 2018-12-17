const  {
	join 
} = require("path");
const _ = require("lodash");
let config = {
	"viewDir": join(__dirname, "..", "views"),
	"staticDir": join(__dirname, "..", "assert")
}


if (false) {
	console.log(123);
}

if (process.env.NODE_ENV ==  "development") {
	const localConfig = {
		prot: 3000
	}
	config = _.extend(config, localConfig);
}
// pm2
if (process.env.NODE_ENV ==  "production") {
	const prodConfig = {
		prot: 8081
	}
	config = _.extend(config, prodConfig);
}
module.exports = config;