# 大规模nodejs项目架构与优化

标签（空格分隔）： node深入浅出， 

---

+   为什么用node
    node中间层
    node削减api
    node ssr
    前后端分离
    异步 吞吐量 聊天
    node更好前后端分离 上线
    0秒热起。子进程send自杀，守护进程热起。
+ 异步Io的好处
    Ui阻塞，js的线程和UI渲染线程通用。
    cpu时钟周期
+ 文件操作符
    异步I/o需要再次读取。实现方式分===================== 书上
    文件操作符占用过多
+ node对异步Io的实现
    js v8引擎 和操作系统绑定
    事件队列/任务队列
    同步操作交个工作线程（占用文件描述符)
    v8->判断平台（libuv,window(iocp),linux(自定义线程池））Event Queue ->EVENT LOOP->worker Threads（回调）->Event Loop -> Event Queue
+ 几个特殊API
    setTimeout和setInterval不参与线程池
    process.nextTick()实现类似。setTimeout(function(){},0);每次调用放入队列中。在下一轮中执行。
    node实现sleep.
    promise.nextTick（当前主线执行完之后），
    setImmediate(最后执行)优先级比process.nextTick优先级低
+ 64位编译器
    char ：1个字节
    char*(即指针变量): 8个字节
    short int : 2个字节
    int：  4个字节
    unsigned int : 4个字节
    float:  4个字节
    double:   8个字节
    long:   8个字节
    long long:  8个字节
    unsigned long:  8个字节
+ JS 中所有的数字类型，实际存储都是通过 8 字节 double 浮点型 表示的。浮点数并不是能够精确表示范围内的所有数的， 虽然 double 浮点型的范围看上去很大: 2.23x10^(-308) ~ 1.79x10^308。 可以表示的最大整数可以很大，但能够精确表示，使用算数运算的并没有这么大。
它其实连这样的简单加法也会算错：
```
console.log(0.1 + 0.2)
//output: 0.30000000000000004
```
所以在 js 中能够安全使用的有符号 安全 大整数（注意这里是指能够安全使用，进行算数运算的范围），并不像其他语言在 64 位环境中那样是:
2^63 - 1;//9223372036854775807 而是 Math.pow(2, 53) - 1     // 9007199254740991
```
JS 的最大和最小安全值可以这样获得:
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
console.log(Number.MIN_SAFE_INTEGER); //-9007199254740991
```

    
    
    




