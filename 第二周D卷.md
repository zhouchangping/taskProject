# 第二周D卷

标签（空格分隔）： nodejs 

---
+ 1.大家在开发Node.js的时候都知道异步的嵌套非常麻烦，有人叫回调地域有人叫回调
黑洞，请问如何解决这个问题？（5分） 
:    模式.promise/Defferred 如q.js Step、wind ES6 Generator函数 + Promise对象  Async await 函数
==================================手写promise================================

ES6 Generator函数 + Promise对象
```
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
      // console.log(data.toString());
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
  return f2;
};
var aNext = gen();
aNext.next();
aNext.next();
aNext.next();       
```
 Async await 函数
```
const asyncReadFile = async function (fss) {
  	const f1 = await readFile(fss);
    console.log(f1.toString());
  	const f2 = await readFile(f1.toString());
      console.log(f2.toString());
      return f2.toString();
};

asyncReadFile('test.txt').then(function (result) {
  console.log(result);
});
```
+  2.如何解释NodeJS 适用于IO密集型不适用CPU密集型？（5分）
:    node还没有简易的多核计算接口
     node的单核效率虽然比传统脚本语言高，但是和C,C++,JAVA比并没有优势。
     ==========================多线程通信=======================

+ 3.请画出Node.js的异步事件回调机制的实现,并解释原理。（5分） 
:    [https://juejin.im/post/5b0524f8518825428a2631ee]

+ 4.开完一个完整的Node程序，有UI层、Service层、DAO层、MODEL层等，我们要在交给 QA前需要编写测试用例。测试用例一般遵循测试金字塔（测试金字塔指的是在编写 测试用例时，底层的单元测试应该远比上层的端到端测试要多，如下图）请问在如下 三个阶段，都用什么样的技术进行测试用例的编写。（10分
:    ui: selenium-webdriver  Nigthwatch f2etest  Rize Backstop
     server: mocha supertest 
     unit: karma PhantomJS+chai Jest

+ 5.有人说Node是玩具，写错一处整个网站就挂。为了解决它你有什么办法么？(10分) 
:    中间件处理常见404 500
     关键函数 比如请求进行封装 容错重试等
     全部错误监听uncaughtExcetion 
     日志

+ 6-1.请你写出HTTP协议三次握手，四次挥手过程，并写出常见的HTTP Status Code标 明 他的含义、你知道的HTTP请求报头以及HTTP2的优点（5分）
:    三次握手，四次挥手[https://hit-alibaba.github.io/interview/basic/network/TCP.html]

    常⻅见的HTTP相应状态码 
    1xx: 指示信息--表示请求已接收，继续处理
    2xx: 成功--表示请求已被处理、理解、接收
    3xx: 重定向--要完成请求必须进行更一步的操作
    4xx: 客户端请求有语法错误或请求无法实现
    5xx: 服务器错误--服务端未能实现合法的请求

+  6-2.你知道什么是OSI七层模型和TCP/IP五层模型么，请详细描述。 
 

7.看你简历中有说使用NodeJS完成BFF的架构搭建，你能说明下为什么你们团队使用 Node以及具体的技术栈。(20分) 
:    1.削减API提高前端性能
     2.更好的前后端分离 减少跨域
     3.方便前端自主开发ssr
     4.大规模的吞吐 适用于开发游戏中间件
+ 8.NodeJS使用了Scavenge、Mark-Sweep 、 Mark-compact算法进行垃圾回收，请绘制三种 算法的原理，并描述何种情况下会造成NodeJS的内存泄露，如何检测？(20分) 
:    Scavenge 
        新生代：from to  scanPointer allocatePointer(扫描指针 分配指针）32
        老生代：1.4G || 0.7G
     Mark-Sweep & Mark-compact



