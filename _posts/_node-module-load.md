---
title: 关于node.js的模块加载机制
date: 2017-03-10 00:17:42
tags: node.js
description: node-module-load
category: JavaScript
---

关于node.js的模块加载机制，看了一些资料，总结一下，其实主要需要记住两点。

1. node.js会缓存已加载的模块

1. node.js通过绝对路径来标定一个模块


## 参考

- [Node.js中相同模块是否会被加载多次？  - 老赵点滴 - 追求编程之美](http://blog.zhaojie.me/2011/12/same-node-module-load-multiple-times.html)

- [require() 源码解读 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/05/require.html)

- [深入浅出Node.js（三）：深入Node.js的模块机制](http://www.infoq.com/cn/articles/nodejs-module-mechanism)
