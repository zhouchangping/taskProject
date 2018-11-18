# ES5合集-第一卷

---

标签（空格分隔）： 试卷

---

+ 1.请写出弹出值并解释为什么。(5分)
```
alert(a) // function
a();
var a=3;
function a(){
 alert(10) // 10
} 
alert(a) // 3
a=6;
a(); // 报错
基本提升
函数优先级比变量高
遇到词法作用域，当函数名和变量一样，且变量为undfined,忽略变量名
```
+ 2.请写出如下输出值，并写出把注释掉的代码取消注释的值，并解释为什么(8分)
```
this.a = 20;
var test = {
 a: 40,
 init:()=> {
 console.log(this.a); // 20 20
 function go() {
 // this.a = 60;
 console.log(this.a); // 50 20
 }
 go.prototype.a = 50;
 return go; 
 }
};
new(test.init())();
//var p = test.init();
//p();
谁调用函数指谁，
init没有宿主环境 window代替
箭头函数绑定他爹的运行环境
在类上的this，先绑定构造函数里的this
console.dir()
```
+ 3.请写出如下点击li的输出值，并用三种办法正确输出li里的数字。(12分)
```
<ul>
 <li>1</li>
 <li>2</li>
 <li>3</li>
 <li>4</li>
 <li>5</li>
 <li>6</li>
</ul>
<script type="text/javascript">
    var list_li = document.getElementsByTagName("li");
    for (var i = 0; i < list_li.length; i++) {
        list_li[i].onclick = function() {
            console.log(i);
        }
    }
</script> 
for( let...)
(function (i){})(i)
代码块不报错 {tem = 3;}
块级作用域 函数作用域
达成自己私有作用域的函数体： 闭包。函数是不是闭包呢？
this.innerText;
```
+ 4.写出输出值，并解释为什么。(5分)
```
function test(m) { // var m;
 m = {v:5} // 重写，内部m不在指向和外部m相同内存。也不在全局声明。相当于新对象，重新分配内存。var m = {m:5}
}
var m = {k: 30};
test(m);
alert(m.v); 

Objext.prototype.name = 'zhouzhou'
1.0.name // zhouzhou
1.name // 不知道.属于谁，报错
Function.name // Function
```
+ 5.请写出代码执行结果，并解释为什么？（5分）
```
function yideng() {
 console.log(1);
}
(function () {
 if (false) {
 function yideng() {
    console.log(2);
 }
 }
 yideng();
})();
在现在浏览器中相当于以下代码，结果报错。在老式浏览器Ie,提升整个函数，结果为1
function yideng() {
 console.log(1);
}
(function () {
 let yideng;
 if (false) {
 yideng = function () {
 console.log(2);
 }
 }
 yideng(); // 报错，yideng不是个函数。 闭包内部可以获取全局属性。
})();
```
```
附加题
function yideng() { // 块级的浏览器，firefox时代 为1；都不提升，现在改了
    console.log(1);
}
if (true) { // 现在的浏览器时代 为2；true提升,false不提升出去
    function yideng(){
        console.log(2);
    }
} else {
    function yideng() { // ie类老式浏览器。都提升出去，函数是老大
        console.log(3);
    }
}
yideng();
```
+ 6.请用一句话算出0-100之间学生的学生等级，如90-100输出为1等生、80-90为2等
生以此类推。不允许使用if switch等。（10分） 
```
10 - (95/10)
```
+ 7.请用一句话遍历变量a。(禁止用for 已知var a = “abc”)(10分) 
```
cosnt arr = Array.from(a);
Array.prototype.map.call(a, function (e) {
	// 	console.log(e);
// });
...a; // a b c
[...a] // ["a", "b", "c"]
Reflect
const set = new Set(a);
[Symbol.iterator]
```
+ 8.请在下面写出JavaScript面向对象编程的混合式继承。并写出ES6版本的继承。
要求：汽车是父类，Cruze是子类。父类有颜色、价格属性，有售卖的方法。Cruze子
类实现父类颜色是红色，价格是140000,售卖方法实现输出如下语句：将 红色的Cruze
买给了小王价格是14万。（20分）
```
function Car(color, price) {
    this.color = color;
    this.price = price;
}
Car.prototype.sell = function () {
    console.log(this.color + '' + this.price + '万');
}

function Cruze(color, price) {
    Car.call(this, color, price);
}
var _prototype = Object.create(Car.prototype);
Cruze.prototype = _prototype;
Cruze.constructor = Cruze;
var Bm = new Cruze('red', 14)
Bm.sell();

class Car {
    constructor(color, price) {
        this.color = color;
        this.price = price;
    }
    sell() {
        console.log(this.color + '' + this.price)
    }
}

class Cruze extends Car {
    constructor(color, price) {
        super(color, price);
    }
}
const Bm = new Cruze('red', 14);
Bm.sell();
OOP AOP FP 三种编程方式
```
+ 9.请你写出如何利用EcmaScript6/7（小Demo）优化多步异步嵌套的代码？(10分) 
```
(async function () {
    const result = await fetch('a.php');
    const result2 = await fetch('b.php');
    console.log(result + result2);
});
function fetch(url) {
    return new Promise((resolve, reject)=>{
        $.ajax(url).then(function (){
            resolve('成功');
        }).error(function () {
            reject('失败');
        });
    });
}
```

+ 10.【仔细思考】写出如下代码执行结果，并解释为什么。(12分)
```
var length = 10; 
function fn() { 
 console.log(this.length); 
} 
var yideng = { 
 length: 5, 
 method: function (fn) { 
 fn();  // 无宿主，window.fn();
 arguments[0](); // arguments调的fn。arguments.length = 2;
 } 
}; 
yideng.method(fn, 1); 
```
+ 






