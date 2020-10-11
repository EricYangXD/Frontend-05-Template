/*
 * @Author: Eric YangXinde
 * @Date: 2020-10-11 21:59:06
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-10-11 23:06:26
 * @Description:
 */
class Vue {
	constructor(options) {
		// 1.通过属性保存选项数据
		this.$options = options || {};
		// 传入的el可能是字符串也可能是个HTMLnode对象
		this.$el =
			typeof options.el === "string"
				? document.querySelector(options.el)
				: options.el;
		this.$data = options.data || {};
		this._proxyData(this.$data);
		// 2.把data中的成员转换成getter和setter，注入到vue实例中
		// 3.调用observer对象，监听数据的变化
		new Observer(this.$data);
		// 4.调用compiler对象，解析指令和插值表达式
		new Compiler(this);
	}
	_proxyData(data) {
		// 遍历data中的所有属性
		Object.keys(data).forEach((key) => {
			// 把data的属性注入到Vue实例中
			Object.defineProperty(this, key, {
				enumerable: true,
				configurable: true,
				get() {
					return data[key];
				},
				set(newVal) {
					if (newVal === data[key]) {
						return;
					}
					data[key] = newVal;
				},
			});
		});
	}
}
