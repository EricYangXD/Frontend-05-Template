/*
 * @Author: Eric YangXinde
 * @Date: 2021-01-24 22:09:39
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2021-01-24 22:09:39
 * @Description:
 */
import { Component, createElement, ATTRIBUTE } from "./framework";

export class List extends Component {
	constructor() {
		super();
	}
	render() {
		this.children = this[ATTRIBUTE].data.map(this.template);
		this.root = (<div>{this.children}</div>).render();
	}
	appendChild(child) {
		this.template = child;
	}
}
