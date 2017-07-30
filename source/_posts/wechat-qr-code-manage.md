---
layout: post
title: "微信公众平台带参数二维码配置工具的实现"
description: "wechat qr code manage"
category: WeChat
tags: [php, wechat, curl, tools]
date: 2015-12-09
---

配置带参数的二维码同样需要先获取Access Token，获取方法在 *微信公众平台自定义菜单配置工具的实现* 一文中有描述。

利用获取到的Access Token，可以创建二维码的Ticket。通过POST方法向服务器提交相关信息，JS代码如下：

```javascript
function getTicket()
{
    var url = "qrcode_manage.php?access_token="+$("#accessToken").val();
    var qrcode_type = $("#qrType").val();
    var qrcode_scene_id = $("#qrSceneId").val();
    $.post(url,
        {
            "qrcode_type":qrcode_type,
            "qrcode_scene_id":qrcode_scene_id
        },
        function (data,status) {
            var result = eval("("+data+")");
            $("#ticketInfo").css("display","block");
            if(typeof (result["errcode"])!="undefined")
            {
                var errorInfo = "错误代码："+result["errcode"]+";错误信息："+result["errmsg"];
                $("#ticketInfo").html(errorInfo);
                $("#getQrcodeBtn").attr("disabled","disabled");
            }
            else
            {
                var successInfo = "获取Ticket 成功，Ticket：" + result["ticket"];
                successInfo += "<br>url:" + result["url"];
                $("#ticket").val(result["ticket"]);
                $("#ticketInfo").html(successInfo);
                $("#getQrcodeBtn").removeAttr("disabled");
            }
        }
    );
}

```

服务器端进行转发的PHP代码如下：

```php
$access_token = $_GET["access_token"];
$api_url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token={$access_token}";
$qrcode_type = $_POST["qrcode_type"];
$qrcode_scene_id = (int)$_POST["qrcode_scene_id"];
$qrcode_array = array();
if($qrcode_type == "QR_SCENE")
{
    $qrcode_array["expire_seconds"] = 604800; //七天
    $qrcode_array["action_name"] = "QR_SCENE";
}
else
{
    $qrcode_array["action_name"] = "QR_LIMIT_SCENE";
}

$qrcode_array["action_info"]["scene"]["scene_id"] = $qrcode_scene_id;
$qrcode_json = json_encode($qrcode_array);
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$api_url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $qrcode_json);
$json_result = curl_exec($ch);
curl_close($ch);
echo $json_result;

```

之后，可以通过Ticket换取二维码，JS代码如下：

```javascript
function getQrcode()
{
    var ticket = $("#ticket").val();
    var date = new Date();
    var url = "qrcode_manage.php?ticket="+ticket+"&time="+date.getTime();
    $("#qrcode").attr("src","qrcode_manage.php?ticket="+ticket+"&time="+date.getTime());
}

```

服务器端进行转发的PHP代码如下：

```php
$ticket = $_GET["ticket"];
$api_url = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket={$ticket}";
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$api_url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
$qrcode_result = curl_exec($ch);
curl_close($ch);
echo $qrcode_result;
```

实现效果可访问：

[http://leo07.sinaapp.com/qrcode_manage.html](http://leo07.sinaapp.com/qrcode_manage.html)

