/*
 * @Author: Eric YangXinde
 * @Date: 2021-01-10 21:23:59
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2021-01-10 21:24:00
 * @Description:
 */
function createElement(type, attribute, ...children) {
	let element;
	if (typeof type === "string") element = new ElementWrapper(type);
	else element = new type();
	for (const name in attribute) {
		if (Object.hasOwnProperty.call(attribute, name)) {
			element.setAttribute(name, attribute[name]);
		}
	}
	for (const child of children) {
		if (typeof child === "string") {
			child = new TextWrapper(child);
		}
		element.appendChild(child);
	}
	return element;
}
class ElementWrapper {
	constructor(type) {
		this.root = document.createElement(type);
	}
	setAttribute(name, value) {
		this.root.setAttribute(name, value);
	}
	appendChild(child) {
		child.mountTo(this.root);
	}
	mountTo(parent) {
		parent.appendChild(this.root);
	}
}
class TextWrapper {
	constructor(text) {
		this.root = document.createTextNode(text);
	}
	setAttribute(name, value) {
		this.root.setAttribute(name, value);
	}
	mountTo(parent) {
		parent.appendChild(this.root);
	}
}
class Carousel {
	constructor() {
		this.root = document.createElement("div");
	}
	setAttribute(name, value) {
		this.root.setAttribute(name, value);
	}
	appendChild(child) {
		this.root.appendChild(child);
	}
	mountTo(parent) {
		parent.appendChild(this.root);
	}
}
let a = <Carousel></Carousel>;

let d = [
	"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
	"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
	"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
	"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

a.mountTo(document.body);
