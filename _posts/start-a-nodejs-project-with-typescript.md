---
title: 使用TypeScript开发Node.js项目
date: 2017-03-16 13:42:05
tags: [node.js, TypeScript]
category: TypeScript
description: start-a-nodejs-project-with-typescript
---
# 使用TypeScript开发Node.js项目的主要步骤

## 安装TypeScript

- 全局安装TypeScript:

    `npm install -g typescript`

## 初始化node项目

`npm init -y`

## 安装 @types/node

`npm install --save-dev @types/node`


## 初始化并配置tsconfig文件

- 初始化tsconfig.json:

    `tsc --init`

- 在tsconfig.json的`compilerOptions`中添加`typeRoots`配置：

    ```json
    {
        "compilerOptions": {
            ....
            "typeRoots": [
                "./node_modules/@types"
            ]
        }
    }
    ```

## 安装依赖模块的TypeScript版本

`npm install --save-dev @types/xxx`


## 参考

- [NodeJS QuickStart · TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/docs/quick/nodejs.html)