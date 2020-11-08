学习笔记

本周主要学习了vue3.0响应式的原理和双向绑定的原理，响应式中数据是单向流动的，数据的变化会导致dom的变化。
响应式的本质是当数据变化后会自动执行某个函数，映射到组件的实现就是，当数据变化后，会自动触发组件的重新渲染。
响应式原理是一种单向行为，它是数据到 DOM 的映射。而真正的双向绑定，除了数据变化，会引起 DOM 的变化之外，还应该在操作 DOM 改变后，反过来影响数据的变化。
Vue.js 2.x 响应式：它在内部通过 Object.defineProperty API 劫持数据的变化，在数据被访问的时候收集依赖，然后在数据被修改的时候通知依赖更新。在 Vue.js 2.x 中，Watcher 就是依赖，有专门针对组件渲染的 render watcher。注意这里有两个流程，首先是依赖收集流程，组件在 render 的时候会访问模板中的数据，触发 getter 把 render watcher 作为依赖收集，并和数据建立联系；然后是派发通知流程，当我对这些数据修改的时候，会触发 setter，通知 render watcher 更新，进而触发了组件的重新渲染。

 Object.defineProperty API 的一些缺点：不能监听对象属性新增和删除；初始化阶段递归执行 Object.defineProperty 带来的性能负担。

vue.js 3.0响应式原理就是利用了ES6中的Proxy API实现对js对象的代理/劫持，配合副作用函数，实现响应式。

响应式的实现方式无非就是劫持数据，Vue.js 3.0 的 reactive API 就是通过 Proxy 劫持数据，而且由于 Proxy 劫持的是整个对象，所以我们可以检测到任何对对象的修改，弥补了 Object.defineProperty API 的不足。

对同一个原始数据多次执行 reactive ，那么会返回相同的响应式对象。

Proxy 处理器对象 mutableHandlers其实就是劫持了我们对 observed 对象的一些操作，比如：
访问对象属性会触发 get 函数；
设置对象属性会触发 set 函数；
删除对象属性会触发 deleteProperty 函数；
in 操作符会触发 has 函数；
通过 Object.getOwnPropertyNames 访问对象属性名会触发 ownKeys 函数。因为无论命中哪个处理器函数，它都会做依赖收集get和派发通知set这两件事其中的一个。

依赖收集发生在数据访问的阶段。
Object.defineProperty 也可以在 get 的时候递归执行。在 get 里递归执行的好处是初始化阶段对于对象数据嵌套深的场景是一种优化，但是在每次获取数据的时候都会执行一遍 observe 递归。

set 函数的实现逻辑很简单，主要就做两件事情， 首先通过 Reflect.set 求值 ， 然后通过 trigger 函数派发通知 ，并依据 key 是否存在于 target 上来确定通知类型，即新增还是修改。整个 set 函数最核心的部分就是 执行 trigger 函数派发通知。

 Vue.js 3.0 在响应式的实现思路和 Vue.js 2.x 差别并不大，主要就是 劫持数据的方式改成用 Proxy 实现 ， 以及收集的依赖由 watcher 实例变成了组件副作用渲染函数 。
 
Proxy API的性能比Object.defineProperty略差。

作用在组件上的 v-model 实际上就是一种打通数据双向通讯的语法糖，即外部可以往组件上传递数据，组件内部经过某些操作行为修改了数据，然后把更改后的数据再回传到外部。
组件 v-model 的实现原理，它的本质就是语法糖：通过 prop 向组件传递数据，并监听自定义事件接受组件反传的数据并更新。

双向绑定可以简单理解为在响应式基础上，增加了对自定义事件的监听，当Dom触发这些监听器时通过回调函数传递数据并更新。

