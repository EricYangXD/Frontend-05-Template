/*
 * @Author: Eric YangXinde
 * @Date: 2020-10-27 13:29:57
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-10-27 15:07:46
 * @Description:
 */
function kmp(source, pattern) {
	let table = new Array(pattern.length).fill(0);
	{
		//跳转表格
		let i = 1,
			j = 0;
		while (i < pattern.length) {
			if (pattern[i] === pattern[j]) {
				++j, ++i;
				table[i] = j;
			} else {
				if (j > 0) {
					j = table[j];
				} else {
					++i;
				}
			}
		}
	}
	console.log(table);

	{
		let i = 0,
			j = 0;
		while (i < source.length) {
			if (source[i] === pattern[j]) {
				++i, ++j;
			} else {
				if (j > 0) {
					j = table[j];
				} else {
					++i;
				}
			}
			if (j === pattern.length) {
				return true;
			}
		}
		return false;
	}
}

console.log(kmp("heljjkklolo", "klol"));
