*记录微信（公众号/网页/小程序）开发中的一些坑和填坑方法*

## 关于网页字体缩放

微信中允许用户调整网页字体大小，而当页面使用rem作为单位进行布局时，用户调整字体大小就会导致页面布局变乱。

- Android解决方法

```JavaScript
/*
  * 页面加入这段代码可使Android机器页面不再受到用户字体缩放强制改变大小
  * 但是会有一个1秒左右的延迟，期间可以考虑通过loading展示
  * 仅供参考
  */
(function(){
  function resetFontSize () {
    setTimeout(function(){
      // 设置网页字体为默认大小
      WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});
    },0);
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on('menu:setfont', function () {
      WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});
    });
  }
  if (typeof WeixinJSBridge === 'undefined') {
    document.addEventListener('WeixinJSBridgeReady', function (e) {
      resetFontSize();
    });
  } else {
    resetFontSize();
  }
})();
```

- iOS解决方法

```CSS
body {
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}
```

### 参考

- [【知识整理】移动端微信页面禁止字体放大 - CSDN博客](http://blog.csdn.net/qq_19891827/article/details/51275080)

- [微信内置浏览器 可以更改字体大小，怎么保证页面养不错乱 - icewebdaydayup的回答 - SegmentFault](https://segmentfault.com/q/1010000011631008/a-1020000011632332)