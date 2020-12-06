<!--
 * @Author: Eric YangXinde
 * @Date: 2020-09-25 20:00:09
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-12-06 19:20:58
 * @Description:
-->

学习笔记

12.2.5 Tokenization FSM

开始、结束、自封闭

第六步：
从标签构建 DOM 树的基本技巧是使用栈
遇到开始标签时创建元素并入栈，遇到结束标签时出栈
自封闭节点可视为入栈后立刻出栈
任何元素的父元素是它入栈之前的栈顶
