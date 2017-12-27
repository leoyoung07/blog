---
layout: post
title: "JavaScript中的求模和求余"
description: "mod and rem in javascript"
category: JavaScript
tags: [javascript,math]
date: 2016-06-07
---

# 求模与求余

求模和求余其实是两种不同的运算。当两个操作数同号时，它们的运算结果相同；而当两个操作数异号时，它们的运算结果就不同了。

求模与求余运算都分两步进行：

1. 求整数商：c = a/b;
1. 求值: r = a - c*b;

求模和求余的差别在第一步：

- 求模是向负无穷的方向舍弃小数位（(-1)/3 = -1）
- 求余是向0的方向舍弃小数位（(-1)/3 = 0）

# JavaScript中的求余

JavaScript中的 `%` 运算符其实是求余运算，即：

```javascript
console.log((-13) % 64);
```

结果是-13。

# JavaScript中的求模

JavaScript中的求模运算可以采用以下方法实现：

```javascript
Number.prototype.mod = function (n)
{
    return ((this % n) + n) % n;
}
```

此时，用：

```javascript
console.log((-13).mod(64));
```

结果是51。