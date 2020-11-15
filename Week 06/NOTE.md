<!--
 * @Author: Eric YangXinde
 * @Date: 2020-09-25 20:00:09
 * @LastModifiedBy: Eric YangXinde
 * @LastEditTime: 2020-11-15 16:39:17
 * @Description:
-->

学习笔记

乔姆斯基谱系：是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：
0- 型文法（无限制文法或短语结构文法）包括所有的文法。?::=? 左侧可以有多个非终结符
1- 型文法（上下文相关文法）生成上下文相关语言。?<A>?::=?<B>? 左侧可以有多个非终结符但是一定会有不变的部分，有上文和下文，根据前后来判断表达式意义
2- 型文法（上下文无关文法）生成上下文无关语言。<A>::=? 左侧只有一个非终结符
3- 型文法（正规文法）生成正则语言。<A>::=<A>? 递归定义的正则表达式，右侧表达式要在产生式开头就被匹配

产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句

巴科斯诺尔范式：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。

终结符： 最终在代码中出现的字符

形式语言根据用途分类：数据描述语言+编程语言
形式语言根据表达方式分类：声明式语言+命令式语言

图灵完备性：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。

图灵机（Turing machine）：又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。

图灵完备性：
命令式--图灵机：goto 实现 或 if+while 实现
声明式--Lambda：递归

动态与静态：
动态：在用户的设备/在线服务器上；产品实际运行时；runtime；
静态：在程序员的设备上；产品开发时；compiletime;

强类型： 无隐式转换
弱类型： 有隐式转换

复合类型：结构体、函数签名；

子类型+泛型==>协变与逆变：class Child extends Parent{}
协变:凡是能用 Array<Child>的地方都能用 Array<Parent>
逆变:凡是能用 Function<Parent>的地方都能用 Function<Child>

IEEE754 64 位：1 位正负+11 位指数位+（52 位精度位（最左侧固定是 1））
一个数字就等于：符号位（2^n \* 精度位的值） 符号位：0：+，1：-

面向对象三要素：唯一性标识符、状态、行为。
对象是唯一的，跟本身的状态无关，对象具有状态，状态由对象决定，状态的改变就是行为。
在设计对象的状态和行为时，总是遵循行为改变状态的原则。

JS 对象：property：「状态+行为」 都有一个 prototype，唯一标识性用内存地址来表示

property：Key「String/Symbol」+ Value
data property: value + writable + configurable + enumerable
accessor property: get + set + configurable + enumerable
原型链：当我们访问一个对象上的某个属性时，如果该对象上没有这个属性，那么就会去这个对象的原型上找这个属性，而这个原型可能还会有自己的原型，这样就形成了原型链。

object 相关的 api：

1. {}.[] Object.defineProperty();
2. Object.create()/Object.setPrototype()/Object.getPrototype();基于原型
3. new/class/extends;基于类
4. new/function/prototype --> ES3

typeof [[function]]; // function
