---
layout: post
title: "用JavaScript获取URL参数的方法"
description: ""
category: JavaScript
tags: [javascript, regex]
date: 2016-03-27
---

JavaScript中通过正则表达式获取URL参数的方法：

```javascript
function getQueryString(name) 
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
```

- r[2]是分组2的内容，即([^&]*)所匹配的内容（r[0]是整个正则表达式所匹配的内容）
- 正则表达式后边的“i”表示忽略大小写