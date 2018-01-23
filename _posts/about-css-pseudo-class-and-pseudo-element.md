## 定义

* 伪类：添加到某些选择器，用于向元素的特定状态设置样式。

* 伪元素：添加到某些选择器，用于向元素的特定部分设置样式。

## 区别

* 伪类是针对元素的特定**状态**，伪元素是针对元素的特定**部分**

* 伪元素在DOM树中创建了一些抽象元素

* 语法区别：

  伪类的语法：

  ```CSS
  selector:pseudo-class {
    property: value;
  }
  ```

  伪元素的语法：

  ```CSS
  selector::pseudo-element {
    property: value;
  }
  ```

## 属性

### 常用的伪类

| 名称               | 说明                                                 |
| ------------------ | ---------------------------------------------------- |
| :active            | 向被激活的元素添加样式。                             |
| :focus             | 向拥有键盘输入焦点的元素添加样式。                   |
| :hover             | 当鼠标悬浮在元素上方时，向元素添加样式。             |
| :link              | 向未被访问的链接添加样式。                           |
| :visited           | 向已被访问的链接添加样式。                           |
| :first-child       | 向元素的第一个子元素添加样式。                       |
| :lang              | 向带有指定 lang 属性的元素添加样式。                 |
| :nth-child(an+b)   | 匹配同系列兄弟节点中的位于 an+b 位置的元素。         |
| :nth-of-type(an+b) | 匹配那些在它之前有 an+b-1 个相同类型兄弟节点的元素。 |

### 常用的伪元素

| 名称           | 说明                             |
| -------------- | -------------------------------- |
| ::first-letter | 向文本的第一个字母添加特殊样式。 |
| ::first-line   | 向文本的首行添加特殊样式。       |
| ::before       | 在元素之前添加内容。             |
| ::after        | 在元素之后添加内容。             |
| ::selection    | 给选中的内容添加样式。           |
| ::placeholder  | 给 placeholder 添加样式。        |

<!-- ## 实例 -->

## 备注

> As a rule, double colons (::) should be used instead of a single colon (:). This distinguishes pseudo-classes from pseudo-elements. However, since this distinction was not present in older versions of the W3C spec, most browsers support both syntaxes for the original pseudo-elements.

## 参考

* [Pseudo-classes and pseudo-elements - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Pseudo-classes_and_pseudo-elements)

* [Pseudo-classes - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

* [Pseudo-elements - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)

* [CSS 伪类](http://www.w3school.com.cn/css/css_pseudo_classes.asp)

* [CSS 伪元素](http://www.w3school.com.cn/css/css_pseudo_elements.asp)

* [CSS3 伪类和伪元素的特性和区别 - 才子锅锅 - 博客园](https://www.cnblogs.com/ihardcoder/p/5294927.html)
