<!--
 * @Author: Eric YangXinde
 * @Date: 2020-09-25 20:00:09
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2021-01-10 21:26:30
 * @Description:
-->

学习笔记

# 组件化基本概念

## 对象与组件的区别

-   对象
    -   properties 属性
    -   Methods 方法
    -   inherit 继承
-   组件（适合描述 UI 的一种概念）
    -   properties 属性 流入组件 强调从属关系 `div.className`
    -   Methods 方法 流入组件
    -   inherit 继承
    -   attribute 特性 强调描述性 `<div class="cls1 cls2"></div>`
    -   config & state 配置 & 状态
    -   event 组件往外传播事件 流出外部
    -   lifecycle 生命周期
    -   children 树形结构的必要性
        -   content 型
        -   template 型

## 如何设计组件的状态

| markup(标签) set | js set | js change | user input change（终端用户改变） |           |
| ---------------- | ------ | --------- | --------------------------------- | --------- |
| ❎               | ✅     | ✅        | ❓                                | property  |
| ✅               | ✅     | ✅        | ❓                                | attribute |
| ❎               | ❎     | ❎        | ✅                                | state     |
| ❎               | ✅     | ❎        | ❎                                | config    |

# 构建组件

## jsx 语法组件

主要基于 plugin-transform-react-jsx 插件 createElement 方法的对 jsx 的处理

-   是一个 JavaScript 的语法扩展。
-   **配置 JSX 环境**

    -   babel
        -   「代码转译」，即将目标代码转译为能够符合期望语法规范的代码。
        -   「解析 - 转换 - 生成」三个步骤。
        -   「解析」: `@babel/core`，把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。
        -   「转换」和「生成」: 各种插件（plugin）和 预设（preset）
        -   `babel-loader`:
            -   是一个 npm 包，
            -   它使得 webpack 可以通过 babel 转译 JavaScript 代码。
        -   `@babel/preset-*`
            -   是各种插件的打包组合，即各种转译规则的统一设定
            -   目的是告诉 loader 要以什么规则来转化成对应的 js 版本。
    -   安装包

        ```
        npm init
        npm install -g webpack webpack-cli // 静态模块打包工具
        npm install --save-dev webpack babel-loader
        npm i --save-dev @babel/core @babel/preset-env
        ```

        【webpack-dev-\*】

        ```
        npm i --save-dev webpack-dev-server
        // webpack-cli是4.* 版本 会和 webpack-dev-server 3.* 版本 不兼容
        // 启动 webpack-dev-server 会报错：Cannot find module 'webpack-cli/bin/config-yargs'
        // 可以换成启动 webpack serve 命令
        ```

    -   webpack.config.js

        ```js
        module.exports = {
        	entry: "./main.js",
        	module: {
        		rules: [
        			{
        				test: /\.js$/,
        				use: {
        					loader: "babel-loader",
        					options: {
        						presets: ["@babel/preset-env"],
        						plugins: [
        							[
        								"@babel/plugin-transform-react-jsx",
        								{ pragma: "createElement" },
        							],
        						],
        					},
        				},
        			},
        		],
        	},
        };
        ```

## 组件实战：轮播图

-   `<img/>`: 默认可拖拽。用 `background-image` 替代。
-   思路
    -   正常流 `inline-block` 排列轮播元素
    -   通过 `translateX ( - position * width ) ` 顺时针自动轮播
    -   move：计算当前元素和 next 元素位置，实现循环滚动
    -   组合 mousedown、mousemove、mouseup ，实现手动拖拽滚动效果
    -   move：计算 pre、current、next 元素的位置，实现首尾相连
    -   down：因为需要过渡效果，出现飘移元素；
        -   fix：根据滚动方向，判断当前滚动相关元素[-1 or 1]
