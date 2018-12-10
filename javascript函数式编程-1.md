# 函数式编程

标签（空格分隔）： 范畴论

---

### 范畴论
范畴(集合，函数）
:    定义：彼此之间存在某中关系的概念、事物、对象等等，构成范畴。范畴就是使用箭头连接的物体。

+ 箭头表示范畴成员之间的关系，正式的名称叫做"态射"（morphism）。
+ 通过"态射"，一个成员可以变形成另一个成员。
+ 所有成员是一个集合
+ 变形关系是函数
+ 范畴与容器 （类）
：    值（成员变量）
：    值的变形关系，也就是函数。（成员方法）
```
class Category {
    constructor(val) {
        this.val = val;
    }
    addOne(x) {
        return x + 1;
    }
}
```
+ 范畴和函数式编程关系（范畴论使用函数，表达范畴之间的关系。）
>    在函数式编程中，函数就是一个管道（pipe）。这头进去一个值，那头就会出来一个新的值，没有其他作用。
+ react高阶组件带动函数式编程火。
+ 函数式第一等公民
+ 不可改变量。变量在函数式编程中也被函数代替了。
+ map和reduce是最常用的函数式编程的方法。
+ 没有副作用
+ 只用表达式，不用语句
+ 引用透明，函数运行只靠参数。
+ 纯函数 Array.slice，没有副作用，对于固定的输入，总是固定输出。splice不是，修改了数组。除了参数，没有外部其他参数。
```
loadsh.js
_.memorize
_.curry()
_.values()
```
+ 幂等性 执行无数次，还具有相同效果。
+ poniter free
>  let ceos = companines.map(c=>c.ce0);
var toupperCase = word => word.toUpperCase();
var split = x => (str=>str.split(x))'灵活组合，暴露出内部的。jquery。
+ 命令式代码；
+ **声明式代码**，不需要知道内部细节。例如map;
+ 惰性求值 ajax xhr;
+ 高阶函数 一等公民 函数作为参数 内部放回封装的函数作为结果。
+ es6中尾递归，函数扩展章节
+ 尾调用自身，就称为尾递归。尾调用优化。尾递归优化。
```
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
```
```
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5, 1) // 120
```
+ 闭包
+ 爆栈和死循环。前者会报错,占内存，卡浏览器。后者，占用主js线程。

### 函数的合成与柯里化
合成
:   定义：如果一个值要经过多个函数，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做"函数的合成"（compose）。
函数的合成还必须满足结合律
```
const compose = function (f, g) {
    return function (x) {
        return f(g(x));
    }
}
```
范畴
:    所谓"柯里化"，就是把一个多参数的函数，转化为单参数函数。
```
// 柯里化之前
function add(x, y) {
    return x + y;
}
add(1, 3);

// 柯里化之后
function addX(y) {
    // 闭包，保存y: 2
    return function (x) {
        return x + y;
    }
}
addX(2)(1);
```
### 函子（Functor类）,map变形关系，值，容器转化成另一个容器的能力。特殊的容器，具有map,转化为另一个容器的能力。
概念
:   函数不仅可以用于同一个范畴之中值的转换，还可以用于将一个范畴转成另一个范畴。这就涉及到了函子（Functor）。它首先是一种范畴，也就是说，是一个容器，包含了值和变形关系。比较特殊的是，**它的变形关系可以依次作用于每一个值，将当前容器变形成另一个容器。**
![函子图](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017022203.png)
:    上图中，左侧的圆圈就是一个函子，表示人名的范畴。**外部传入函数f**，会转成右边表示早餐的范畴。

+ 函子代码实现。任何具有map方法的数据结构，都可以当作函子的实现。

```
class Functor {
    constructor(val) {
        this.val = val;
    }
    map(f) {
        return new Functor(f(this.val));
    }
}
```
```
(new Functor(2).map(function (tow) {
    return tow + 2; // map返回的还是个函子。可接受纯函数。
}

(new Functor('flame')).map(function (s) {
    return s.toUpperCase();
});

(new Functor('bombs')).map(_.concat('away')).map(_.prop('length'));
```

+ 上面的例子说明，函数式编程里面的运算，都是通过函子完成，即运算不直接针对值，而是针对这个值的容器----函子。**学习函数式编程，实际上就是学习函子的各种运算**。

### of方法
of
:    函数式编程一般约定，函子有一个of方法，用来生成新的容器。
```
Functor.of = function (val) {
    return new Functor(val);
}

// 上面函数改写
Functor.of(2).map(function (tow) { // Functor类的静态方法of.
    return tow + 2;
}
```
+ Maybe函子
空值
:    函子接受各种函数，处理容器内部的值。容器内部的值可能是一个空值（比如null），而外部函数未必有处理空值的机制，如果传入空值，很可能就会出错。
```
Functor.of(null).map(function (s) {
    return s.toUpperCase();
});

class Maybe extends Functor {
    map(f) {
        return this.val ? Maybe.of(f(this.val)) : Maybe.of(null);
    }
}
```
### Either函子
Either
:    条件运算if...else是最常见的运算之一，函数式编程里面，使用 Either 函子表达。

+ Either 函子内部有两个值：左值（Left）和右值（Right）。右值是正常情况下使用的值，左值是右值不存在时使用的默认值。
```
class Either extends Functor {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  map(f) {
    return this.right ? 
      Either.of(this.left, f(this.right)) :
      Either.of(f(this.left), this.right);
  }
}
Either.of = function (left, right) {
  return new Either(left, right);
};
```
```
// 使用
var addOne = function (x) {
  return x + 1;
};

Either.of(5, 6).map(addOne);
// Either(5, 7);

Either.of(1, null).map(addOne);
// Either(2, null);
```
```
function parseJSON(json) {
    try {
        return Either.of(null, JSON.parse(json));
    } catch (e: Error) {
        return Either.of(e, null);
    }
}
上面代码中，左值为空，就表示没有出错，否则左值会包含一个错误对象e。一般来说，所有可能出错的运算，都可以返回一个 Either 函子。
```
### ap函子
ap函子(ap 是 applicative（应用）的缩写。)
:    函子里面包含的值，完全可能是函数。我们可以想象这样一种情况，一个函子的值是数值，另一个函子的值是函数。
```
有时，我们想让函子B内部的函数，可以使用函子A内部的值进行运算。
function addTow(x) {
    return x + 2;
}
const A = Functor.of(2);
const B = Functor.of(addTow);

class Ap extends Functor {
    ap(F) {
        return Ap.of(this.val(F.val));
    }
}

Ap.of(addTow).ap(Functor.of(2))
// Ap(4);
```
```
ap 函子的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，实现函子的链式操作。
function add(x) {
    return function (y) {
        return x + y;
    };
}
Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));
Ap(5);

Ap.of(add(2)).ap(Maybe.of(3));
```

### Monad函子
Monad函子
:    函子是一个容器，可以包含任何值。函子之中再包含一个函子，也是完全合法的。但是，这样就会出现多层嵌套的函子。Monad 函子的作用是，总是返回一个单层的函子。
```
class Monad extents Functor {
    join() {
        return this.val;
    }
    flatMap(f) {
        retrun this.map(f).join();
    }
}
```
### Io操作
Monad函子操作
:    Monad 函子的重要应用，就是实现 I/O （输入输出）操作。
```
var fs = require('fs');
var readFile = function (filename) {
    return fs.readFileSync(filename, 'utf-8');
});

var print = function (x) {
    return new Io(function () {
        console.log(x);
        return x;
    });
}

readFile('./user.txt').flatMap(print);

var tail = function (x) {
    return new Io(function () {
        return x[x.length -1];
    });
}
readFile('./user.txt').flatMap(tail).flatMap(print);

readFile('./user.txt').chain(tail).chain(print);
上面代码读取了文件user.txt，然后选取最后一行输出。
```

### RXJS (FRP,函数式响应式编程）流
+ 异步队列 vue
+ zong rxjs aguluar.js
+ 转化为流。类似then
+ 现在浏览器observer promise流，


### cycle.jsz（流式的react)

### underscore.js（函数式编程)
> self.self = self; window.self == self;

### randajs
### loadsh.js






   





