---
layout: post
title: "微信公众平台下通过网页授权获取用户信息的方法"
description: ""
category: WeChat
tags: [php, wechat]
date: 2016-03-22
---

-	###	授权方式

    微信网页的授权方式分为两种：

    - 以 snsapi_base 为 scope 发起的网页授权：用于获取用户的 openid ，为静默授权
    - 以 snsapi_userinfo 为 scope 发起的网页授权：用于获取用户的基本信息，需要用户手动同意授权

    下面以 snsapi_userinfo 的类型为例，说明网页授权的步骤：

1.  ### 获取code

    引导关注者打开以下页面：

    [https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&
    scope=snsapi_userinfo&state=STATE#wechat_redirect]()

    其中 redirect_uri 为需要获取用户信息的页面，redirect_uri 需要进行 urlencode 处理。用户同意授权之后，redirect_uri 的页面就可以通过 GET 的方式从 url 中拿到 code，即：

    `$code = $_GET["code"];`

2.  ### 用code换取网页授权的access_token

    利用上一步获取的code即可换取网页授权access_token，方法如下：

    ```php
    $api_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$appid}&secret={$secret}&code={$code}&grant_type=authorization_code";
    $response_info = self::get_info_from_api($api_url);
    if(isset($response_info["errcode"]))
    {
        exit("get access token failed: ".$response_info["errcode"].", ".$response_info["errmsg"]);
    }

    $access_token = $response_info["access_token"];
    ```

    其中，get_info_from_api 的定义如下：

    ```php
    public static function get_info_from_api($api_url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $result = curl_exec($ch);
        curl_close($ch);
        $response_info = json_decode($result, true);
        return $response_info;
    }
    ```
    get_info_from_api 是利用PHP中的curl函数以 GET 方法从微信提供的 api 获取数据，返回的结果为关联数组的形式。

3.  ### 获取用户信息

    接下来，即可用 access_token 获取用户信息：

    ```php
    $open_id = $response_info["openid"];
    $api_url = "https://api.weixin.qq.com/sns/userinfo?access_token={$access_token}&openid={$open_id}&lang=zh_CN";
    $user_info = self::get_info_from_api($api_url);
    if(isset($user_info["errcode"]))
    {
        exit("get user info failed: ".$user_info["errcode"].", ".$user_info["errmsg"]);
    }
    ```

