# 学习笔记

这周的课程内容主要是一个寻路算法的简单实现，照着视频里把代码敲了一遍，大致了解了该算法的思想。

然后在其他时间学习了一下 snabbdom 的源码，学习了一下 vue3.0 的部分新 api。vue2.0 的 diff 算法是基于 snabbdom 的，vue3.0 的 diff 算法又进行了升级，除了对比头尾子节点，还用到了最长递增子序列等算法进行优化。

求解最长递增子序列是一道经典的算法题，多数解法是使用动态规划的思想，算法的时间复杂度是 O(n2)，而 Vue.js 内部使用的是维基百科提供的一套“贪心 + 二分查找”的算法，贪心算法的时间复杂度是 O(n)，二分查找的时间复杂度是 O(logn)，所以它的总时间复杂度是 O(nlogn)。

[Vue3.0 核心源码解析](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=326#/detail/pc?id=4057)

[Vue3.0 API 文档](https://v3.vuejs.org/api/)

[Vue3.0 中文文档](https://v3.cn.vuejs.org)

[snabbdom](https://github.com/snabbdom/snabbdom)
