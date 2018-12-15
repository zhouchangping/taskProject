# javascript标准库

标签（空格分隔）： 全局变量

---

## 全局对象和全局的对象
 严格模式：undfined 非严格模式 this(window）
## 内置对象
+ Infinity属性     Infinity 是一个数值，表示无穷大。
全局属性 NaN 的值表示不是一个数字（Not-A-Number）等号运算符（== 和 ===） 不能被用来判断一个值是否是 NaN。必须使用 Number.isNaN() 或 isNaN() 函数。在执行自比较之中：NaN，也只有NaN，比较之中不等于它自己
```
NaN === NaN;        // false
Number.NaN === NaN; // false
isNaN(NaN);         // true
isNaN(Number.NaN);  // true

function valueIsNaN(v) { return v !== v; }
valueIsNaN(1);          // false
valueIsNaN(NaN);        // true
valueIsNaN(Number.NaN); // true
```
+ 全局属性undefined： 表示原始值undefined。它是一个JavaScript的 原始数据类型 。一个没有被赋值的变量的类型是undefined。如果方法或者是语句中操作的变量没有被赋值，则会返回undefined
null: 字面量，未定义的对象
```
typeof null        // "object" (因为一些以前的原因而不是'null')
typeof undefined   // "undefined"
null === undefined // false
null  == undefined // true
null === null // true
null == null // true
!null //true
isNaN(1 + null) // false
isNaN(1 + undefined) // true
```
## 函数属性
+ eval():eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。执行指定代码之后的返回值。如果返回值为空，返回undefined
```
function test() {
  var x = 2, y = 4;
  console.log(eval("x + y"));  // 直接调用，使用本地作用域，结果是 6
  var geval = eval; // 等价于在全局作用域调用
  console.log(geval("x + y")); // 间接调用，使用全局作用域，throws ReferenceError 因为`x`未定义
  (0, eval)('x + y'); // 另一间接调用的例子
​}
eval 中函数作为字符串被定义需要“（”和“）”作为前缀和后缀节
var fctStr1 = 'function a() {}'
var fctStr2 = '(function a() {})'
var fct1 = eval(fctStr1)  // return undefined
var fct2 = eval(fctStr2)  // return a function​​​​​​
```
+ isFinite():该全局 isFinite() 函数用来判断被传入的参数值是否为一个有限数值（finite number）。
```
isFinite(Infinity);  // false
isFinite(NaN);       // false
isFinite(-Infinity); // false
isFinite(0);         // true
isFinite(2e64);      // true, 在更强壮的Number.isFinite(null)中将会得到false
isFinite("0");       // true, 在更强壮的Number.isFinite('0')中将会得到false
```
+ parseFloat: parseFloat() 函数解析一个字符串参数并返回一个浮点数。给定值被解析成浮点数。如果给定值不能被转换成数值，则会返回 NaN。
+ parseInt: parseInt() 函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)。返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。
+ decodeURI() 函数解码一个由encodeURI 先前创建的统一资源标识符（URI）或类似的例程。
+ decodeURIComponent() 方法用于解码由 encodeURIComponent 方法或者其它类似方法编码的部分统一资源标识符（URI）。
+ encodeURI()  函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。
## JSON
+ JSON.parse()方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。
```
var json = '{"result":true, "count":42}';
obj = JSON.parse(json);
```
```
JSON.parse('{"p": 5}', function (k, v) {
    if(k === '') return v;     // 如果到了最顶层，则直接返回属性值，
    return v * 2;              // 否则将属性值变为原来的 2 倍。
});                            // { p: 10 }
```
```
不允许使用逗号作为结尾符
JSON.parse("[1, 2, 3, 4, ]");
JSON.parse('{"foo" : 1, }');
```
```
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null
JSON.parse('1');               //  1
```
+ JSON.stringify()方法是将一个JavaScript值(对象或者数组)转换为一个JSON字符串，如果指定了replacer是一个函数，则可以替换值，或者如果指定了replacer是一个数组，可选的仅包括指定的属性。
```
JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'
JSON.stringify({x: 5, y: 6});              // "{"x":5,"y":6}"
```
```
function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}

var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
var jsonString = JSON.stringify(foo, replacer);
```
```
JSON.stringify(foo, ['week', 'month']);  
// '{"week":45,"month":7}', 只保留“week”和“month”属性值。
```
+ PHP json_encode()用于对变量进行JSON编码，该函数如果执行成功返回 JSON 数据，否则返回 FALSE 。
```
   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
   echo json_encode($arr);
```
+ PHP json_decode() 函数用于对JSO格式的字符串进行解码，并转换为 PHP变量。
```
mixed json_decode ($json_string [,$assoc = false [, $depth = 512 [, $options = 0 ]]])
assoc: 当该参数为 TRUE 时，将返回数组，FALSE 时返回对象。

$json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
var_dump(json_decode($json));
var_dump(json_decode($json, true));
```
## 基本对象
+ 通过Error的构造器可以创建一个错误对象。当运行时错误产生时，Error的实例对象会被抛出。
```
if(a) {
    throw new Error('val');
}
```
+ Function 构造函数 创建一个新的Function对象。 在 JavaScript 中, 每个函数实际上都是一个Function对象。
```
var sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 6));
```
    apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。返回调用有指定this值和参数的函数的结果。
