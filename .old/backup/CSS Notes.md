## 关于CSS中的百分比参照

| 参照物         | 属性                                                                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 父盒子对应属性 | width, height, font-size 等                                                                                                        |
| 父盒子宽度     | text-indent, padding, margin 等                                                                                                    |
| 盒子自身宽高   | border-radius, background-size, border-image-width, transform: translate(), scale(), transform-origin, zoom, clip-path 等          |
| 盒子自身字号   | line-height 等                                                                                                                     |
| 定位元素       | top, right, bottom, left 等                                                                                                        |
| 特殊算法       | background-position （原盒子的宽高值减去背景图片的宽高值所得到的剩余值）, border-image-slice （相对于图片尺寸）, filter 系列函数等 |


### 参考

- [css样式的百分比都相对于谁？ - 知乎](https://www.zhihu.com/question/36079531/answer/65809167)

- [你知道我们平时在CSS中写的%都是相对于谁吗？ - 掘金](https://juejin.im/post/5b0bc994f265da092918d421)

## 关于 `PX`、 `EM` 与 `REM`

### 参考

- https://www.w3cplus.com/css/px-to-em

- http://v1.jontangerine.com/log/2007/09/the-incredible-em-and-elastic-layouts-with-css

- http://caibaojian.com/web-app-rem.html

- https://www.w3cplus.com/css/rem-vs-em.html

- https://zellwk.com/blog/rem-vs-em/

- https://www.jianshu.com/p/985d26b40199