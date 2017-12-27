---
layout: post
title: "在windows环境下用GitStack搭建git server的方法"
description: "GitStack on windows"
category: Git
tags: [git, server, windows]
date: 2016-03-28
---

在Windows环境下用GitStack搭建git server的方法：

- 安装/配置GitStack

    GitStack下载地址：[GitStack](http://gitstack.com/download/)

    在服务器下载安装GitStack，安装完成后，可在 *Admin* 页面的 *Setting* 中配置 *Server Ports* 和 *Repositories Location* ，然后在 *Security* 中选择 *Communication protocols* 为 *Accept http and https* 。

- 添加User

    在 *Admin* 页面的 *Users & Groups* 中添加User。

- 添加Repository

    在 *Admin* 页面的 *Repository* 中新建Repository，并添加刚才创建的User。

- 远程clone

    在自己的机器上clone刚才添加的Repository：
    
    `git clone https://name:password@your_server_domain:port/your_repository.git`

- 远程push

    在自己的机器上添加文件，并push到服务器：
    
```bash
git add --all .
git commit -m "init"
git push origin master
```

- 服务器本地clone

    服务器上，在你想要部署代码的位置进行clone：
    
    `git clone https://name:password@localhost:port/your_repository.git`

- 配置Hook

    服务器上，找到你Repository所在位置，打开hooks文件夹添加名为 *post-receive* 的文件，文件内容例如：
    
```bash
#!/bin/sh
unset GIT_DIR
DeployPath=path_to_your_deploy_folder

cd $DeployPath
git pull origin master
```

- **修改GitStack服务的登录方式**

    在服务中找到 *GitStack* ，右键 属性 打开登录选项卡，将登录身份由 *本地系统账户* 改为  *Administrator* ，重启 *GitStack* 服务。

完成以上的步骤，下次从自己的机器push到服务器时，就可以实现自动部署。