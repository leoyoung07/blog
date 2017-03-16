---
layout: post
title: "ECharts 使用过程中遇到的问题"
description: "echarts-problems"
category: JavaScript
tags: [echarts]
date: 2017-02-21
---

# 记录ECharts使用过程中遇到的一些问题

1. 页面内容被tooltip的div遮盖

    - 描述：

        在页面中为div元素使用全局的style（主要是宽和高）时，图表后面的内容会被tooltip的div遮盖，导致input等元素无法点击、无法输入内容。
    - 原因：

        图表初始化时会在TooltipContent方法中创建一个空的div元素作为tooltip，不带样式，而包含该div的父级div的position被设置为relative。当页面中为div元素设置全局的宽和高时，tooltip的div就会遮盖后面的元素。

    - 解决：

        修改源码，在TooltipContent方法中，tooltip的div被创建后，为其添加 `display: none` 样式。即：
        ```JavaScript
        var el = document.createElement('div');
        el.style.display = "none";
        ```
        由于tooltip所在的div的style（主要是display属性）在显示时会动态改变，所以这样修改不会影响之后tooltip的显示。