---
layout: post
title: "微信公众平台自定义菜单配置工具的实现"
description: "wechat button manage"
category: WeChat
tags: [php, wechat, curl, tools]
date: 2015-12-09
---

由于JS脚本跨域访问的问题，无法通过jQuery的Ajax方法直接调用微信的API，故采用服务器端转发的方式与微信API交互。

配置自定义菜单须先获取Access Token，前端JS代码如下：

```javascript
function getAccessToken()
{
    var appidParam = $("#appid").val();
    var secretParam = $("#secret").val();
    var date = new Date();
    var url = "get_access_token.php?appid="+appidParam+"&secret="+secretParam+"&time="+date.getTime();
    $.get(url, function (data,status) {
        var result = eval("("+data+")");
        $("#info").css("display","block");
        if(typeof (result["errcode"])!="undefined")
        {
            var errorInfo = "错误代码："+result["errcode"]+";错误信息："+result["errmsg"];
            $("#info").html(errorInfo);
            $("#changeBtn").attr("disabled","disabled");
        }
        else
        {
            var successInfo = "获取Access Token 成功：" + result["access_token"];
            $("#accessToken").val(result["access_token"]);
            $("#info").html(successInfo);
            $("#changeBtn").removeAttr("disabled");
        }
    })

}

```

服务器端使用PHP的curl工具进行转发，代码如下

```php
$appid = $_GET["appid"];
$secret = $_GET["secret"];
$api_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$secret}";
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$api_url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
$json_result = curl_exec($ch);
curl_close($ch);
echo $json_result;
```

利用获取到的 Access Token，下一步可以配置自定义菜单。目前还需要自己编写自定义菜单的JSON，以后有时间会加上可视化界面。通过POST方法向服务器提交JSON的JS代码如下：

```javascript
function changeButton()
{
    var url = "button_manage.php?access_token="+$("#accessToken").val();
    var button_json = $("#buttonBody").val();
    $.post(url,{"button_json":button_json}, function (data,status) {
        var result = eval("("+data+")");
        if(result["errcode"] == 0)
        {
            alert("配置成功");
        }
        else
        {
            alert("配置失败，错误代码："+result["errcode"]+"错误信息："+result["errmsg"]);
        }
    })
}
```

服务器端的PHP代码如下：

```php
$access_token = $_GET["access_token"];
$api_url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token={$access_token}";
$button_json = $_POST["button_json"];
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$api_url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $button_json);
$json_result = curl_exec($ch);
curl_close($ch);
echo $json_result;
```

实现效果可访问：

[http://leo07.sinaapp.com/button_manage.html](http://leo07.sinaapp.com/button_manage.html)



