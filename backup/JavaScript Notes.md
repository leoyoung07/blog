## 关于 `document.write()`

`document.write()` 可以向文档流注入内容。值得注意的是，对于已关闭的文档流(closed/loaded)，调用`document.write()` 将会自动调用 `document.open()` , 从而清除文档中已有的内容。因此，在页面内嵌的 `<script>` 标签中调用`document.write()` 并不会清除文档内容，因为此时文档流还没有关闭（not loaded）。而在文档加载完成后或者手动调用`document.close()` 后再调用`document.write()`，之前文档的内容将被清除。

相关API：`document.open()` `document.close()`

### 参考

- [Document.write() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/write)

- [Document.open() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/open)

- [Document.close() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/close)

---

## 关于 `jQuery` 中的 `.attr()` 与 `.prop()` 方法

### 参考

- https://api.jquery.com/attr/

- https://api.jquery.com/prop/

---

## 关于 `jQuery` 中的 `.serialize()` 与 `.serializeArray()` 方法

注：这两个方法不能获取 `disable` 的字段值

### 参考

- https://api.jquery.com/serialize/

- https://api.jquery.com/serializeArray/

- https://stackoverflow.com/questions/15958671/disabled-fields-not-picked-up-by-serializearray

## 关于 `node.js` 中 `Web Socket` 报错 `Error: read ECONNRESET`

错误信息：

```text
Error: read ECONNRESET
WebSocketServer.js:20
	at exports._errnoException (util.js:1050:11)
	at TCP.onread (net.js:581:26)
```

错误原因其实是因为没有为 `Web Socket` 实例添加错误处理。

解决方法：
```JavaScript
ws.on('error', (e) => {
  console.log(e);
  //handle error here
});
```

### 参考

- [javascript - node.js Error: read ECONNRESET - Stack Overflow](https://stackoverflow.com/questions/31501038/node-js-error-read-econnreset)

- [websocket报错read ECONNRESET - CSDN博客](http://blog.csdn.net/a19891024/article/details/72901479)


## `jQuery` 操作 `iframe` 中元素的方法

### 参考

- https://www.cnblogs.com/mailaidedt/p/5461581.html

## 计算页面停留时长的方法

```
;(function () {
  var startTime = Math.ceil(new Date().getTime() / 1000), //单位秒
    getDuration = function () {
      var time = '',
        hours = 0,
        minutes = 0,
        seconds = 0,
        endTime = Math.ceil(new Date().getTime() / 1000),
        duration = endTime - startTime;

      hours = Math.floor(duration / 3600); //停留小时数
      minutes = Math.floor(duration % 3600 / 60); //停留分钟数
      seconds = Math.floor(duration % 3600 % 60); //停留秒数

      time = (hours < 10
        ? '0' + hours
        : hours) + ':' + (minutes < 10
        ? '0' + minutes
        : minutes) + ':' + (seconds < 10
        ? '0' + seconds
        : seconds);

      return time;
    };

  window.onbeforeunload = function (e) {
    var duration = 'time: ' + getDuration();
  };
})();
```