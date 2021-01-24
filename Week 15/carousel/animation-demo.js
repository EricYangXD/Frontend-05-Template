/*
 * @Author: Eric YangXinde
 * @Date: 2021-01-24 22:00:41
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2021-01-24 22:00:42
 * @Description:
 */
import { Timeline, Animation } from "./animation.js";
import { ease, easeIn } from "./ease.js";

const box = document.getElementById("box");

let startBtn = document.getElementById("start-btn");
let pauseBtn = document.getElementById("pause-btn");
let resumeBtn = document.getElementById("resume-btn");
let resetBtn = document.getElementById("reset-btn");

let tl = new Timeline();

startBtn.addEventListener("click", () => {
	tl.start();
	tl.add(
		new Animation(box.style, "transform", 0, 300, 2000, ease, 0, (v) => {
			return `translateX(${v}px)`;
		})
	);
});
pauseBtn.addEventListener("click", () => {
	tl.pause();
});
resumeBtn.addEventListener("click", () => {
	tl.resume();
});
resetBtn.addEventListener("click", () => {
	tl.reset();
});

const boxBezier = document.getElementById("box-bezier");
boxBezier.style.transition = "transform 2s ease";
boxBezier.style.transform = "translateX(300px)";
