---
title: 一些好用的HTTP调试工具
date: 2017-07-30 20:19:16
tags: [tools]
description: "http-debug-tools"
category: Tools
---

## 一、发送请求

### cURL

cURL 是Linux下的命令行工具，windows 下可通过MinGW安装（安装Git for windows即可）。

基本用法：

- GET

```bash
curl "http://www.hotmail.com/when/junk.cgi?birthyear=1905&press=OK"
```

- POST

```bash
# application/x-www-form-urlencoded
curl --data "birthyear=1905&press=%20OK%20"  http://www.example.com/when.cgi
```

- HEAD

```bash
curl --head "http://www.hotmail.com/when/junk.cgi?birthyear=1905&press=OK"
```

### HTTPie

HTTPie 是使用python开发的命令行工具，可用pip安装。

基本用法：

```bash
http [flags] [METHOD] URL [ITEM [ITEM]]
```

### Postman/Restlet Client

Postman 和 Restlet Client都是Chrome下的扩展（应用），具有图形化界面，很容易使用。
- [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
- [Restlet Client](https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm)

## 二、抓包(未完待续。。。)

### Fiddler/Charles

### Wireshark

### Chrome dev-tools

### TcpDump

## 参考

- [curl - Tutorial](https://curl.haxx.se/docs/httpscripting.html)

- [Documentation | HTTPie – CLI HTTP client](https://httpie.org/doc)