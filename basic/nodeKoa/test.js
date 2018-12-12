// const fetch = require('node-fetch');
// const body = {
// 	"Books[bookname]": "ceshi",
// 	"Books[booktime]": "2018-12-17",
// 	"Books[bootitle]": "nihao"
// }
// fetch('http://www.zhouzhou.com/index.php?r=books/index/create', {
// 	method: 'POST',
// 	body: JSON.stringify(body),
// 	headers: {
// 		'Content-Type': 'application/x-form-urlencode'
// 	},
// })
// .then(res => res.json())
// .then(json=>console.log(234))
// .catch((err)=>{
// 	console.log(213);
// })



const fetch = require('node-fetch');
// fetch('http://localhost/basic/web/index.php?r=books')
//     .then(res => res.json()) // expecting a json response
//     .then(json => console.log(json[0].name));
const { URLSearchParams } = require('url');
const params = new URLSearchParams();
// const body = {
//     "Books[name]":"测试的数据",
//     "Books[author]":"测试作者"
// }
params.append("Books[bookname]", "ceshi");
params.append("Books[booktime]", "2018-12-17");
params.append("Books[booktitle]", "nihao");
fetch('http://www.zhouzhou.com/index.php?r=books/create', {
        method: 'POST',
        body:params
    })
    .then(res => res.json()) // expecting a json response
    .then(json => console.log(json))
    .catch((err)=>{
        console.log(`${err}`);
    })