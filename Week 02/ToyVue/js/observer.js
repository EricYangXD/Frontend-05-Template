/*
 * @Author: Eric YangXinde
 * @Date: 2020-10-11 22:07:30
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-10-11 23:29:47
 * @Description:
 */
class Observer {
	constructor(data) {
		this.walk(data);
	}
	walk(data) {
		// 1.判断data是否为空
		if (!data || typeof data !== "object") return;

		// 2.遍历data对象的所有属性
		Object.keys(data).forEach((key) => {
			this.defineReactive(data, key, data[key]);
		});
	}
	// 把数据实现响应式
	defineReactive(obj, key, val) {
		let that = this;
		// 负责收集依赖并发送通知
		let dep = new Dep();
		// 如果val是object，则对它再做一次遍历，使他的属性也变成响应式
		this.walk(val);
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get() {
				// return obj[key];// 会dead loop
				// 收集依赖，跟Watcher相关
				Dep.target && dep.addSub(Dep.target);
				return val;
			},
			set(newVal) {
				if (newVal === val) {
					return;
				}
				// obj[key]=newVal
				val = newVal;
				// 如果newVal是object，则对它再做一次遍历，使他的属性也变成响应式
				that.walk(newVal);
				// 发送通知
				dep.notify();
			},
		});
	}
}
