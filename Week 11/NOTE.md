<!--
 * @Author: Eric YangXinde
 * @Date: 2020-09-25 20:00:09
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-12-27 20:45:09
 * @Description: 
-->
学习笔记

主要学习CSS的基础知识，语法规则，选择器，选择器优先级，伪类伪元素等


为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
因为first-letter是针对字的样式不用关心变化布局所带来的影响，而first-line时必须是布局计算完成才能确定首行，如果first-line支持改变大小或display，那么布局又需要重新计算首行很影响性能。