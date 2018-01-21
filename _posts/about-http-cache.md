## 1. HTTP头部与缓存相关的字段

|字段|字段说明|字段类型|HTTP版本|
|----|-------|-------|--------|
|Cache-control|Specifies directives for caching mechanisms in both requests and responses|General header|1.1|
|ETag|a unique string identifying the version of the resource|Response header|1.1|
|If-Match|Makes the request conditional and applies the method only if the stored resource matches one of the given ETags|Request header|1.1|
|If-None-Match|Makes the request conditional and applies the method only if the stored resource doesn't match any of the given ETags|Request header|1.1|
|If-Modified-Since|Makes the request conditional and expects the entity to be transmitted only if it has been modified after the given date|Request header|1.0+|
|If-Unmodified-Since|Makes the request conditional and expects the entity to be transmitted only if it has not been modified after the given date|Request header|1.1|
|Last-Modified|the last modification date of the resource, used to compare several versions of the same resource|Entity header|1.0+|
|Vary|Determines how to match future request headers to decide whether a cached response can be used rather than requesting a fresh one from the origin serve|Response header|1.1|
|Age|The time in seconds the object has been in a proxy cache|Response header|1.1|
|Date|contains the date and time at which the message was originated|General header|1.0+|
|Expires|The date/time after which the response is considered stale|Entity header|1.0+|
|Pragma|Implementation-specific header that may have various effects anywhere along the request-response chain|General header|1.0|

## 2. 缓存控制

HTTP 头部的 `cache-control` 字段主要用于指定缓存控制相关的指令。

### 请求中可用的指令

>Cache-Control: max-age=\<seconds\>
>
>Cache-Control: max-stale[=\<seconds\>]
>
>Cache-Control: min-fresh=\<seconds\>
>
>Cache-Control: no-cache
>
>Cache-Control: no-store
>
>Cache-Control: no-transform
>
>Cache-Control: only-if-cached

### 响应中可用的指令

>Cache-Control: must-revalidate
>
>Cache-Control: no-cache
>
>Cache-Control: no-store
>
>Cache-Control: no-transform
>
>Cache-Control: public
>
>Cache-Control: private
>
>Cache-Control: proxy-revalidate
>
>Cache-Control: max-age=\<seconds\>
>
>Cache-Control: s-maxage=\<seconds\>

### 是否可以缓存

- no-cache: 在使用缓存前，强制要求向源服务器发送验证请求。

- no-store: 所有内容都不会被缓存。

- only-if-cached: 表明客户端只想要获取缓存的数据，不向源服务器发送验证请求。

`Cache-Control: public` 和 `Cache-Control: private` 两个指令用于表明缓存可以保存的位置。

- private: Private browser caches, 即只有客户端（浏览器）可以缓存

- public: Shared proxy caches, 即客户端（浏览器）和代理服务器都可以缓存

## 3. 缓存过期

- Expires: HTTP 1.0版本的字段，表明资源过期的服务器时间。如果头部包含`Cache-Control: max-age=<seconds>` 指令，Expires将被忽略。

- Cache-Control: max-age=\<seconds\>: 资源将会过期的时间长度，与Expires不同，是相对时间（长度）。

- Cache-Control: must-revalidate: 缓存的资源在使用前必须向服务器验证其是否过期，而且过期的资源将不会被使用。

- Last-Modified: 资源上次修改的服务器时间。用于确认缓存的资源与当前的资源是否相同，它没有ETag字段精确。`If-Modified-Since` 和 `If-Unmodified-Since` 字段与它配合使用。

- If-Modified-Since: 如果资源在该字段给定的时间后没有修改过，服务器返回 `304` 状态，并且不带有数据；否则返回 `200` 状态，并且带上请求的资源。当与 `If-None-Match` 字段一起使用并且服务器支持 `If-None-Match` 字段时，它将被忽略。

## 4. 缓存对比

- ETag: 用于标定资源版本的标识。与 `If-Match` 和 `If-None-Match` 字段配合使用。

- If-None-Match: 如果服务器资源的版本号与该字段指定的ETag一致，则返回 `304` 状态；否则返回 `200` 状态，并且带上请求的资源。

<!-- TODO ## 5. HTTP缓存实例

### HTML Head标签中的设置

```HTML
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

### Nginx 的配置

-->

<!-- TODO ## 6. 根据 HTTP 头部分析缓存方式的 Demo -->

## 5. 参考

- [HTTP caching - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)

- [Cache-Control - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

- [HTTP headers - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

- [浅谈浏览器http的缓存机制](http://www.cnblogs.com/vajoy/p/5341664.html)

- [彻底弄懂HTTP缓存机制及原理](https://www.cnblogs.com/chenqf/p/6386163.html)

- [彻底弄懂 Http 缓存机制 - 基于缓存策略三要素分解法](http://mp.weixin.qq.com/s/uWPls0qrqJKHkHfNLmaenQ)

- [去除微信缓存代码](https://segmentfault.com/a/1190000004446256)
