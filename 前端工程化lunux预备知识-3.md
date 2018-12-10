# 前端工程化lunux预备知识

标签（空格分隔）： scp ssh 免密登录

---

### 操作系统
> ubuntu centos redhat Fedora Debian
hostnamectl 修改主机名
vim i esc wq! /(查找）
systemctl enable disable stop start restart + (服务名)
yum wget 命令行下载器
ctrl+s 暂停屏幕输出 
ctrl+q 恢复 
ctrl+d退出xshell 
ctrl+c结束正在运行程序 
ctrl+e ctrl+h ctrl+l清屏
echo $PATH 全局目录
ls -a 隐藏目录
ps aux | grep nginx
ps -ef | grep nginx
pwd 当前目录
pkill nginx
kill pid（进程编号)
ppid（父进程编号)
kill -9 pid
w 查看用户登录数
IP addr
ifconfig
ip route
traceroute www.baidu.com // 追踪路由 netstat ss命令 // 占用网络端口的进程
netstat -an 查看端口
ss/netstat -anp | grep 80 // 过滤80端口
ifup/down  etho // 重启网卡
父子进程占用一个端口 比如nginx 80

### 进程 线程 协程
+ 进程
:    分担系统资源（cpu时间，内存)的实体
> sshd ->shell ->ping www.baidu.com
守护进程
s 休眠状态 
Z 僵尸进程/孤儿进程 

+ 线程
:    操作系统能够进行运算调度的最小单位。

+ 协程
:    一种用户态的轻量级**线程**，无法利用多核资源

+ IO密集型应用：多进程 -> 多线程 -> 时间驱动 -> 协程
+ cpu(计算）密集型应用发展： 多进程 -> 多线程
> 视频，ps
nginx 复合型。主进程 子进程（减少一个cpu内切换进程，各占一个cpu内核）

+ 调度和切换时间： 进程 > 线程 > 协程
+ GPU (挖矿浮点数） cpu（整数)
+ 进程和线程
>  多进程，允许多个任务同时运行
>  多线程，允许单个任务分成不同的部分运行。
>  提供协调机制，防止进程和线程之间冲突，允许进程和线程之间共享资源。端口占用，nginx node。包上有端口编号。进程绑定端口，获取固定包。
> 多线程进程共用一套 代码 数据 文件（文件句柄)
> 多线程进程不共用 寄存器 栈

### 免密登录
+ 免密登录步骤
> 生成密钥对
上传配置公钥
配置本地私钥
免密登录功能的本地配置文件

+ 生成密钥对
>  ssh-keygen -t rsa -C "zhouzhou" -f zhouzhou_rsa

+ 上传配置公钥
>  ssh-copy-id -i zhouzhou_rsa.pub root@119.29.6.254
在ssh authorized_keys里面
+ 登录
> 方法一：ssh -i zhouzhou_rsa root@119.29.6.254
方法二： 
+ 上传文件
> scp -i zhouzhou_rsa 上传文件 root119.29.6.254 :/usr/src

### 修改banner
> /etc/ssh/sshd.config 打开banner 配置路径
新增文件路径 加入字符图
systemctl restart sshd // 重启




