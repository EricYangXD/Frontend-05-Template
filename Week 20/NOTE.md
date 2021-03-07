学习笔记

创建git commit hooks还是很有实用价值的，日常项目中也使用到了，比如配合eslint进行代码风格检查，提交规范检查，甚至可以跟JIRA配合进行一下task的处理。

### PRE-COMMIT
1. 新建项目和git hooks脚本文件
```shell
mkdir git-demo && cd git-demo  //新建git项目
touch .git/hooks/pre-commit  //新建pre-commit脚本文件
```
2. 在pre-commit文件中编写一下代码
```javascript
#!/usr/bin/env node
console.log("hello hooks")
process.exit(1) // 阻止提交
```
3. eslint在git hooks中的API用法
```javascript
#!/usr/bin/env node
const { ESLint } = require("eslint");
const process = require("process");

(async function main() {
	const eslint = new ESLint();

	const results = await eslint.lintFiles(["index.js"]); 

	const formatter = await eslint.loadFormatter("stylish");
	const resultText = formatter.format(results);

	for (const result of results) {
		if (result.errorCount) {
			process.exitCode = 1;
		}
	}

	console.log(resultText);
})().catch((error) => {
	process.exitCode = 1;
	console.error(error);
});
```

3. 当变更a文件后并git add a文件后，再次变更a文件，git status会发现a文件会同时出现在暂存区和工作区
如果此时git commit在pre-commit的hook中自动对a文件进行自动检测，暂存区和工作区的内容都会进行检测，而检测完成后commit又只是针对暂存区的内容，这样就会出现不一致的情况, 此时需要用到 git stash push -k命令去解决该问题，需要修改pre-commit钩子文件如下
```javascript
#!/usr/bin/env node
const { ESLint } = require("eslint");
const process = require("process");
const child_process = require("child_process");

function exec(name) {
	return new Promise((resolve) => {
		child_process.exec(name, resolve);
	});
}

(async function main() {
	const eslint = new ESLint();

	await exec("git stash push -k"); 
	const results = await eslint.lintFiles(["index.js"]);

	await exec("git stash pop"); 
	const formatter = await eslint.loadFormatter("stylish");
	const resultText = formatter.format(results);

	for (const result of results) {
		if (result.errorCount) {
			process.exitCode = 1;
		}
	}

	console.log(resultText);
})().catch((error) => {
	process.exitCode = 1;
	console.error(error);
});
```

### 使用puppeteer浏览器的api插件访问dom
1. 初始化项目并安装puppeteer，具体使用方式参考文档
```shell
mkdir headless-demo
cd headless-demo
npm init
yarn add puppeteer -D
```
2. 新建main.js
```js
const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("http://localhost:3000");
	const a = await page.$("img");
	console.log(await a.asElement().boxModel());
})();
```
