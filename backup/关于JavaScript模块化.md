## AMD

Asynchronous Module Definition(异步模块定义)，通过 `define()` 方法定义模块：

```JavaScript
define(id?, dependencies?, factory);
```

通过 `require()` 方法引用模块：

```JavaScript
require([module], callback);
```

举例：

```JavaScript
// filename: foo.js
define('foo', ['jquery', 'underscore'], function ($, _) {
  // methods
  function a(){};    // private because it's not returned (see below)
  function b(){};    // public because it's returned
  function c(){};    // public because it's returned

  // exposed public methods
  return {
      b: b,
      c: c
  }
});
```

```JavaScript
require(['foo'], function(foo) {

});
```

## CMD

CommonJS规范，在node.js中使用，一个文件就是一个模块。通过 `exports` 导出模块内容：

```JavaScript
// filename: foo.js
var bar = 'bar'; // private
// public
function foo () {
}
exports.foo = foo;
```

通过 `require` 引入模块内容：

```JavaScript
var foo = require('./foo').foo;
```
## UMD

Universal Module Definition(通用模块定义)，支持AMD和CMD：

```JavaScript
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery', 'underscore'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('jquery'), require('underscore'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.jQuery, root._);
  }
}(this, function ($, _) {
  // methods
  function a(){}; // private because it's not returned (see below)
  function b(){}; // public because it's returned
  function c(){}; // public because it's returned

  // exposed public methods
  return {
    b: b,
    c: c
  }
}));
```

## import/export

`ES6` 中支持的模块定义方法，一个模块就是一个独立的文件。通过 `export` 导出模块内容；

```JavaScript
// filename: foo.js
const bar = 'bar'; // private
// public
function foo () {
}
export {foo};
```

通过 `import` 引入模块内容：

```JavaScript
import {foo} from './foo';
```

## 参考

- [What is AMD, CommonJS, and UMD? | David Calhoun](https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/)

- [AMD, CMD, CommonJS和UMD - 简书](https://www.jianshu.com/p/bd4585b737d7)

- [javascript - Relation between CommonJS, AMD and RequireJS? - Stack Overflow](https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs)

- [Module 的语法 - ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/module)