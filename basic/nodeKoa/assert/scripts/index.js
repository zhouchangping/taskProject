// var app6 = new Vue({
//   el: '#app-6',
//   data: {
//     message: 'Hello Vue!'
//   }
// })
// fetch('./index/data')
// .then((res)=>{
// 	return res.json();
// })
// .then((res)=>{
// 	console.log('123', res.result);
// })

class Create {
	constructor () {
		this.eBtn = $("#btn");
	}
	init () {
		const that = this;
		console.log($)
		that.eBtn.on('click', $.proxy(that._go, this));
	}

	_go (e) {
		alert(e.target);
	}
}

export default Create;