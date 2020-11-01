<!--
 * @Author: Eric YangXinde
 * @Date: 2020-09-25 20:00:09
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-11-01 20:07:16
 * @Description:
-->

学习笔记

这周继续学习字符串分析算法：

字典树：大量高重复字符串的存储与分析；精确匹配字符串与模式；哈希树的特例；
KMP：在长字符串里找模式（短串）；部分匹配；O(m+n);跳转表格+模式匹配;leetcode28
wildcard：带通配符的字符串模式；？：任意字符；\*：任意数量的任意字符；弱版正则；O(n);
正则：字符串通用模式匹配；回溯；正则的几个函数的用法和区别；
状态机：通用的字符串分析；有限状态机；
LL/LR：字符串多层级结构分析；

leetcode28：实现  strStr()  函数。

给定一个  haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从 0 开始)。如果不存在，则返回   -1。PS:当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。

solution: JavaScript: 另外更高效的算法:BM 算法(O(h))和 Sunday 算法

// 暴力匹配

```js
function strStr(haystack, needle) {
	// 也可以比较两个字符串长度
	if (needle === "") return 0;
	if (haystack === "") return -1;
	let M = needle.length;
	let N = haystack.length;
	for (let i = 0; i <= N - M; i++) {
		let j;
		for (j = 0; j < M; j++) {
			if (needle[j] !== haystack[i + j]) break;
		}
		// needle 全都匹配了
		if (j == M) return i;
	}
	// haystack 中不存在 needle 子串
	return -1;
}
```

KMP://确定有限状态自动机//时间复杂度 O(h+n)，参考阮一峰 [kmp](https://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)

```js
function strStr(haystack, needle) {
	if (needle === "") return 0;
	if (haystack === "") return -1;
	let inc = [];
	// 计算偏移量
	for (let i = 0; i < needle.length; i++) {
		for (let j = 0; j <= i; j++) {
			if (needle[j] !== needle[i - j]) {
				inc[i] = j + 1;
				break;
			}
			if (j === i && needle[j] === needle[i - j]) {
				inc[i] = j + 1;
			}
		}
	}
	let i = 0;
	let l = needle.length;
	while (i < haystack.length) {
		for (let j = 0; j < l; j++) {
			if (needle[j] !== haystack[i + j]) {
				i += inc[j];
				break;
			}
			if (j === l - 1 && needle[j] === haystack[i + j]) {
				return i;
			}
		}
	}
	return -1;
}
```
