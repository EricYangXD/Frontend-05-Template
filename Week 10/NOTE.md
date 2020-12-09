<!--
 * @Author: Eric YangXinde
 * @Date: 2020-09-25 20:00:09
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-12-09 16:47:18
 * @Description: 
-->
学习笔记

layout：
第一步：
根据浏览器属性进行排版
正常流：position、display、float；flex：弹性；grid：网格；CSS Houdini?
主轴 交叉轴
第二步：
收集元素进行（hang）
分行：根据主轴尺寸，把元素分进行；如设置了no-wrap，则强行分配进第一行。
第三步：
计算主轴
计算主轴方向：找出所有flex元素；把主轴方向的剩余尺寸按比例分配给这些元素；若剩余空间为负数，所有flex元素为0，等比压缩剩余元素。
第四步：
计算交叉轴：根据每一行中最大的元素尺寸计算行高；根据行高flex-direction和align-item，确定元素具体位置。

Render:
第一步：
绘制需要依赖一个图形环境
使用npm的images库
绘制在viewport上进行
与绘制相关的属性：background-color, border, background-image


第二步：
递归调用子元素的绘制方法完成DOM树的绘制
忽略一些不需要绘制的节点
实际浏览器中，文字绘制是难点，需要依赖字体库
实际浏览器中，还会对一些图层做compositing