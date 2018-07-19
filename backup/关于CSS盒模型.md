## 四个边

1. 外边距边
1. 边框边
1. 内填充边 
1. 内容边

## 四个区域

1. 内容区域（content area）
    包含元素真实内容的区域，位于内容边界的内部。它的宽度：content-box width，它的高度：content-box height。

1. 内边距区域（padding area）
    延伸到包围padding的边框，内容区域的背景、颜色或者图片会延伸到padding上，它位于内边距边界内部。它的宽度：padding-box  width，它的高度：padding-box height。

1. 边框区域（border area）
    是包含边框的区域，它位于边框边界内部。它的宽度：border-box  width，它的高度：border-box height，由属性 border-width 及border控制。

1. 外边距区域（margin area）
    用空白区域扩展边框区域，以分开相邻的元素。它的宽度：margin-box width，它的高度：margin-box height。

## 图示

![](https://developer.mozilla.org/files/72/boxmodel%20(1).png)

## 参考

- https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model

