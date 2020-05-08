## 什么是 BOM

wikipedia上的解释：

>The **byte order mark (BOM)** is a Unicode character, U+FEFF byte order mark (BOM), whose appearance as a magic number at the start of a text stream can signal several things to a program consuming the text:
>- What byte order, or endianness, the text stream is stored in;
>- The fact that the text stream is Unicode, to a high level of confidence;
>- Which of several Unicode encodings that text stream is encoded as.
>
>BOM use is optional, and, if used, should appear at the start of the text stream.

简单的说就是放在文件开头，用于标明字节序的标记。

## C#中的UTF-8 BOM

C#中使用Encoding.UTF8作为参数创建文件是带有BOM的。

```C#
//UTF-8 with BOM
new StreamWriter("text.txt", Encoding.UTF8);
```

创建不带BOM的UTF-8文件的方法：

```C#
//UTF-8 without BOM
new StreamWriter("text.txt", new UTF8Encoding(false));
```

## 参考

- [c# - StreamWriter and UTF-8 Byte Order Marks - Stack Overflow](https://stackoverflow.com/questions/5266069/streamwriter-and-utf-8-byte-order-marks)

- [StreamWriter Constructor (String) (System.IO)](https://msdn.microsoft.com/en-us/library/fysy0a4b(v=vs.110).aspx)

- [UTF8Encoding Constructor (Boolean) (System.Text)](https://msdn.microsoft.com/en-us/library/s064f8w2(v=vs.110).aspx)

- [FAQ - UTF-8, UTF-16, UTF-32 & BOM](http://www.unicode.org/faq/utf_bom.html#BOM)
