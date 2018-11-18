# jsD卷试题

标签（空格分隔）： D卷

---

+ 1.请写出输出值，并解释为什么。(5分)
```
alert(a); // undfined, 变量申明提升。提升申明，函数声明提升整体
yideng(); // not a function
var flag = true;
if(!flag){
    var a = 1;
}
if (flag) {
    function yideng() {
        console.log("yideng1");
    }
} else {
    function yideng() {
        console.log("yideng2");
    }
}

相当于下面代码
var yideng;
var a;
alert(a);
yideng();
var flag = true;
if (!flag) {
    a = 1;
}
if (flag) {
    yideng = function () {
        console.log("yideng1");
    }
} else {
    function yideng() {
        console.log("yideng2");
    }
}
```

+ 2.请写出如下输出值，并写出把注释掉的代码取消注释的值，并解释为什么(8分)
```
this.a = 20;
var test = {
    a: 40,
    init:()=> {
        console.log(this.a);
        function go() {
            // this.a = 60;
            console.log(this.a);
        }
        go.prototype.a = 50;
        return go; 
    }
};
//var p = test.init();
//p();
new(test.init())();
```
+ 3.请问变量a会被GC回收么，为什么呢？(12分)
```
function test(){
    var a = "yideng";
    var s = "zhouzhou"
    return function(){ // 不被回收，
        debugger;
        eval(""); // window.eval()(会回收） eval()
        new Function("return a"); // 会 相当于window.eval()          window.eval(),会回收，找不到a
        with(s) { // 不会回收s
        }
    }
}
test()();
js高程75页
执行环境：执行环境定义了变量或函数有权访问的其他数据，决定了他们的行为。每个执行环境都有一个与之关联的变量对象。
全局执行环境：window对象为全局执行环境的变量对象。
作用域链：当代码在一个执行环境执行时，会创建变量对象的一个作用域链。
作用域链的前端：始终是当前执行的代码所在的变量对象。
活动对象：如果这个环境是函数，则将其活动对象作为变量对象。
词法作用域：Lexical Environment
词法作用域：函数的作用域在函数定义的时候就决定了。与词法作用域相对的是动态作用域。
动态作用域：函数的作用域是在函数调用的时候才决定的。
内存泄漏: 变量创建了，没引用。闭包
不对当前Lexical Environment下任何任何变量进行解除绑定，保留所有的。
window.eval()会回收a;延长了作用域链。
new Function()创建的所有的函数的scope注册到全局作用域上，相当于window.eval().
with 浏览器遇到with，放弃当前作用域使用变量回收
```
+ 4.写出输出值，并解释为什么。(5分)
```
Object.prototype.a = ‘a';
Function.prototype.a = 'a1';
function Person(){};
var yideng = new Foo();
console.log('p.a: '+ yideng.a);
console.log(1..a);
console.log(1.a);

实例
yideng.__proto__ = Foo.prototype;
Foo.prototype.__proto__ = Object.prototype;
Object.prototype.__proto__ = null;

函数的原型链
Foo.__proto__ = Function.prototype;
Function.prototype.__proto__ = Object.prototype;
Object.prototype.__proto__ = null;

爷爷的原型链
Object.__proto__ = Function.prototype;
Function.__proto__ = Function.prototype;
Function.prototype.__proto__ = Object.prototype;
```
+ 5.请写出你了解的ES6元编程。（10分）
```

```
+ 6.请按照下方要求作答？(15分)
```
const timeout = ms =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve();
        }, ms);
    });
const ajax1 = () =>
timeout(2000).then(() => {
    console.log("1");
    return 1;
});
const ajax2 = () =>
timeout(1000).then(() => {
    console.log("2");
    return 2;
});
const ajax3 = () =>
timeout(2000).then(() => {
    console.log("3");
    return 3;
});
const mergePromise = (ajaxArray) =>{
1.写法一：
let result = [];
async function asyncForEach() {
    for (let item of ajaxArray) {
        result.push(await item());
    }
    return result;
}
return asyncForEach();
2. 写法二
return ajaxArray.reduce(()=>{
    return new Promise(resolve=?{
        ajax().then(data=>{
            resolve([].concat())
        });
    });
}));
3. 写法三

//1,2,3 done [1,2,3]
//【代码书写处】
}
- mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log("done");
    console.log(data); // data 为 [1, 2, 3]
});
- // 执行结果为： 1 2 3 done [1,2,3]
```
+ 7.请问点击<buttion id=“test”></button>会有反应么？为什么？能解决么？（5分)
```
$('#test').click(function(argument) {
    console.log(1);
});
setTimeout(function() {
    console.log(2);
}, 0);
while (true) {
    console.log(Math.random());
}
```
+ 8.请用ES5实现ES6 Promise的原理(10分)
+ 9.请写出如下输出值，并解释为什么。(12分)
```
var s = [];
var arr = s; 
for (var i = 0; i < 3; i++) {
    var pusher = {
        value: "item"+i
    },tmp;
    if (i !== 2) {
        tmp = []
        pusher.children = tmp
    }
    arr.push(pusher);
    arr = tmp;
}
console.log(s[0]);
```
+ 10.【附加题】.请描述你理解的函数式编程，并书写如下代码结果。如何将函数式编程
应用到你的项目中呢？（10分）
```
var Container = function(x) {
 this.__value = x;
}
Container.of = x => new Container(x);
Container.prototype.map = function(f){
 return Container.of(f(this.__value))
}
Container.of(3)
 .map(x => x + 1) 
 .map(x => 'Result is ' + x); 
```



