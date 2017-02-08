---
layout: post
title: "将数字转换为EXCEL列名的方法"
description: "number to excel letter"
category: PHP
tags: [php, convert]
date: 2015-12-26
---

用递归函数将数字转换为EXCEL中的列名，直接上代码（PHP）：

```php
//递归求解
function R_NumToLetter($num)
{
    if($num == 0)
    {
        return '';
    }
    $base = 26;
    $mod = (int)($num % $base);
    $num = (int)($num / $base);
    if($mod == 0)
        return R_NumToLetter($num - 1).NumToLetter($base);
    if($num == 0)
        return NumToLetter($mod);
    return R_NumToLetter($num).NumToLetter($mod);
}
function NumToLetter($num)
{
    if($num == 0)
        return '';
    $num = (int)$num - 1;
    $ord_A = ord('A');
    $chr = chr($ord_A + $num);
    return $chr;
}

```