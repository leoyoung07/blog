---
title: 关于TCP的那些琐事
date: 2017-07-30 12:57:29
description: "tcp-notes"
category: TCP
tags: [tcp]
---

## 一、关于连接状态与心跳包

### 主动断开连接

如果一方主动断开连接，另一方尝试接收数据时会抛出异常，例如C#下会抛出`SocketException`:

```text
ErrorCode: 10054
Message: "远程主机强迫关闭了一个现有的连接。"
SocketErrorCode: ConnectionReset
```

捕获该异常，可以判断对方是否主动断开连接。

### 网络异常断开连接

如果是网络异常导致连接断开，接收数据的一方无法得知网络连接状态，这时就需要用心跳机制来解决这个问题。TCP 本身有 Keepalive 选项，但默认关闭，而且检测周期过长（2个小时），因此一般都在应用层自己实现心跳包。心跳包即像心跳一样每隔一段时间向对方发送一个数据包，告诉对方自己连接正常。根据业务场景需要，心跳包可以两边都发送或者由一边主动发送，发送周期可设置在30s左右。如果由客户端主动发心跳包，服务端被动检测连接的周期可
设置为客户端发送周期的两到三倍。

## 二、关于消息格式

### TLV格式

消息格式可基于TLV（Type Length Value）进行设计：

> [int32_t]Type(4bytes) | [int32_t]Length(4bytes) | [bytes array]Value |

这种格式较为常见，接收方获得 Type 和 Length 后即可动态创建buffer接收、处理数据。

### 文本格式

消息格式也可以使用类似http协议的文本格式进行设计：

> Header \r\n\r\n Body

文本格式便于扩展和阅读，更加灵活。这也是 *UNIX编程艺术* 一书中推荐的协议格式。

## 三、关于字节序

### 大端序与小端序

不同计算机对多字节整型的存储方式不同：

> Some computers put the most significant byte first (known as big-endian order) and others put the least-significant byte first (known as little-endian order).

定义：
> 如果最低有效位在最高有效位的前面，则称小端序；反之则称大端序

不同计算机可能采用不一样的字节序（主机字节序），而网络传输一般采用大端序（网络字节序）。

### 主机字节序与网络字节序的转换

C#中的`IPAddress`类提供了两个方法对主机字节序与网络字节序进行转换：

```C#
public static int NetworkToHostOrder(int network)
public static int HostToNetworkOrder(int host)
```

## 参考

- [TCP keepalive overview](http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html)

- [服务端主动发送心跳包，还是客户端发送比较好？](https://www.zhihu.com/question/35896874)

- [闲说HeartBeat心跳包和TCP协议的KeepAlive机制](https://www.felix021.com/blog/read.php?2076)

- [大多tcp应用采用长度+数据的格式传输数据，如何防止恶意虚报长度？](https://www.zhihu.com/question/58628159/answer/157900365)

- [IPAddress.NetworkToHostOrder Method](https://msdn.microsoft.com/en-us/library/653kcke1.aspx)

- [字节顺序-维基百科](https://zh.wikipedia.org/wiki/%E5%AD%97%E8%8A%82%E5%BA%8F)

- [Big and Little Endian](https://www.cs.umd.edu/class/sum2003/cmsc311/Notes/Data/endian.html)