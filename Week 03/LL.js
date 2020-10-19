/*
 * @Author: Eric YangXinde
 * @Date: 2020-10-19 14:02:36
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-10-19 16:03:02
 * @Description:
 */
const reg = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g; // 分组
const dict = ["Number", "Whitespace", "LineTerminator", "+", "-", "*", `\/`]; // 与上面的顺序分组对应
const tokenize = function* (expression) {
	let res = null;
	let lastIndex = 0;
	while (1) {
		// 遍历
		lastIndex = reg.lastIndex; // 缓存上一次匹配的位置index
		res = reg.exec(expression); // 每次用正则reg去匹配表达式，得到一个数组[]，
		if (!res) {
			break;
		}
		console.log(lastIndex, reg.lastIndex);
		// 如果匹配越界
		if (reg.lastIndex - lastIndex > res[0].length) {
			break;
		}

		let token = {
			type: null,
			value: null,
		};
		for (let i = 1; i < dict.length; i++) {
			if (res[i]) {
				// console.log(dict[i - 1]); // 如果匹配到了，打印它的类型
				token.type = dict[i - 1];
			}
		}
		token.value = res[0];
		// console.log(res);
		yield token;
	}
	yield {
		type: "EOF",
	};
};

for (let token of tokenize("6- 9 * 5 -3/2")) {
	console.log(token);
}
