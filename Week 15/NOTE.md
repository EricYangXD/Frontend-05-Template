<!--
 * @Author: Eric YangXinde
 * @Date: 2020-09-25 20:00:09
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2021-01-24 22:05:53
 * @Description:
-->

学习笔记

## 手势与动画

### 动画

#### 动画的分类

-   视图动画
    -   帧动画（Frame Animation）：图片联系播放
    -   补间动画（Tween Animation）：确定开始的视图样式 & 结束的视图样式，中间动画变化过程由系统补全。
        -   平移
        -   缩放
        -   旋转
        -   透明度
-   **属性动画（Property Animation）**

    -   与补间动画区别：
        -   tween 只能对 View 进行增加动画，且只有 alpha、scale、translate、rotate 四种动画。属性动画可以修改任何对象。
        -   只是改变了 view 绘制的**位置**，而未改变本身，即属性没有改变。

#### 动画实现方式

-   **setInterval**

    ```js
    // 不可控
    setInterval(() => {}, 16);
    ```

-   **setTimeout**

    ```js
    let tick = function () {
    	setTimeout(tick, 16);
    };
    ```

-   **requestAnimationFrame (更安全的实现)**

    ```js
    let tick = function () {
    	/*
    	 ** 回调函数执行次数通常是60帧，
    	 ** 但在大多数遵循W3C建议的浏览器中，
    	 ** 回调函数执行次数通常与浏览器屏幕刷新次数相匹配。
    	 */
    	let handler = requestAnimationFrame(tick);
    	cancelAnimationFrame(handler);
    };
    ```

    -   **代码：时间线**

        -   目的：实现对 animation 的管理
        -   目标能力：
            -   开始 start
            -   倍速 rate
            -   暂停 pause
            -   继续 resume
            -   重置 reset：清除/复用 时间线。
        -   骨架

            ```js
            const TICK = Symbol("TICK");
            class Timeline {
            	constructor() {
            		// 私有方法 tick
            		this[TICK] = function () {
            			requestAnimationFrame(this[TICK]);
            		};
            	}
            	start() {
            		this[TICK]();
            	}

            	set rate(r) {}
            	get rate() {}

            	pause() {}
            	resume() {}

            	// 清除/复用 timeline
            	reset() {}
            }
            ```

        -   改善功能：
            -   **startTime 动画开始时间**：startTime vs addTime
            -   **delay**：startTime - delayTime
            -   **timingFunction( progress )**：cubicBezier
            -   **pause / resume**：pauseTime = Date.now() - pauseStart
            -   **state 状态管理**

### 手势 gesture

-   **基础体系（单指）**

![](http://note.youdao.com/yws/public/resource/17bc5abb7cfff2630dca59d5d6b3a29e/xmlnote/1C5382B037C74E01A6747FAA506B07DD/2117)

-   **touch 事件 vs mouse 事件**

    -   touchmove vs mousemove:
        -   touchmove 一定是追随 touchstart 的。
        -   mousemove 和 mousestart 是独立。
    -   touchcancel
        -   被系统时间打断，异常结束时调用

-   **[浏览器统一指针事件：Pointer Event](https://www.w3.org/TR/pointerevents/)**
    -   目前 W3C 针对触控操作的部分，有两种事件模型可以使用
        -   其中一个是专门为了触控设计的 Touch Event，这应该算是目前大部分移动浏览器所支持的事件架构；
        -   而另一种，则是由微软所提出的,试图统一所有指针装置的事件架构 -- Pointer Event。
    -   相较于目前主流的 Touch Event （W3C）只有去处理触控的事件， Pointer Event 希望能把所有的指针事件都统一来做管理、让程序开发时能更简单地使用。
        ![](https://www.w3.org/TR/pointerevents/pointer.png)
    -   Pointer Event 总共定义了八种事件，其列表如下：
        -   pointerdown
        -   pointerup
        -   pointercancel
        -   pointermove
        -   pointerover
        -   pointerout
        -   pointerenter
        -   pointerleave
        -   基本上，大部分的事件，都可以对应到本来的 mouse event

### 事件的派发

-   **`new Event`: 创建一个新的事件对象**
    -   `event = new Event(typeArg, eventInit);`
    -   `typeArg`: 表示所创建事件的名称
    -   `eventInit`: 可选
        -   "bubbles"，表示该事件是否冒泡。
        -   "cancelable"，表示该事件能否被取消。
        -   "composed"，指示事件是否会在影子 DOM 根节点之外触发侦听器。
-   **new CustomEvent**
    -   `event = new CustomEvent(typeArg, customEventInit);`
    -   对比 Event，在 customEventInit 还可以传递跟事件关联的相关值（detail）
        -   "detail"，是一个与 event 相关的值
-   **`EventTarget.dispatchEvent`**
    -   `event` 是要被派发的事件对象。
    -   `target` 被用来初始化 事件 和 决定将会触发 目标.
