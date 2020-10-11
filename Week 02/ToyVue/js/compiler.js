/*
 * @Author: Eric YangXinde
 * @Date: 2020-10-11 22:07:21
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-10-11 23:54:50
 * @Description:
 */
class Compiler {
	constructor(vm) {
		this.el = vm.$el;
		this.vm = vm;
		this.compile(this.el);
	}
	// 编译模板，处理文本节点和元素节点
	compile(el) {
		// 遍历子节点childNodes而不是子元素children
		let childNodes = el.childNodes;
		Array.from(childNodes).forEach((node) => {
			if (this.isTextNode(node)) {
				this.compileText(node);
			} else if (this.isElementNode(node)) {
				this.compileElement(node);
			} else {
			}

			// 判断node节点是否有子节点，如果有子节点，则递归调用compile()
			if (node.childNodes && node.childNodes.length) {
				this.compile(node);
			}
		});
	}
	// 编译元素节点，处理指令
	compileElement(node) {
		// console.log(node.attributes);
		// 遍历所有的属性节点
		Array.from(node.attributes).forEach((attr) => {
			// 判断是否是指令
			let attrName = attr.name;
			if (this.isDirective(attrName)) {
				// v-text --> text
				attrName = attrName.substr(2);
				let key = attr.value;
				this.update(node, key, attrName);
			}
		});
	}

	update(node, key, attrName) {
		let updateFn = this[attrName + "Updater"];
		// 注意this要指向compiler对象
		updateFn && updateFn.call(this, node, this.vm[key], key);
	}

	// 处理v-text指令
	textUpdater(node, value, key) {
		node.textContent = value;
		// 创建watcher对象，当数据改变的时候更新视图
		new Watcher(this.vm, key, (newValue) => {
			node.textContent = newValue;
		});
	}
	// 处理v-model指令
	modelUpdater(node, value, key) {
		node.value = value;
		// 创建watcher对象，当数据改变的时候更新视图
		new Watcher(this.vm, key, (newValue) => {
			node.value = newValue;
		});
		// 双向绑定
		node.addEventListener("input", () => {
			this.vm[key] = node.value;
		});
	}

	// 编译文本节点，处理插值表达式
	compileText(node) {
		// console.dir(node);
		let reg = /\{\{(.+?)\}\}/;
		let val = node.textContent;
		if (reg.test(val)) {
			let key = RegExp.$1.trim();
			node.textContent = val.replace(reg, this.vm[key]);

			// 创建watcher对象，当数据改变的时候更新视图
			new Watcher(this.vm, key, (newValue) => {
				node.textContent = newValue;
			});
		}
	}

	// 判断元素属性是否是指令
	isDirective(attrName) {
		return attrName.startsWith("v-");
	}
	// 判断节点是否是文本节点
	isTextNode(node) {
		return node.nodeType === 3;
	}
	// 判断节点是否是元素节点
	isElementNode(node) {
		return node.nodeType === 1;
	}
}
