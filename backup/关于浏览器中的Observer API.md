现代浏览器支持4种Observer API：

1. Intersection Observer
1. Mutation Observer
1. Resize Observer
1. Performance Observer

## Intersection Observer

`Intersection Observer` 可以监视DOM元素之间的交集。可用于监控元素进入、离开视区。可用来实现图片的懒加载、确定广告可见度、实现无限滚动的页面、实现元素进入视区时自动播放视频或动画。

## Mutation Observer

`Mutation Observer` 可以监视DOM元素的改变，包括元素的添加、删除，元素值或属性的改变。主要用在JS框架中，用于响应DOM元素的变化。

## Resize Observer

`Resize Observer` 可以监视DOM元素内容矩形（content box）的尺寸（宽度、高度）变化。类似于 `document.onresize()` 和 `window.resize()` 方法。 当元素被添加到DOM或从DOM移除、`display` 被设置为 `none`、被设置为显示且尺寸不为0时都会触发该监听事件。

## Performance Observer

`Performance Observer` 可监视调用 `performance` API记录性能指标的情况。用于监听`mark`、`measure`、`paint`等类型的性能记录。

## 参考

- [Different types of observers supported by modern browsers](https://www.zeolearn.com/magazine/different-types-of-observers-supported-by-modern-browsers)

- [IntersectionObserver - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

- [MutationObserver - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

- [JavaScript中的ResizeObserver_JavaScript, ResizeObserver 教程_w3cplus](https://www.w3cplus.com/javascript/ResizeObserver-api.html)

- [PerformanceEntry.entryType - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)