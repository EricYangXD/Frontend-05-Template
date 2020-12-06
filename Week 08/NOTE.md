<!--
 * @Author: Eric YangXinde
 * @Date: 2020-09-25 20:00:09
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-12-06 19:11:00
 * @Description:
-->

学习笔记

浏览器：
URL==HTTP==>HTML==parse==>DOM==css computing==>DOM with css==layout==>DOM with position==render==>Bitmap

有限状态机：
在计算理论中，米利型有限状态机（英语：Mealy machine）是基于它的当前状态和输入生成输出的有限状态自动机（更精确的叫有限状态变换器）。这意味着它的状态图将为每个转移边包括输入和输出二者。与输出只依赖于机器当前状态的摩尔有限状态机不同，它的输出与当前状态和输入都有关。但是对于每个 Mealy 机都有一个等价的 Moore 机，该等价的 Moore 机的状态数量上限是所对应 Mealy 机状态数量和输出数量的乘积加 1。

Http 协议：
请求：
request line / headers / body
文本型协议 传的都是字符串
空行作为结尾
以「\r\n」作为换行
响应：
status line / headers / body
