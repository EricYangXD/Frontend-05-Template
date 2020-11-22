<!--
 * @Author: Eric YangXinde
 * @Date: 2020-09-25 20:00:09
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-11-22 15:12:01
 * @Description:
-->

学习笔记

realm:领域、范围、区域；
本周学习了 JS 的基础知识，重点学习了类型转换和宏任务与微任务以及运行时和函数调用的概念，顺便复习了事件循环。
对 realm 不是很理解，差了 MDN 也没找到具体的解释。请助教有空解答一下呗。谢谢。
由于本周有事，所以就没有把复习的内容记录整理在这里了。

```js
const StringToNumber = (str) => {
	return Number(str);
};

const NumberToString = (num, radix) => {
	const prefix = {
		[2]: "0b",
		[8]: "0o",
		[16]: "0x",
	};
	return prefix[radix] + num.toString(radix);
};
```
