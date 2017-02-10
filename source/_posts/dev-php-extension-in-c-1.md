---
layout: post
title: "用C语言开发PHP扩展（一）——入门与填坑"
description: "dev php extension in c 1"
category: PHP-Extension-Dev
tags: [php, c]
date: 2016-08-30
---

1. 开发环境
2. PHP源码
3. 函数定义
4. 扩展骨架
5. 开发步骤

    >   To use your new extension, you will have to execute the following steps:

    >    1. $ cd ..
    >    2. $ vi ext/myfunctions/config.m4
    >    3. $ ./buildconf
    >    4. $ ./configure --[with\|enable]-myfunctions
    >    5. $ make
    >    6. $ ./php -f ext/myfunctions/myfunctions.php
    >    7. $ vi ext/myfunctions/myfunctions.c
    >    8. $ make

    >    Repeat steps 3-6 until you are satisfied with ext/myfunctions/config.m4 and
    >    step 6 confirms that your module is compiled into PHP. Then, start writing
    >    code and repeat the last two steps as often as necessary.

6. 函数实现
7. 编译
8. 测试运行

-   跨平台CRLF与LF
-   bison安装
    checking for bison version... invalid
    configure: WARNING: This bison version is not supported for regeneration of the Zend/PHP parsers (found: none, min: 204, excluded: ).
    checking for re2c... no
    configure: WARNING: You will need re2c 0.13.4 or later if you want to regenerate PHP parsers.
    configure: error: bison is required to build PHP/Zend when building a GIT checkout!

-   libxml2
    configure: error: xml2-config not found. Please check your libxml2 installation.
    解决
    apt-get install libxml2-dev

-   ./sapi/cli/php

https://www.hongweipeng.com/index.php/archives/739/


## 未完待续。。。