/*
 * @Author: Eric YangXinde
 * @Date: 2020-10-19 14:02:36
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-10-19 17:14:26
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
const source = [];
for (let token of tokenize("6- 9 * 5 -3/2")) {
	// console.log(token);
	if (token.type !== "Whitespace" && token.type !== "lineTerminator") {
		source.push(token);
	}
}

function Expression(tokens) {
	if (
		SOURCE[0].type === "AdditiveExpression" &&
		source[1] &&
		source[1].type === "EOF"
	) {
		let node = {
			type: "Expression",
			children: [source.shift(), source.shift()], // 最后变成单个根节点
		};
		source.unshift(node);
		return node;
	}
	AdditiveExpression(source);
	return Expression(source);
}
function AdditiveExpression(source) {
	if (source[0].type === "MultiplicativeExpression") {
		let node = {
			type: "AdditiveExpression",
			children: [source[0]],
		};
		source[0] = node;
		return AdditiveExpression(source);
	}
	if (
		source[0].type === "AdditiveExpression" &&
		source[1] &&
		source[1].type === "+"
	) {
		let node = {
			type: "AdditiveExpression",
			operator: "+",
			children: [],
		};
		node.children.push(source.shift());
		node.children.push(source.shift());
		MultiplicativeExpression(source); // 处理source中的非终结符
		node.children.push(source.shift());
		source.unshift(node);
		return AdditiveExpression(source);
	}
	if (
		source[0].type === "AdditiveExpression" &&
		source[1] &&
		source[1].type === "-"
	) {
		let node = {
			type: "AdditiveExpression",
			operator: "-",
			children: [],
		};
		node.children.push(source.shift());
		node.children.push(source.shift());
		MultiplicativeExpression(source);
		node.children.push(source.shift());
		source.unshift(node);
		return AdditiveExpression(source);
	}

	if (source[0].type === "AdditiveExpression") {
		return source[0];
	}

	MultiplicativeExpression(source); // 遇到不认识的先调乘法，比如：Number
	return AdditiveExpression(source);
}

function MultiplicativeExpression(source) {
	// 单独一个Number看成是0次的乘法
	if (source[0].type === "Number") {
		let node = {
			type: "MultiplicativeExpression",
			children: [source[0]],
		};
		source[0] = node;
		return MultiplicativeExpression(source);
	}
	if (
		source[0].type === "MultiplicativeExpression" &&
		source[1] &&
		source[1].type === "*"
	) {
		let node = {
			type: "MultiplicativeExpression",
			operator: "*",
			children: [],
		};
		node.children.push(source.shift());
		node.children.push(source.shift());
		node.children.push(source.shift());
		source.unshift(node);
		return MultiplicativeExpression(source);
	}
	if (
		source[0].type === "MultiplicativeExpression" &&
		source[1] &&
		source[1].type === "/"
	) {
		let node = {
			type: "MultiplicativeExpression",
			operator: "/",
			children: [],
		};
		source[0] = node;
		return MultiplicativeExpression(source);
	}

	if (source[0].type === "MultiplicativeExpression") {
		return source[0];
	}

	return MultiplicativeExpression(source);
}