```
var arr = [1, 3, 4, 6];
var max = Math.max.apply(null, arr);
console.log(max);
```
    bind()方法创建一个新的函数，当这个新函数被调用时其**this**置为提供的值，其参数列表前几项置为创建时指定的参数序列。
    fun.bind(thisArg[, arg1[, arg2[, ...]]]);返回返回由指定的this值和初始化参数改造的原函数拷贝
```
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}
var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined
var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```
    call() 方法调用一个函数,其具有一个指定的this值和分别地提供的参数(参数的列表)。fun.call(thisArg, arg1, arg2, ...)返回值是你调用的方法的返回值，若该方法没有返回值，则返回undefined。
```
function Product(name, price) {
  this.name = name;
  this.price = price;
}
function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}
console.log(new Food('cheese', 5).name);
// expected output: "cheese"
```
    Function.prototype.toString();该toString()方法返回一个表示当前函数源代码的字符串。Function 对象覆盖了从 Object 继承来的 Object.prototype.toString 方法。
    
+  Object
Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。Object.assign(target, ...sources) 返回target
Object.assign 不会跳过那些值为 null 或 undefined 的源对象。
```
const object1 = {
  a: 1,
  b: 2,
  c: 3
};
const object2 = Object.assign({c: 4, d: 5}, object1);
```
```
function test() {
  'use strict';

  let obj1 = { a: 0 , b: { c: 0}};
  let obj2 = Object.assign({}, obj1);
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}
  
  obj1.a = 1;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}
  
  obj2.a = 2;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}
  
  obj2.b.c = 3;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
  console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}
  
  // Deep Clone 没有相互关系
  obj1 = { a: 0 , b: { c: 0}};
  let obj3 = JSON.parse(JSON.stringify(obj1));
  obj1.a = 4;
  obj1.b.c = 4;
  console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}
}
test();
```
Object.is()方法判断两个值是否是相同的值。Object.is(value1,value2);表示两个参数是否相同的Boolean 。
Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。
    一个表示给定对象的所有可枚举属性的字符串数组。
```
Object.keys("foo");
// TypeError: "foo" is not an object (ES5 code)

Object.keys("foo");
// ["0", "1", "2"]                   (ES2015 code)
```
Object.valueOf() 方法返回指定对象的原始值。
```
// Array：返回数组对象本身
var array = ["ABC", true, 12, -5];
console.log(array.valueOf() === array);   // true

// Date：当前时间距1970年1月1日午夜的毫秒数
var date = new Date(2013, 7, 18, 23, 11, 59, 230);
console.log(date.valueOf());   // 1376838719230

// Number：返回数字值
var num =  15.26540;
console.log(num.valueOf());   // 15.2654
```
Object.prototype.toString() toString() 方法返回一个表示该对象的字符串。
```
var o = new Object();
o.toString(); // returns [object Object]

var toString = Object.prototype.toString;
toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]
//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
```
+ symbol Symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。
```
const sy = symbol();
const sy1 = symbol('42');
console.log(Symbol('foo') === Symbol('foo')); // false
```
    Symbol.length:长度属性值为0。Symbol.prototype
描述symbol构造函数的原型。





