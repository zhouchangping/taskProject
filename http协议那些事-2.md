# http协议

标签： http协议 https协议 http2协议 http3 后台服务与http 反向代理与web服务

---
+ 网关 不同网络间
+ 路由器 驿站；
+ 网卡 电脑设备上
+ dns解析
+ 拓扑结构
+ TCP/IP
    iso/osi: 应用层 表示层 会话层 传输层 网络层 数据链路层 物理层
    tcp/ip: 应用层（http,邮件，ftp) 传输层(tcp，udp) 网络层(电脑对电脑 Ip地址） 网络接口层（一层：电脑到电缆，wifi，网线。二层：网卡以内，mac地址，硬件地址）
+ http事务。一次http请求
    tcp连接 客户端发送 服务器接受返回   断开连接，客户端处理数据，显示
+ 请求组成
    请求行 消息报头 请求正文
+ 响应组成
    状态行 消息报头 响应正文
+ http请求模型
    http 默认端口 80
    客户端 服务端
+ 请求方法：GET POST HEAD(测试，返回header部分) PUT DELET TRACE(ping 只返回你传送的，原封不动。测试) CONNECT（管道方式） OPTIONS(查询服务器性能，管理操作）
+ 状态码：1xx:请求已接收，继续处理。 2xx:成功接收。 3xx: 重定向。 4xx: 客户端错误。 5xx: 服务器错误。
+ cookies与session
    cookies是保存在客户端的小段文本，随客户端点每个请求发送url下所有cookies到服务器。
    cookie由服务器生成，发送给浏览器。也可以客户端生成。服务端生成相当于会员卡，用来验证。
    单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。
    session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用COOKIE。
    cookie数据存放在客户的浏览器上，session数据放在服务器上。
    cookies和标记，标记（口令）每次不一样。
    session持久化，存入数据库。验证先从session中获取，然后读数据库
    session加user-agent,浏览器指纹，ip地址强加密等等。
    cookies被禁用，用url回显。动态权鉴（服务器产生）
+ 缓存机制
    优点：减少相应延迟，减少网络带宽。
    连接数资源，消耗cpu资源
    数据量大，
    服务器资源一般不变（静态资源，html,img,js,css）
    第一次，浏览器和服务器，缓存协商。（时间，策略，etag或则last-modifield）
    第二次，如果有缓存，看是否过期，过期了，看etag是否过期。
    强制缓存(时间决定） / 比较缓存
    Etag/if-none-match  last-modified/if-modified-since
+ 协议分析
    https: 默认端口，443， tls、ssl
    数字证书：由权威公司签发。成对（一个在服务器，一个在权威机构）
    http2: 使用二进制格式传输。对报头压缩，降低开销。多路复用。服务器推送。
    websocks（应用层模拟tcp连接） ajax 或则服务器推送
    https: http-over-QUIC 基于udp协议上的协议。应用层。
+ 反向代理
    加密和sll加速
    负载均衡
        循环复用DNS服务器->反向代理服务器
    缓存静态内容
    压缩
    减速上传 控制流量（百度网盘）会员
    安全 机房和外部
    外网发布 外网vps开nginx起反向代理，代理到本地服务node端口。
    实例：ping百度。
+ nginx配置(开启node nginx，然后配置nginx)
    worker_processes 工作进程 cpu数量
    worker_connections 
    ssl_session_cache: https
    ssh root@192.1231
    upstream web_crm（名字） { // 代理应用
        server 127.0.0.1:8090;
    }
    location /crm/(请求url路径) {
        proxy_pass http://web_crm_crm/crm(端口下路径);
    }
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';




