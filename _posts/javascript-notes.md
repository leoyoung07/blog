## 关于 `document.write()`

`document.write()` 可以向文档流注入内容。值得注意的是，对于已关闭的文档流(closed/loaded)，调用`document.write()` 将会自动调用 `document.open()` , 从而清除文档中已有的内容。因此，在页面内嵌的 `<script>` 标签中调用`document.write()` 并不会清除文档内容，因为此时文档流还没有关闭（not loaded）。而在文档加载完成后或者手动调用`document.close()` 后再调用`document.write()`，之前文档的内容将被清除。

相关API：`document.open()` `document.close()`

### 参考

- [Document.write() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/write)

- [Document.open() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/open)

- [Document.close() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/close)
