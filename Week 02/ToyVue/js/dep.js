/*
 * @Author: Eric YangXinde
 * @Date: 2020-10-11 23:25:42
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-10-11 23:32:17
 * @Description:
 */
class Dep {
	constructor() {
		// 存储所有观察者
		this.subs = [];
	}
	// 添加观察者
	addSub(sub) {
		if (sub && sub.update) {
			this.subs.push(sub);
		}
	}
	// 发送通知
	notify() {
		this.subs.forEach((sub) => {
			sub.update();
		});
	}
}
