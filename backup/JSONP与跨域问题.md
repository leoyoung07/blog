## 跨域问题

**跨域问题**是由于浏览器的**同源策略**而产生的，同源是指**同协议**、**同域名**、**同端口**，出于安全的考虑，浏览器禁止脚本的跨域（不同源）请求。

虽然浏览器禁止跨域请求，但是却允许引用和执行来自其他域的脚本文件，这也就是下面将要提到的 JSONP 的原理。


## JSONP

JSONP（JSON with Padding） 是一种动态加载js的技术，即使用javascript脚本动态加载`<script>`标签，从而使得网页可以跨域获取数据。该方法需要服务器端进行配合，动态生成javascript脚本，javascript脚本中包含网页所需的数据。

假设 `www.bbbbb.com.cn` 域名下有一网页需要请求 `www.aaaaa.com.cn` 域名下的数据，利用JSONP实现跨域请求的步骤如下：

1.  `www.bbbbb.com.cn` 域名下的网页中定义一个加载跨域脚本的javascript函数，即一个能够动态生成 `<script>` 标签的函数，该 `<script>` 标签的 `src` 指向服务器端程序（ `www.aaaaa.com.cn` ）所在的URL，并且URL后应附加一个 `callback` 参数，以便服务器端能够动态生成以 `callback` 为名的javascript函数：

    ```javascript
    var remoteUrl = "http://www.aaaaa.com.cn/test/jsonpTest.php?callback=";
    function getDataFromRemote(callback) 
    {
        var remoteDataUrl = remoteUrl + callback;
        var script = document.createElement("script");
        script.setAttribute("src", remoteDataUrl);
        document.getElementsByTagName("head")[0].appendChild(script);
    } 
    ```

2.  服务器端收到请求后，根据 `callback` 参数动态生成一段javascript脚本，该脚本调用 `callback` 函数并向其传递网页所需的数据：

    ```php
    <?php
    if(isset($_GET["callback"]))
    {
        $json_data = json_encode(["data"=> "Hello World"]);
        echo $_GET["callback"]."({$json_data});";
    }
    ?>
    ```

3.  网页端定义名为 `callback` 的函数，用于接收、处理服务器端传来的数据：

    ```javascript
    function testCallback(jsonData) 
    {
        alert(jsonData["data"]);
    }
    getDataFromRemote('testCallback');
    ```

## jQuery示例

jQuery 中的 `ajax` 方法支持 JSONP 类型的请求，只需将 `dataType` 设置为 `jsonp` 即可，示例如下：

```javascript
<script type="text/javascript" src="//cdn.bootcss.com/jquery/2.2.1/jquery.min.js"></script>
<script type="text/javascript">
    function getDataFromRemoteAjax()
    {
        $.ajax({
            type: "get",
            async: true,
            url: "http://www.aaaaa.com.cn/test/jsonpTest.php",
            dataType: "jsonp",
            jsonpCallback: "testCallbackAjax",
            success: function (data) {
                alert(data["data"]);
            },
            error: function (err) {
                alert("error");
            }
        });
    }
</script>
```

服务器端的代码与上例的相同。
