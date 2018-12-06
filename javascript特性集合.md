# javascript特性集合

标签（空格分隔）： 未分类

---

### JavaScript深入之词法作用域和动态作用域[https://github.com/mqyqingfeng/Blog/issues/3]
+ 作用域
:    作用域是指程序源代码中定义变量的区域。
作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。
JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。
静态作用域与动态作用域

+ 静态作用域与动态作用域
:    因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。
而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。
让我们认真看个例子就能明白之间的区别： 
```
var value = 1;
function foo() { // 因为JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置。
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();
// 结果是 1
```
+ 动态作用域
:    

### eval()
```
var jsonData = '{"name": "曹尼玛","age":18}';
var o = eval(jsonData); // {}代码块
var jsonData = '{"name":"啦啦啦啦","age":18}';
eval("var o = " + jsonData);
console.log(o);
console.log(eval("{}"); // undefined 
console.log(eval("({})");// object[Object] 
```
+ 为什么eval要添加括号呢？
:    原因： eval本身的问题。 由于json是以 {} 的方式来开始以及结束的， 在JS中， 它会被当成一个语句块来处理， 所以必须强制性的将它转换成一种表达式。
加上圆括号的目的是迫使eval函数在处理JavaScript代码的时候强制将括号内的语句块 转化为对象， 而不是作为语句(statement) 来执行。 举一个例子， 例如对象字面量 {}， 如若不加外层的括号， 那么eval会将大括号识别为JavaScript代码块的开始和结束标记， 那么 {} 将会被认为是执行了一句空语句。

### JavaScript深入之执行上下文栈 [https://github.com/mqyqingfeng/Blog/issues/4]
+ 顺序执行？
:    如果要问到 JavaScript 代码执行顺序的话，想必写过 JavaScript 的开发者都会有个直观的印象，那就是顺序执行，毕竟：
```
alert(a) // undefined
if (false) {
    var a = 1; // 变量提升，提升申明，赋值未提升
}

test() // 1， 函数提升，提升整个函数 
function test() { // 函数声明
    alert(1)
}

var test = function () { // 函数表达式
}

function () { // 报错
}
```
+ 可执行代码
:    这就要说到 JavaScript 的可执行代码(executable code)的类型有哪些了？
其实很简单，就三种，全局代码、函数代码、eval代码。
举个例子，当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"执行上下文(execution context)"。

### JavaScript深入之call和apply的模拟实现 
+ call模拟实现
```
// 第三版
Function.prototype.call2 = function (context) {
    var context = context || window; // this 参数可以传 null，当为 null 的时候，视为指向 window
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + args +')'); // args 会自动调用 Array.toString() 这个方法。
    delete context.fn
    return result;
}
// 测试一下
var value = 2;
var obj = {
    value: 1
}
function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}
bar.call2(null); // 2
console.log(bar.call2(obj, 'kevin', 18));
```
+ apply的模拟实现
```
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```
### JavaScript深入之bind的模拟实现
+ bind
:    bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

    由此我们可以首先得出 bind 函数的两个特点：
    1、返回一个函数
    2、可以传入参数
```
Function.prototype.bindMn = function (ctx) {
    var self = this;
    return function () {
        return self.apply(ctx); // bar的result;
    }
}
function bar() {
    console.log(this.value)
    return this.value;
}
var foo = {
    value: 1
}
var resultFunc = bar.bindMn(foo);
```
   




