---
layout: post
title: "局域网环境下的“云”剪贴板"
description: "cloud clipboard based on lan"
category: LeoYoungProjects
tags: [c#, tcp, udp]
date: 2016-12-04
---


## 需求

有两台电脑在同一局域网下，有时需要将一些内容从一台电脑复制粘贴到另一台，用OneNote等在线笔记工具同步不够及时，不方便。因此，需要一个能够在局域网不同电脑之间共享剪切板内容的工具。

## 设计

- 开发语言

    在windows环境下开发，使用C#作为开发语言。

- 数据传输

    由于需要实时、双向传输数据，所以采用 TCP 协议来实现数据传输。

- 建立连接

    建立 TCP 连接需要知道对方的IP，在使用动态获取IP的局域网内，每次连接都需要手动查询、填写IP，很繁琐。因此，考虑先使用 UDP 组播来实现自动获取局域网内其他客户端的IP地址，之后再改用 TCP 协议进行连接、传输数据。

- 操作剪切板内容

    .NET 提供了 API，可以方便地设置和获取系统剪切板的内容。为方便操作，通过注册全局快捷键来实现将内容复制到剪切板并传输到其他电脑的客户端。

## 代码实现

代码已上传至GitHub：
[L-ShareAssistant](https://github.com/leoyoung07/L-ShareAssistant)

## 未完待续。。。
