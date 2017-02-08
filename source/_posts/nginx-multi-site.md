---
layout: post
title: "Nginx多站点配置"
description: "nginx multi site"
category: Nginx
tags: [nginx]
date: 2016-11-21
---

# 概述

利用Nginx可以在一台服务器上搭建多个站点，实现从不同的二级域名访问不同的web应用。例如，我有一级域名 leoyoung.site，其下有2个二级域名 test.leoyoung.site 和 blog.leoyoung.site，它们都解析至同一IP，通过配置Nginx可以实现将 test.leoyoung.site 指向一个PHP站点，将 blog.leoyoung.site 指向一个 Django站点。服务器运行ubuntu 14.04系统，以下是配置方法。

# 安装Nginx

`sudo apt-get install nginx`

安装后，所有的配置文件都在/etc/nginx下， 程序文件为/usr/sbin/nginx。查看nginx.conf文件，注意到以下几行配置：

```bash
##
# Virtual Host Configs
##

include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sites-enabled/*;
```

因此，可在/etc/nginx/conf.d/目录下添加conf文件以实现多站点配置。

# Nginx下的PHP站点配置

- ## 安装PHP环境

    `sudo apt-get install php5-cli php5-cgi mysql-server php5-mysql`

- ## 安装FastCgi

    `sudo apt-get install php5-fpm`

- ## 配置Nginx
    在 `/etc/nginx/conf.d` 目录下创建`test.leoyoung.site.conf`配置文件，其内容为：
    ```bash
    server {
        listen 80;

        root /data/htdoc/test;
        index index.html index.htm;

        server_name test.leoyoung.site;

        location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to displaying a 404.
            try_files $uri $uri/ =404;
            # Uncomment to enable naxsi on this location
            # include /etc/nginx/naxsi.rules
        }
        location ~ \.php$ {
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            # NOTE: You should have "cgi.fix_pathinfo = 0;" in php.ini

            # With php5-cgi alone:
            fastcgi_pass 127.0.0.1:8000;
            # With php5-fpm:
            #fastcgi_pass unix:/var/run/php5-fpm.sock;
            fastcgi_index index.php;
            include fastcgi_params;
        }
    }
    ```
    `/data/htdoc/test` 为PHP站点的根目录。

- ## 设置php-cgi开机启动
    在 中添加一行：

    `spawn-fcgi -a 127.0.0.1 -p 8000 -C 10 -u www-data -f /usr/bin/php-cgi >> /data/log/phpcgi.log 2>&1 &`

   其中， `/data/log/phpcgi.log` 为访问日志文件。

# Nginx下的Django站点配置

- ## 安装Django

    `pip3 install Django`

- ## 安装uwsgi

    `pip3 install uwsgi`

- ## 配置uwsgi

    

- ## 配置Nginx

- ## 处理静态文件

# 参考

- [Nginx - Ubuntu中文](http://wiki.ubuntu.org.cn/Nginx#.E5.AE.89.E8.A3.85nginx)

- [Ubuntu上通过nginx部署Django笔记](http://www.cnblogs.com/jhao/p/6071790.html)