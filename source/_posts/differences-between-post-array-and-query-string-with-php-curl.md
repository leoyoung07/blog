---
layout: post
title: "PHP curl post 数组与 post query字符串的区别"
description: ""
comments: true
category: PHP
tags: [php, curl, post]
date: 2016-03-30
---

使用PHP的curl方法post数据时通常使用以下方法：

```php
$post_fields = ["aaa"=>"aaaa", "bbb"=>"bbbb"];
$url = "http://localhost/sandbox/PHPTest/output.php";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
echo $response;
```

$url为php页面时，该方法没有遇到问题，但$url为jsp页面时，出现post数据为空的情况，即在jsp页面用`request.getParameter("aaa")`得到的结果为null。尝试将$post_fields拼接为query字符串：

```php
$post_fields = http_build_query($post_fields);
```

结果正确。
抓包对比直接post数组与post query字符串两种方法结果如下：

- ### 直接post数组
    - header

        ![array header](http://leoyoung07.github.io/blog/img/2016-03-30-differences-between-post-array-and-query-string-with-php-curl/1.png)
    - body

        ![array body](http://leoyoung07.github.io/blog/img/2016-03-30-differences-between-post-array-and-query-string-with-php-curl/2.png)

- ### post query字符串
    - header

        ![query string header](http://leoyoung07.github.io/blog/img/2016-03-30-differences-between-post-array-and-query-string-with-php-curl/3.png)
    - body

        ![query string body](http://leoyoung07.github.io/blog/img/2016-03-30-differences-between-post-array-and-query-string-with-php-curl/4.png)

可见，直接post数组时，Content-type为`multipart/form-data`；而post query字符串时Content-type为`application/x-www-form-urlencoded`。

PHP手册中对CURLOPT_POSTFIELDS的说明如下：

> 全部数据使用HTTP协议中的"POST"操作来发送。要发送文件，在文件名前面加上@前缀并使用完整路径。这个参数可以通过urlencoded后的字符串类似'para1=val1&para2=val2&...'或使用一个以字段名为键值，字段数据为值的数组。如果value是一个数组，Content-Type头将会被设置成multipart/form-data。