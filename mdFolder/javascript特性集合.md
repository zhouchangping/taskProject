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
### JavaScript深入之bind的模拟实现[https://github.com/mqyqingfeng/Blog/issues/12]
+ bind
:    bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

    由此我们可以首先得出 bind 函数的两个特点：
    1、返回一个函数
    2、可以传入参数
```
// 第四版
Function.prototype.bindMn = function (context) {
    // context 传入的对象
    var self = this; // 调用函数 this = bar;
    if (typeof self !== "function") { // 兼容处理
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var args = Array.prototype.slice.call(arguments, 1); // 获取第一个参数后的参数
    var fNOP = function () {};
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments); // 获取后面传入参数
        // 处理构造方式，并且继承参数和合并参数
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    fNOP.prototype = this.prototype; // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fBound.prototype = new fNOP(); // 防止修改fBound对bar函数的影响
    return fBound;
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

### JavaScript深入之new的模拟实现 
> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

也许有点难懂，我们在模拟 new 之前，先看看 new 实现了哪些功能。
```
// Otaku 御宅族，简称宅
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}
var person = new Otaku('Kevin', '18');
console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```
从这个例子中，我们可以看到，实例 person 可以：
> 访问到 Otaku 构造函数里的属性
> 访问到 Otaku.prototype 中的属性

接下来，我们可以尝试着模拟一下了。
因为 new 是关键字，所以无法像 bind 函数一样直接覆盖，所以我们写一个函数，命名为 objectFactory，来模拟 new 的效果。用的时候是这样的：
```
function Otaku () {
    ……
}
// 使用 new
var person = new Otaku(……);
// 使用 objectFactory
var person = objectFactory(Otaku, ……)
```
```
// 第二版的代码
function objectFactory() {
    var obj = new Object(),
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
};

function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}
var person = new Otaku('Kevin', '18');
console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined
```

### JavaScript深入之类数组对象与arguments
+ 类数组对象
所谓的类数组对象:
> 拥有一个 length 属性和若干索引属性的对象
```
var array = ['name', 'age', 'sex'];

var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}
console.log(array[0]); // name
console.log(arrayLike[0]); // name

array[0] = 'new name';
arrayLike[0] = 'new name';

console.log(array.length); // 3
console.log(arrayLike.length); // 3

for(var i = 0, len = arrayLike.length; i < len; i++) {
    ……
}
```
读 写 长度 遍历
那类数组对象可以使用数组的方法吗？比如：
arrayLike.push('4'); // not a function

+ 类数组转数组
```
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"] 
// 2. splice
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"] 
// 4. apply
Array.prototype.concat.apply([], arrayLike)
```

+ length属性
```
function foo(b, c, d){
    console.log("实参的长度为：" + arguments.length)
}
console.log("形参的长度为：" + foo.length)
foo(1)
// 形参的长度为：3
// 实参的长度为：1
```
+ arguments 和对应参数的绑定
```
function foo(name, age, sex, hobbit) {
    console.log(name, arguments[0]); // name name
    // 改变形参
    name = 'new name';
    console.log(name, arguments[0]); // new name new name
    // 改变arguments
    arguments[1] = 'new age';
    console.log(age, arguments[1]); // new age new age
    // 测试未传入的是否会绑定
    console.log(sex); // undefined
    sex = 'new sex';
    console.log(sex, arguments[2]); // new sex undefined
    arguments[3] = 'new hobbit';
    console.log(hobbit, arguments[3]); // undefined new hobbit

}
foo('name', 'age')
传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享
除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的。
```
+ 强大的ES6
```
function func(...arguments) { // 扩展
    console.log(arguments); // [1, 2, 3]
}
func(1, 2, 3);
```
### JavaScript深入之创建对象的多种方式以及优缺点
+ 1. 工厂模式
```
function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;
}
var person1 = createPerson('kevin');
缺点：对象无法识别，因为所有的实例都指向一个原型
```
+ 2. 构造函数模式
```
function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}
var person1 = new Person('kevin');
优点：实例可以识别为一个特定的类型
缺点：每次创建实例时，每个方法都要被创建一次

function Person(name) {
    this.name = name;
    this.getName = getName;
}
function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');
优点：解决了每个方法都要被重新创建的问题
缺点：这叫啥封装……
```
+ 3. 原型模式
```
function Person(name) {

}
Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};
var person1 = new Person();
优点：方法不会重新创建
缺点：1. 所有的属性和方法都共享 2. 不能初始化参数

function Person(name) {
}
Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};
var person1 = new Person();
优点：封装性好了一点
缺点：重写了原型，丢失了constructor属性

function Person(name) {
}
Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};
var person1 = new Person();
```
+ 4. 组合模式
```
function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

+ 5.1 寄生构造函数模式
```
function Person(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };
    return o;
}
var person1 = new Person('kevin');
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object)  // true
也就是说打着构造函数的幌子挂羊头卖狗肉，你看创建的实例使用 instanceof 都无法指向构造函数！
```
+ 5.2 稳妥构造函数模式
```
function person(name){
    var o = new Object();
    o.sayName = function(){
        console.log(name);
    };
    return o;
}
var person1 = person('kevin');
person1.sayName(); // kevin
person1.name = "daisy";
person1.sayName(); // kevin
console.log(person1.name); // daisy
与寄生构造函数模式有两点不同：
新创建的实例方法不引用 this
不使用 new 操作符调用构造函数
稳妥对象最适合在一些安全的环境中。
稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。
```
   




