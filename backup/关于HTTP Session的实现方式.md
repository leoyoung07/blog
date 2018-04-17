## 基于Cookie的实现

服务器启用Session后，约定一个Cookie的键值作为Session的口令（例如 `session_id`）。如果用户请求的Cookie中没有改键值，服务器就生成一个唯一的值，添加到Cookie中。

## 基于URL的实现

将Session的键值存储在URL的查询字符串中，如果用户请求的URL中不带有约定的Session参数（`session_id`），服务器就生成一个唯一的值添加到URL的查询字符串中，并将请求重定向(302)到修改后的URL。这种实现的问题在于，如果别人用同样的URL进行请求，就会带上相同的session_id，造成用户信息泄露的风险。

## 基于ETag字段的实现

这种方式利用HTTP头部的ETag字段存储session_id，实现Session降级。在页面中加入一个动态生成的js文件（例如`etag_session.js`），用户向服务器请求该文件时，服务器检查请求中是否带有`if-none-match`字段，如果没有则生成一个唯一的值，添加到响应头部的ETag字段中。

## 参考

- [深入浅出Node.js (朴灵编著)]()

- [etag session保存http会话](https://cnodejs.org/topic/5212d82d0a746c580b43d948)


