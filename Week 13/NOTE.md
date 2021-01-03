<!--
 * @Author: Eric YangXinde
 * @Date: 2020-09-25 20:00:09
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2021-01-03 23:47:14
 * @Description: 
-->
学习笔记

这周学习HTML的相关知识，重点关注Range API ：对DOM树操作。





6种元素
&amp  &lt  &quot  &#161


addEventListener 第三个参数决定冒泡（默认/false：子->父）/捕获（true父->子)阶段生效

document.styleSheets+Rule CSSOM
window.getComputedStyle(el,伪元素)拖拽+中间态动画


const names=Object.getOwnPropertyNames(window);
names=names.filter(e=>e!='Intl')