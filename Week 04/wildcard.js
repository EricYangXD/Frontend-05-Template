/*
 * @Author: Eric YangXinde
 * @Date: 2020-10-27 15:27:30
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-10-27 17:55:08
 * @Description:
 */
function find(source, pattern) {
	let starCount = 0;
	// 计算有几个*
	for (let i = 0; i < pattern.length; i++) {
		if (pattern[i] === "*") {
			starCount++;
		}
	}
	// 严格匹配的情况
	if (starCount === 0) {
		for (let i = 0; i < pattern.length; i++) {
			if (pattern[i] !== source[i] && pattern[i] !== "?") {
				return false;
			}
		}
		return;
	}
	let i = 0;
	let lastIndex = 0;
	// 第一个*之前
	for (i = 0; pattern[i] !== "*"; i++) {
		if (pattern[i] !== source[i] && pattern[i] !== "?") {
			return false;
		}
	}
	// 接着之前的继续往下找
	lastIndex = i;
	// 0 -> starCount-1 这段
	for (let p = 0; p < starCount - 1; p++) {
		i++;
		let subPattern = "";
		while (pattern[i] !== "*") {
			subPattern += pattern[i];
			i++;
		}
		// 把？替换成正则的形式
		let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g");
		reg.lastIndex = lastIndex;
		// 需要注释掉，不然会有问题，多执行了一遍
		// console.log(reg.exec(source));
		if (!reg.exec(source)) {
			return false;
		}

		lastIndex = reg.lastIndex;
	}
	// 尾部匹配
	for (
		let j = 0;
		j <= source.length - lastIndex && pattern[pattern.length - j] !== "*";
		j++
	) {
		if (
			pattern[pattern.length - j] !== source[source.length - j] &&
			pattern[pattern.length - j] !== "?"
		) {
			return false;
		}
	}
	return true;
}
console.log(find("abcabcabxaac", "a*b*bx*c"));
