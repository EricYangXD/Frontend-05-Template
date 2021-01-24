/*
 * @Author: Eric YangXinde
 * @Date: 2021-01-24 22:09:06
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2021-01-24 22:09:06
 * @Description:
 */
import { Component, createElement } from "./framework";

export class Button extends Component {
	constructor() {
		super();
	}
	render() {
		this.childContainer = <span></span>;
		this.root = (<div>{this.childContainer}</div>).render();
		return this.root;
	}
	appendChild(child) {
		if (!this.childContainer) {
			this.render();
		}
		this.childContainer.appendChild(child);
	}
}
