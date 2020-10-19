/*
 * @Author: Eric YangXinde
 * @Date: 2020-10-19 14:02:36
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-10-19 15:27:43
 * @Description:
 */
const reg = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g; // 分组
const dict = ["Number", "Whitespace", "LineTerminator", "+", "-", "*", "/"]; // 与上面的顺序分组对应

const tokenize = (expression) => {
	let res = null;
	while (1) {
		res = reg.exec(expression); // 每次用正则reg去匹配表达式，得到一个数组[]，

		if (!res) {
			break;
		}
		for (let i = 1; i < dict.length; i++) {
			if (res[i]) {
				console.log(dict[i - 1]); // 如果匹配到了，打印它的类型
			}
		}
		// console.log(res);
	}
};

tokenize("6- 9 * 5 -3/2");
