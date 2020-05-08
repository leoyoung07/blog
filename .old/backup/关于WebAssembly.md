## 基本概念

> WebAssembly是一种运行在现代网络浏览器中的新型代码，并且提供新的性能特性和效果。它设计的目的不是为了手写代码而是为诸如C、C++和Rust等低级源语言提供一个高效的编译目标。

## 设计目标

- 快速、高效、可移植

- 可读、可调试

- 安全性（在沙箱环境中运行）

- 与其他网络技术兼容

## 使用场景

- 3D游戏

- 图片/视频编辑

- VR/AR

- 计算机视觉

## 示例

- [坦克游戏](https://webassembly.org/demo/Tanks/)

- [vim编辑器](https://rhysd.github.io/vim.wasm/)

- [python解释器](http://pypyjs.org/)

- [Window 2000系统](https://bellard.org/jslinux/vm.html?url=https://bellard.org/jslinux/win2k.cfg&mem=192&graphic=1&w=1024&h=768)

## 使用C/C++创建

```C++
// hello.cc
#ifndef EM_PORT_API
#    if defined(__EMSCRIPTEN__)
#        include <emscripten.h>
#        if defined(__cplusplus)
#            define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#        else
#            define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#        endif
#    else
#        if defined(__cplusplus)
#            define EM_PORT_API(rettype) extern "C" rettype
#        else
#            define EM_PORT_API(rettype) rettype
#        endif
#    endif
#endif

#include <stdio.h>
int main(int argc, char const *argv[])
{
    printf("hello, world\n");
    return 0;
}

EM_PORT_API(float) add(float a, float b) {
    return a + b;
}
```

```bash
emcc hello.cc -o hello.js
```

## 使用.Net平台创建

```C#
// hello.cs
class Hello {
  static int Main(string[] args) {
    System.Console.WriteLine("hello world!");
    return 0;
  }
}
```

```bash
mcs -nostdlib -noconfig -r:../../dist/lib/mscorlib.dll hello.cs -out:hello.exe
mono-wasm -i hello.exe -o output
```

## 使用 Go 创建

```Go
package main

import (
    "fmt"
)

func main() {
    fmt.Println("Hello Go WebAssembly")
}
```

```bash
GOARCH=wasm GOOS=js go build -o lib.wasm main.go
```

## 使用TypeScript创建(AssemblyScript)

```bash
npm install --save-dev AssemblyScript/assemblyscript
npx asinit .
```

```TypeScript
declare function sayHello(): void;

sayHello();

export function add(x: i32, y: i32): i32 {
  return x + y;
}
```

```bash
npm run asbuild
```

## 调用方式

### 浏览器端

  1. 浏览器加载 `.wasm` 文件和 js 胶水代码。

  2. 通过 js 胶水代码调用 wasm 中的原生代码。

```JavaScript
var importObject = {
  imports: {
    imported_func: function(arg) {
      console.log(arg);
    }
  }
};

fetch('simple.wasm').then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes, importObject)
).then(result =>
  result.instance.exports.exported_func()
);
```

### Node.js端

  1. 通过 `fs` 模块读取

  2. 通过 `WebAssembly` API调用

```JavaScript
// 1. Load the test.wasm file to buffer.
const fs = require('fs');
var source = fs.readFileSync('./test.wasm');

// 2. Convert buffer to typed array.
var typedArray = new Uint8Array(source);

// 3. Instantiate the WebAssembly module.
const env = {
  memoryBase: 0,
  tableBase: 0,
  memory: new WebAssembly.Memory({
    initial: 256
  }),
  table: new WebAssembly.Table({
    initial: 0,
    element: 'anyfunc'
  })
}
 
WebAssembly.instantiate(typedArray, {
  env: env
}).then(result => {
  console.log(util.inspect(result, true, 0));
  console.log(result.instance.exports._add(9, 9));
}).catch(e => {
  // error caught
  console.log(e);
});

```

## 关键API

- 使用 `WebAssembly.instantiate()` 函数加载 WebAssembly 代码。

- 通过 `WebAssembly.Memory()/WebAssembly.Table()` 构造函数创建新的内存和表实例。

- 由 `WebAssembly.CompileError()/WebAssembly.LinkError()/WebAssembly.RuntimeError()` 构造函数来提供 WebAssembly 中的错误信息。


## WebAssembly vs asm.js

- https://blogs.unity3d.com/cn/2018/08/15/webassembly-is-here/

- https://blogs.unity3d.com/cn/2015/06/18/webgl-webassembly-and-feature-roadmap/

- https://blogs.unity3d.com/cn/2018/09/17/webassembly-load-times-and-performance/

## WebAssembly vs Node.js C++ Addon

- https://www.codepool.biz/javascript-barcode-sdk-native-webassembly.html

- https://www.codepool.biz/use-webassembly-node-js.html

## 浏览器兼容性

-  https://caniuse.com/#feat=wasm


## 未来

### 开发体验

- JS 和 WebAssembly之间的快速调用

- 快速简便的数据交换

- ES模块集成

- 工具链集成

- 兼容性

### 应用场景

- 重量级桌面应用程序

- 便携式CLI工具

- 物联网

### 前端招聘

- 要求精通C/C++ ?


## 总结

所有能用 JS 实现的都将用 JS 实现，不能用 JS 实现的将通过 WebAssembly 实现。。。


## Further Reading

- https://developer.mozilla.org/zh-CN/docs/WebAssembly

- https://3dgen.cn/cppwasm-book/

- https://github.com/chai2010/awesome-wasm-zh

## 参考

- https://developer.mozilla.org/zh-CN/docs/WebAssembly/Concepts

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly

- https://www.mono-project.com/news/2018/01/16/mono-static-webassembly-compilation/

- https://blog.alphatr.com/go-write-webassembly.html

- https://zhuanlan.zhihu.com/p/47966773

- https://github.com/chai2010/awesome-wasm-zh

- https://github.com/AssemblyScript/assemblyscript

- https://developer.mozilla.org/zh-CN/docs/WebAssembly/Loading_and_running
